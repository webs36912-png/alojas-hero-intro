import { Menu } from "lucide-react";
import historiaImage from "@/assets/historia-image.png";

const Historia = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-semibold tracking-wide">ALOJAS</h1>
          <button className="text-foreground hover:opacity-70 transition-opacity">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <main className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Side - Editorial Style Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src={historiaImage} 
                alt="Mocasines Alojas elegantes" 
                className="w-full h-auto object-cover"
                style={{
                  filter: 'contrast(1.1) brightness(1.05)',
                }}
              />
              {/* Subtle editorial effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="space-y-6">
            {/* 
              ⚠️ ESPACIO PARA ANIMACIÓN SCROLL REVEAL
              Inserta aquí el código de ScrollReveal envolviendo todo el contenido de texto
              Ejemplo estructura:
              <ScrollReveal>
                <h2>Elegancia que comienza en cada paso</h2>
                <p>En Alojas creamos...</p>
              </ScrollReveal>
            */}
            
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-black leading-tight">
              Elegancia que comienza en cada paso
            </h2>
            
            <p className="font-sans text-xl text-black/80 leading-relaxed font-light">
              En Alojas creamos mocasines vintage con mano de obra 100% mexicana, cuidando cada detalle para lograr un estilo clásico, cómodo y sofisticado.
            </p>

            {/* FIN DEL ESPACIO PARA SCROLL REVEAL */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Historia;
