import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.png";
const Index = () => {
  const navigate = useNavigate();

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
              <button 
                onClick={() => navigate('/historia')}
                className="bg-wine hover:bg-wine-dark text-white font-sans font-medium px-10 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 my-0 py-[10px]"
              >
                Ver colección
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default Index;