import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import MobileMenu from "@/components/MobileMenu";
import CartIcon from "@/components/CartIcon";

import productClasicoParis from "@/assets/product-clasico-paris.jpg";
import productEleganteRouge from "@/assets/product-elegante-rouge.jpg";
import productSophistique from "@/assets/product-sophistique.jpg";
import productVelvetLuxe from "@/assets/product-velvet-luxe.jpg";

const products = {
  "clasico-paris": {
    id: "clasico-paris",
    name: "Clásico Paris",
    price: 89.00,
    image: productClasicoParis,
    description: "Mocasines clásicos de inspiración parisina. Elaborados con piel genuina y mano de obra 100% mexicana. Perfectos para cualquier ocasión, combinan elegancia atemporal con comodidad excepcional."
  },
  "elegante-rouge": {
    id: "elegante-rouge",
    name: "Elegante Rouge",
    price: 95.00,
    image: productEleganteRouge,
    description: "Sofisticación en cada paso. Diseño elegante con acabados de primera calidad. Ideales para eventos especiales o para elevar tu look diario con un toque de distinción francesa."
  },
  "sophistique": {
    id: "sophistique",
    name: "Sophistiqué",
    price: 92.00,
    image: productSophistique,
    description: "La definición de estilo refinado. Mocasines de corte moderno con influencia vintage. Confeccionados artesanalmente para quienes aprecian el diseño contemporáneo con alma tradicional."
  },
  "velvet-luxe": {
    id: "velvet-luxe",
    name: "Velvet Luxe",
    price: 105.00,
    image: productVelvetLuxe,
    description: "Lujo en estado puro. Nuestra pieza premium con acabados exclusivos. Materiales de la más alta calidad combinados con técnicas artesanales ancestrales para crear una obra maestra."
  }
};

const sizes = ["35", "36", "37", "38", "39", "40", "41", "42"];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");

  const product = productId ? products[productId as keyof typeof products] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-serif text-xl">Producto no encontrado</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Por favor selecciona una talla");
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image
    });

    toast.success("Producto agregado al carrito");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-serif text-xl font-semibold">ALOJAS</span>
          </button>
          <div className="flex items-center gap-4">
            <CartIcon />
            <MobileMenu variant="sticky" />
          </div>
        </div>
      </header>

      {/* Product Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-5xl font-bold text-[#111111] mb-4">
                {product.name}
              </h1>
              <p className="font-sans text-3xl text-[#722F37] font-semibold">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="font-sans text-lg text-[#111111]/70 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-4">
              <label className="font-serif text-xl font-semibold text-[#111111] block">
                Selecciona tu talla
              </label>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      py-3 px-4 border-2 rounded font-sans transition-all
                      ${selectedSize === size
                        ? 'border-[#722F37] bg-[#722F37] text-white'
                        : 'border-gray-300 hover:border-[#722F37] text-[#111111]'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full h-14 text-lg bg-[#722F37] hover:bg-[#5a2529] text-white font-sans"
            >
              Agregar al carrito
            </Button>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-8 space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-semibold text-[#111111]">
                  Detalles del producto
                </h3>
                <ul className="font-sans text-[#111111]/70 space-y-2">
                  <li>• Mano de obra 100% mexicana</li>
                  <li>• Piel genuina de alta calidad</li>
                  <li>• Diseño inspirado en la elegancia francesa</li>
                  <li>• Suela antiderrapante</li>
                  <li>• Plantilla acolchada para mayor comodidad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
