import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import heroBackground from "@/assets/hero-background.png";
import historiaImage from "@/assets/historia-image.png";
import ScrollReveal from "@/components/ScrollReveal";
const Index = () => {
  const [showStickyMenu, setShowStickyMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyMenu(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* Sticky Menu - appears on scroll */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-transform duration-300 ${
          showStickyMenu ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="font-serif text-xl font-semibold tracking-wide">ALOJAS</h1>
          <button className="text-foreground hover:opacity-70 transition-opacity">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative min-h-screen w-full overflow-hidden">
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
            </div>
          </main>
        </div>
      </div>

      {/* Historia Section - Continuous Scroll */}
      <section className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
            {/* Left Side - Editorial Style Image with Square Borders and Depth */}
            <div className="relative">
              <div className="relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src={historiaImage} 
                  alt="Mocasines Alojas elegantes" 
                  className="w-full h-auto object-cover"
                  style={{
                    filter: 'contrast(1.15) brightness(1.05) saturate(1.1)',
                  }}
                />
                {/* Editorial depth effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute -inset-1 bg-gradient-to-br from-black/10 to-transparent blur-sm -z-10" />
              </div>
            </div>

            {/* Right Side - Text Content with ScrollReveal */}
            <div className="space-y-8">
              <div className="font-serif">
                <ScrollReveal
                  enableBlur={true}
                  baseOpacity={0}
                  baseRotation={5}
                  blurStrength={10}
                  textClassName="font-serif text-5xl md:text-6xl font-bold text-black leading-tight"
                >
                  Elegancia que comienza en cada paso
                </ScrollReveal>
              </div>
              
              <div className="font-sans">
                <ScrollReveal
                  enableBlur={true}
                  baseOpacity={0.2}
                  baseRotation={3}
                  blurStrength={6}
                  textClassName="font-sans text-xl text-black/80 leading-relaxed font-light"
                >
                  En Alojas creamos mocasines vintage con mano de obra 100% mexicana, cuidando cada detalle para lograr un estilo clásico, cómodo y sofisticado.
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;