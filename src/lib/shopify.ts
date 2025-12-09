/**
 * Shopify Storefront helper
 * Uses `import.meta.env.VITE_SHOPIFY_STORE_DOMAIN` and
 * `import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
 */

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

const SHOP_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!SHOP_DOMAIN || !STOREFRONT_TOKEN) {
  // Do not throw at module load in some frameworks, but warn to make debugging easier.
  // Throwing here is acceptable too depending on app needs.
  // eslint-disable-next-line no-console
  console.warn(
    '[shopify] Missing env vars: set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local'
  );
}

const endpoint = (domain = SHOP_DOMAIN) => `https://${domain}/api/2023-10/graphql.json`;

async function fetchShopify<T = any>(query: string, variables?: Record<string, any>) {
  if (!SHOP_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error('Missing Shopify env variables (VITE_SHOPIFY_STORE_DOMAIN or VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN)');
  }

  const res = await fetch(endpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Use both headers for compatibility; Storefront docs use X-Shopify-Storefront-Access-Token
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      Authorization: `Bearer ${STOREFRONT_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors && json.errors.length) {
    const message = json.errors.map((e) => e.message).join('\n');
    throw new Error(`Shopify GraphQL errors:\n${message}`);
  }

  return json.data as T;
}

/**
 * Minimal product shape returned to the app.
 */
export type Product = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml?: string;
  images: Array<{ src?: string; altText?: string }>;
  variants: Array<{ id: string; sku?: string; availableForSale?: boolean; price?: string; quantityAvailable?: number | null }>;
};

/**
 * Fetch products from the Storefront API.
 * @param first number of products to fetch
 */
export async function getProducts(first = 12): Promise<Product[]> {
  const query = `query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          descriptionHtml
          images(first: 5) { edges { node { url altText } } }
          variants(first: 10) { edges { node { id sku availableForSale priceV2 { amount currencyCode } quantityAvailable } } }
        }
      }
    }
  }`;

  const data = await fetchShopify<{ products: { edges: Array<{ node: any }> } }>(query, { first });

  const nodes = data?.products?.edges?.map((e) => e.node) ?? [];

  return nodes.map((n) => ({
    id: n.id,
    handle: n.handle,
    title: n.title,
    descriptionHtml: n.descriptionHtml,
    images: (n.images?.edges ?? []).map((ie: any) => ({ src: ie.node?.url, altText: ie.node?.altText })),
    variants: (n.variants?.edges ?? []).map((ve: any) => ({
      id: ve.node.id,
      sku: ve.node.sku,
      availableForSale: ve.node.availableForSale,
      price: ve.node.priceV2?.amount ? `${ve.node.priceV2.amount} ${ve.node.priceV2.currencyCode}` : undefined,
      quantityAvailable: typeof ve.node.quantityAvailable !== 'undefined' ? ve.node.quantityAvailable : null,
    })),
  }));
}

export { fetchShopify };
