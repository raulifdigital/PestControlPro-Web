
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bug, 
  Menu, 
  X, 
  ShieldAlert, 
  CreditCard, 
  Banknote, 
  MessageSquare, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Clock,
  MapPin,
  Sprout,
  Trees,
  Leaf,
  CheckCircle2
} from 'lucide-react';
import { WHATSAPP_NUMBER, GREEN_SERVICES } from './constants';
import { getWhatsAppLink, generateInterestMessage } from './utils/whatsapp';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = useRef<string[]>(['inicio', 'servicios-verdes', 'garantia']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledTotal = (winScroll / height) * 100;
      setScrollProgress(scrolledTotal);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.current.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleWhatsAppAction = (type: 'service' | 'product' | 'quote', name?: string) => {
    const message = generateInterestMessage(type, name);
    window.open(getWhatsAppLink(message), '_blank');
    setIsMenuOpen(false);
  };

  const getIcon = (name: string) => {
    switch(name) {
      case 'Sprout': return <Sprout size={40} />;
      case 'Trees': return <Trees size={40} />;
      case 'Leaf': return <Leaf size={40} />;
      default: return <Sprout size={40} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Barra de Progreso */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-emerald-500 z-[120] transition-all duration-200 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navegación */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'glass-nav shadow-lg py-3 border-b border-emerald-100' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-center gap-2 group cursor-pointer" 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              <div className={`p-2 rounded-xl transition-all duration-500 shadow-lg ${activeSection === 'inicio' ? 'bg-emerald-600 shadow-emerald-200 rotate-0' : 'bg-slate-800 shadow-slate-200 rotate-12'}`}>
                <Bug className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                PestControl<span className={activeSection === 'inicio' ? 'text-emerald-600' : 'text-slate-500'}>Pro</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              <button 
                onClick={() => handleWhatsAppAction('quote')}
                className={`text-white px-8 py-3 rounded-full text-sm font-black transition-all duration-500 shadow-xl active:scale-95 flex items-center gap-2 ${
                  activeSection === 'garantia' 
                    ? 'bg-slate-900 shadow-slate-300 scale-105' 
                    : activeSection === 'servicios-verdes'
                    ? 'bg-emerald-800 hover:bg-emerald-900'
                    : 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700'
                }`}
              >
                <MessageSquare size={18} />
                Presupuesto Gratis
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900 bg-white shadow-md rounded-xl border border-slate-100">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[105] transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}></div>
        <div className={`fixed top-0 right-0 w-[80%] h-full bg-white z-[110] shadow-2xl transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 pt-24 space-y-8 h-full flex flex-col">
            <button 
              onClick={() => handleWhatsAppAction('quote')}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl text-xl font-black shadow-2xl flex items-center justify-center gap-3 animate-subtle-pulse"
            >
              <Phone size={24} />
              Llamar Ahora
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 lg:pt-52 lg:pb-40 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-black uppercase tracking-widest">
                <ShieldCheck size={18} />
                Expertos en Valparaíso
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Tu Hogar <span className="text-emerald-600 underline decoration-emerald-200 decoration-8 underline-offset-4">Sano</span> y Verde
              </h1>
              <p className="text-2xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Control de plagas, paisajismo y permacultura. Creamos espacios sostenibles con resultados garantizados.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button 
                  onClick={() => handleWhatsAppAction('quote')}
                  className="bg-emerald-600 text-white px-12 py-6 rounded-[2rem] text-2xl font-black hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 flex items-center justify-center gap-4 group active:scale-95"
                >
                  <MessageSquare size={28} />
                  WhatsApp Directo
                </button>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 text-slate-500 font-bold">
                <div className="flex items-center gap-2">
                  <Star className="text-amber-400 fill-amber-400" /> 4.9/5 Estrellas
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-emerald-600" /> Atención 24/7
                </div>
              </div>
            </div>

            <div className="flex-1 relative hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=800" 
                alt="Jardín y Control de Plagas" 
                className="rounded-[4rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Verdes */}
      <section id="servicios-verdes" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-widest">Nuestra Especialidad</h2>
            <h3 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">Servicios Verdes de Élite</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {GREEN_SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hover:border-emerald-200 transition-all group"
              >
                <div className="bg-white w-20 h-20 rounded-3xl shadow-lg flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  {getIcon(service.icon)}
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">{service.name}</h4>
                <p className="text-slate-600 mb-8 font-medium">{service.description}</p>
                <ul className="space-y-3 mb-10">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleWhatsAppAction('service', service.name)}
                  className="w-full py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 font-black hover:bg-slate-900 hover:text-white transition-all"
                >
                  Me interesa
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantía */}
      <section id="garantia" className="py-32 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-black text-slate-900 leading-none">Pagas después del servicio</h2>
              <p className="text-xl text-slate-600 font-medium">
                Confianza total. Realizamos el trabajo y cobramos solo tras tu total satisfacción.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white p-8 rounded-3xl shadow-sm flex items-center gap-4">
                  <Banknote className="text-emerald-600" />
                  <span className="font-bold">Efectivo</span>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm flex items-center gap-4">
                  <CreditCard className="text-emerald-600" />
                  <span className="font-bold">Transferencia</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl">
              <ShieldAlert className="text-emerald-500 mb-8" size={64} />
              <h3 className="text-3xl font-black mb-6">Garantía PestControl Pro</h3>
              <p className="text-lg text-slate-400 font-medium italic">
                "Si la plaga persiste o el diseño no cumple, el refuerzo es gratuito. Cubrimos toda la Región de Valparaíso."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bug className="text-emerald-600" size={24} />
          <span className="text-2xl font-black tracking-tighter">PestControlPro</span>
        </div>
        <p className="text-slate-400 font-bold">© 2024 Región de Valparaíso</p>
      </footer>

      {/* Botón Flotante */}
      <button 
        onClick={() => handleWhatsAppAction('quote')}
        className="fixed bottom-10 right-10 z-[200] bg-[#25D366] text-white p-6 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all group animate-subtle-pulse"
      >
        <MessageSquare size={38} fill="white" />
      </button>
    </div>
  );
};

export default App;
