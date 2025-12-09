/**
 * Shopify Storefront API Helper
 * Dynamic product loading with real checkout
 */

import { toast } from "sonner";

// API Configuration
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'alojas-hero-intro-nljc0.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '3523a0f233325ce41e4c4f5bed943731';

// Types
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

// GraphQL Queries
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// API Helper
async function storefrontApiRequest<T = any>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Your store needs to be upgraded to a paid plan to access the API.",
    });
    throw new Error('Payment required');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Shopify API Error: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

// Fetch all products
export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest<{ data: { products: { edges: ShopifyProduct[] } } }>(
    PRODUCTS_QUERY,
    { first }
  );
  return data.data?.products?.edges ?? [];
}

// Fetch single product by handle
export async function getProductByHandle(handle: string): Promise<ShopifyProduct['node'] | null> {
  const data = await storefrontApiRequest<{ data: { productByHandle: ShopifyProduct['node'] } }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return data.data?.productByHandle ?? null;
}

// Create checkout session
export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  const lines = items.map(item => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
  }));

  const data = await storefrontApiRequest<{ 
    data: { 
      cartCreate: { 
        cart: { checkoutUrl: string }; 
        userErrors: Array<{ message: string }> 
      } 
    } 
  }>(CART_CREATE_MUTATION, { input: { lines } });

  if (data.data.cartCreate.userErrors.length > 0) {
    throw new Error(`Checkout failed: ${data.data.cartCreate.userErrors.map(e => e.message).join(', ')}`);
  }

  const checkoutUrl = data.data.cartCreate.cart.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error('No checkout URL returned');
  }

  // Add channel parameter for proper checkout
  const url = new URL(checkoutUrl);
  url.searchParams.set('channel', 'online_store');
  return url.toString();
}
