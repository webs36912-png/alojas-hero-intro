import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  productId: string;
}

const ProductCard = ({ image, name, price, productId }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/producto/${productId}`);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="aspect-[4/5] overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-6 space-y-3">
        <h3 className="font-serif text-2xl font-semibold text-foreground">{name}</h3>
        <p className="font-sans text-xl text-muted-foreground">{price}</p>
        <Button 
          variant="outline" 
          className="w-full mt-2 font-sans text-sm border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Ver más
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
