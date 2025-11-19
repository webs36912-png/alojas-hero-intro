import { Menu, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import heroBackground from "@/assets/hero-background.png";
import historiaImage from "@/assets/historia-image.png";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import productClasicoParis from "@/assets/product-clasico-paris.jpg";
import productEleganteRouge from "@/assets/product-elegante-rouge.jpg";
import productSophistique from "@/assets/product-sophistique.jpg";
import productVelvetLuxe from "@/assets/product-velvet-luxe.jpg";
import { Button } from "@/components/ui/button";
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

      {/* Catálogo Section - Wine Background */}
      <section className="min-h-screen py-24 relative" style={{
        backgroundColor: '#722F37',
        boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.15), inset 0 -2px 20px rgba(0,0,0,0.1)'
      }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-white">
              Nuestra Colección
            </h2>
            <p className="font-sans text-xl text-white/90 max-w-2xl mx-auto font-light">
              Mocasines artesanales que combinan estilo y comodidad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ProductCard
              image={productClasicoParis}
              name="Clásico Paris"
              price="$89.00"
              productId="clasico-paris"
            />
            <ProductCard
              image={productEleganteRouge}
              name="Elegante Rouge"
              price="$95.00"
              productId="elegante-rouge"
            />
            <ProductCard
              image={productSophistique}
              name="Sophistiqué"
              price="$92.00"
              productId="sophistique"
            />
            <ProductCard
              image={productVelvetLuxe}
              name="Velvet Luxe"
              price="$105.00"
              productId="velvet-luxe"
            />
          </div>
        </div>
      </section>

      {/* Contacto Section - White Background */}
      <section className="min-h-screen bg-white py-32 animate-fade-in">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-20">
              {/* Columna 1 - Marca */}
              <div className="space-y-6">
                <h2 className="font-serif text-4xl font-bold text-[#111111] mb-4">
                  ALOJAS
                </h2>
                <p className="font-sans text-lg text-[#111111]/70 leading-relaxed font-light">
                  Zapatos inspirados en Francia y fabricados con manos mexicanas para tu día a día.
                </p>
              </div>

              {/* Columna 2 - Contacto */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-semibold text-[#111111] mb-6">
                  Contacto
                </h3>
                <div className="space-y-4">
                  <a 
                    href="mailto:hola@alojas.com" 
                    className="flex items-center gap-3 text-[#111111]/70 hover:text-[#722F37] transition-colors group"
                  >
                    <Mail size={20} className="flex-shrink-0" />
                    <span className="font-sans">hola@alojas.com</span>
                  </a>
                  <a 
                    href="tel:+525512345678" 
                    className="flex items-center gap-3 text-[#111111]/70 hover:text-[#722F37] transition-colors group"
                  >
                    <Phone size={20} className="flex-shrink-0" />
                    <span className="font-sans">+52 55 1234 5678</span>
                  </a>
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-[#722F37] hover:bg-[#5a2529] text-white font-sans"
                      onClick={() => window.open('https://wa.me/525512345678', '_blank')}
                    >
                      Escríbenos por WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* Columna 3 - Sucursales & Redes */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-semibold text-[#111111] mb-6">
                  Sucursales & Redes
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#111111]/70">
                    <MapPin size={20} className="flex-shrink-0" />
                    <span className="font-sans">Ciudad de México</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#111111]/70">
                    <MapPin size={20} className="flex-shrink-0" />
                    <span className="font-sans">Guadalajara</span>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#111111]/70 hover:text-[#722F37] transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={24} strokeWidth={1.5} />
                    </a>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#111111]/70 hover:text-[#722F37] transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={24} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Copyright */}
            <div className="mt-32 pt-8 border-t border-[#111111]/10">
              <p className="text-center font-sans text-sm text-[#111111]/50">
                © 2024 Alojas. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;