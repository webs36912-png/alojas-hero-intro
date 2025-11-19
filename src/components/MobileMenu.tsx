import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

interface MobileMenuProps {
  variant?: "hero" | "sticky";
}

const MobileMenu = ({ variant = "hero" }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="text-foreground hover:opacity-70 transition-opacity">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white/95 backdrop-blur-sm border-none w-80">
        <nav className="flex flex-col space-y-8 mt-12">
          <button
            onClick={() => scrollToSection('historia')}
            className="font-serif text-2xl text-left text-foreground hover:text-primary transition-colors"
          >
            Nuestra historia
          </button>
          <button
            onClick={() => scrollToSection('coleccion')}
            className="font-serif text-2xl text-left text-foreground hover:text-primary transition-colors"
          >
            Colección
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className="font-serif text-2xl text-left text-foreground hover:text-primary transition-colors"
          >
            Contacto
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
