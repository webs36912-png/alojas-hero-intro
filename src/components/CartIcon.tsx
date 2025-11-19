import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CartIcon = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative text-foreground hover:opacity-70 transition-opacity">
          <ShoppingBag size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-sans">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Tu Carrito</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col h-full">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8 font-sans">
              Tu carrito está vacío
            </p>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-4 py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-serif text-sm font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground font-sans">Talla: {item.size}</p>
                      <p className="text-sm font-sans">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="h-6 w-6 p-0"
                        >
                          -
                        </Button>
                        <span className="text-sm font-sans w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="h-6 w-6 p-0"
                        >
                          +
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId, item.size)}
                          className="ml-auto text-destructive hover:text-destructive"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex justify-between font-serif text-lg font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 font-sans">
                  Proceder al pago
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartIcon;
