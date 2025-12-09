import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  return (
    <Link to={`/producto/${node.handle}`}>
      <Card className="group cursor-pointer overflow-hidden bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in">
        <CardContent className="p-0">
          <div className="aspect-[4/5] overflow-hidden bg-gray-100">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Sin imagen
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-6 space-y-3">
          <h3 className="font-serif text-2xl font-semibold text-foreground">{node.title}</h3>
          <p className="font-sans text-xl text-muted-foreground">
            ${parseFloat(price.amount).toLocaleString('es-AR')} {price.currencyCode}
          </p>
          <Button 
            variant="outline" 
            className="w-full mt-2 font-sans text-sm border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Ver más
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
