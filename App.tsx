
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
      {/* Barra de Progreso de Lectura */}
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
                {activeSection === 'garantia' ? 'Pagar / Cotizar' : 'Presupuesto Gratis'}
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
            <div className="space-y-6 flex-grow">
              <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2 opacity-60">Usted está en:</p>
                <p className="text-xl font-black text-emerald-600">
                  {activeSection === 'inicio' ? 'Inicio / Plagas' : activeSection === 'servicios-verdes' ? 'Servicios Verdes' : 'Garantía y Pagos'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => handleWhatsAppAction('quote')}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl text-xl font-black shadow-2xl flex items-center justify-center gap-3 animate-subtle-pulse"
            >
              <Phone size={24} />
              Llamar Técnico
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
                Certificación Sanitaria y Ambiental
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Soluciones para tu <span className="text-emerald-600 underline decoration-emerald-200 decoration-8 underline-offset-4">Hogar</span> y Jardín
              </h1>
              <p className="text-2xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Expertos en control de plagas, paisajismo y permacultura. Creamos espacios sanos, bellos y sostenibles en toda la Región de Valparaíso.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button 
                  onClick={() => handleWhatsAppAction('quote')}
                  className="bg-emerald-600 text-white px-12 py-6 rounded-[2rem] text-2xl font-black hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 flex items-center justify-center gap-4 group active:scale-95"
                >
                  <MessageSquare size={28} />
                  WhatsApp Directo
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
                  <Star className="text-amber-400 fill-amber-400" size={20} />
                  <span className="font-bold text-slate-700">4.9/5 Promedio</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
                  <Clock className="text-emerald-600" size={20} />
                  <span className="font-bold text-slate-700">Atención 24/7</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
                  <MapPin className="text-emerald-600" size={20} />
                  <span className="font-bold text-slate-700">Toda la 5ta Región</span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative hidden lg:block">
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(16,185,129,0.3)] border-[12px] border-white rotate-2 hover:rotate-0 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=800" alt="Jardinería y paisajismo" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl z-20 border border-slate-100 flex items-center gap-5">
                <div className="bg-emerald-600 p-4 rounded-2xl text-white">
                  <Sprout size={32} />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 leading-none mb-1">Eco-Soluciones</div>
                  <div className="text-slate-500 font-bold">Respeto por el Entorno</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Green Services Section */}
      <section id="servicios-verdes" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-widest">Sostenibilidad y Belleza</h2>
            <h3 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">Servicios Verdes de Élite</h3>
            <p className="text-xl text-slate-500 font-medium">Llevamos la naturaleza a tu hogar con técnicas de vanguardia y respeto ambiental.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {GREEN_SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-2xl hover:shadow-emerald-50 group"
              >
                <div className="bg-white w-20 h-20 rounded-3xl shadow-lg flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                  {getIcon(service.icon)}
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">{service.name}</h4>
                <p className="text-slate-600 mb-8 font-medium leading-relaxed">{service.description}</p>
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
                  className="w-full py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-900 font-black hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2"
                >
                  Me interesa
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment & Trust Section */}
      <section id="garantia" className={`py-32 relative overflow-hidden transition-all duration-700 ${activeSection === 'garantia' ? 'bg-slate-100' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl font-black text-slate-900 leading-none">Pagas después del servicio</h2>
                <p className="text-xl text-slate-600 font-medium leading-relaxed">
                  Confianza total en cada proyecto. Ya sea control de plagas o diseño de jardines, emitimos certificado y cobramos solo tras tu satisfacción.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center space-y-4 group hover:border-emerald-200 transition-colors">
                  <div className="bg-emerald-100 p-5 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
                    <Banknote size={40} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">Efectivo</h4>
                  <p className="text-slate-500 font-medium">Pago directo al técnico.</p>
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center space-y-4 group hover:border-emerald-200 transition-colors">
                  <div className="bg-emerald-100 p-5 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
                    <CreditCard size={40} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">Transferencia</h4>
                  <p className="text-slate-500 font-medium">Datos bancarios inmediatos.</p>
                </div>
              </div>
            </div>

            <div className={`rounded-[4rem] p-12 lg:p-20 relative shadow-2xl overflow-hidden group transition-all duration-700 ${activeSection === 'garantia' ? 'bg-slate-900 scale-105' : 'bg-slate-800'}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
              <ShieldAlert className="text-emerald-500 mb-10" size={80} />
              <h3 className="text-4xl font-black text-white mb-6 leading-tight">Garantía PestControl Pro</h3>
              <p className="text-xl text-slate-400 font-medium mb-12 leading-relaxed italic">
                "Nuestra garantía cubre tanto la erradicación de plagas como la supervivencia de nuestras instalaciones de paisajismo. Calidad asegurada en la 5ta Región."
              </p>
              <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                <div className="text-6xl font-black text-emerald-500 tracking-tighter">100%</div>
                <div className="text-lg font-bold uppercase tracking-widest text-slate-400">Compromiso<br/>Ambiental</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-600 p-2 rounded-xl">
                  <Bug className="text-white" size={32} />
                </div>
                <span className="text-3xl font-black text-slate-900 tracking-tighter">PestControl<span className="text-emerald-600">Pro</span></span>
              </div>
              <p className="text-slate-500 font-bold max-w-xs text-center md:text-left">
                Plagas, Jardinería y Paisajismo. Expertos certificados en la V Región.
              </p>
            </div>
            
            <div className="text-slate-400 text-sm font-bold flex flex-col items-center md:items-end gap-2 text-center md:text-right">
              <span>© 2024 PestControl Pro</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-300">Región de Valparaíso</span>
              <button 
                onClick={() => handleWhatsAppAction('quote')}
                className="mt-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-black"
              >
                <Phone size={14} />
                +{WHATSAPP_NUMBER}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón Flotante Optimizado */}
      <button 
        onClick={() => handleWhatsAppAction('quote')}
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-10 right-10 z-[200] bg-[#25D366] text-white p-6 rounded-full shadow-[0_30px_60px_-15px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-90 transition-all duration-300 group animate-subtle-pulse"
      >
        <MessageSquare size={38} fill="white" />
        <span className="absolute right-full mr-6 bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl border border-slate-800">
          ¿En qué podemos ayudarte? 🟢
        </span>
      </button>
    </div>
  );
};

export default App;
