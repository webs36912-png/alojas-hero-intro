import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CartIcon from "@/components/CartIcon";
import MobileMenu from "@/components/MobileMenu";
import { useQuery } from "@tanstack/react-query";
import { getProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductByHandle(productId || ''),
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-foreground">Producto no encontrado</p>
        <Button onClick={() => navigate('/')} variant="outline">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const image = product.images.edges[0]?.node;
  const variants = product.variants.edges;
  const selectedVariant = variants.find(v => v.node.id === selectedVariantId)?.node || variants[0]?.node;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Selecciona una opción");
      return;
    }

    const productWrapper: ShopifyProduct = { node: product };

    addItem({
      product: productWrapper,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });

    toast.success("Agregado al carrito", {
      description: `${product.title} - ${selectedVariant.title}`,
    });
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
          <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-xl bg-gray-100">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Sin imagen
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-5xl font-bold text-[#111111] mb-4">
                {product.title}
              </h1>
              <p className="font-sans text-3xl text-[#722F37] font-semibold">
                ${parseFloat(selectedVariant?.price.amount || '0').toLocaleString('es-AR')} {selectedVariant?.price.currencyCode}
              </p>
            </div>

            {product.description && (
              <p className="font-sans text-lg text-[#111111]/70 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Variant Selection */}
            {variants.length > 1 && (
              <div className="space-y-4">
                <label className="font-serif text-xl font-semibold text-[#111111] block">
                  Selecciona tu opción
                </label>
                <div className="flex flex-wrap gap-3">
                  {variants
                    .filter(v => v.node.availableForSale)
                    .map((variant) => {
                      const isSelected = selectedVariantId === variant.node.id || 
                        (!selectedVariantId && variant.node.id === variants[0]?.node.id);

                      return (
                        <button
                          key={variant.node.id}
                          onClick={() => setSelectedVariantId(variant.node.id)}
                          className={`
                            py-3 px-4 border-2 rounded font-sans transition-all
                            ${isSelected
                              ? 'border-[#722F37] bg-[#722F37] text-white'
                              : 'border-gray-300 hover:border-[#722F37] text-[#111111]'
                            }
                          `}
                        >
                          {variant.node.title}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

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
                  <li>• Envío gratis en pedidos mayores a $50.000</li>
                  <li>• Cambios y devoluciones dentro de 30 días</li>
                  <li>• Cuero genuino de primera calidad</li>
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
