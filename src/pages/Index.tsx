import { Menu } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";
import historiaImage from "@/assets/historia-image.png";
const Index = () => {
  return <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url(${heroBackground})`
    }}>
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Navigation Bar */}
        <header className="fade-in pt-8 px-4 flex justify-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center justify-between max-w-md w-full shadow-lg">
            <h1 className="font-serif text-2xl font-semibold tracking-wide">ALOJAS</h1>
            <button className="text-foreground hover:opacity-70 transition-opacity">
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-3xl space-y-6 fade-in-delay">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white text-shadow leading-tight">
              Mocasines franceses para una vida bonita
            </h2>
            
            <p className="font-sans text-xl md:text-2xl text-white/95 text-shadow max-w-2xl mx-auto font-light">
          </p>
            
            <div className="pt-4">
              <button className="bg-wine hover:bg-wine-dark text-white font-sans font-medium px-10 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 my-0 py-[10px]">
                Ver colección
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Segunda Sección - Nuestra Historia */}
      <section className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-6">
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
        </div>
      </section>
    </div>;
};
export default Index;