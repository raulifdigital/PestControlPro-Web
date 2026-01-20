
import { ServicePack, Product, NavItem } from './types';

export const WHATSAPP_NUMBER = '56965191887';
export const WHATSAPP_BASE_URL = 'https://wa.me/';
export const SITE_URL = 'https://tu-dominio-gratis.netlify.app'; // Cambia esto al dominio final

export const NAV_ITEMS: NavItem[] = [];

export const GREEN_SERVICES = [
  {
    id: 'jardineria',
    name: 'Jardinería Profesional',
    description: 'Mantenimiento integral de áreas verdes, podas técnicas, fertilización orgánica y sanidad vegetal.',
    icon: 'Sprout',
    features: ['Podas de altura y formación', 'Control biológico de plagas de jardín', 'Recuperación de césped']
  },
  {
    id: 'paisajismo',
    name: 'Paisajismo Estético',
    description: 'Diseño y creación de espacios exteriores que armonizan belleza y funcionalidad en el clima mediterráneo.',
    icon: 'Trees',
    features: ['Diseño 3D de jardines', 'Selección de especies ornamentales', 'Iluminación y senderos']
  },
  {
    id: 'permacultura',
    name: 'Diseño Permacultural',
    description: 'Sistemas sostenibles que imitan la naturaleza. Bosques comestibles, huertos y eficiencia hídrica extrema.',
    icon: 'Leaf',
    features: ['Recolección de aguas lluvia', 'Huertos orgánicos urbanos', 'Compostaje a escala']
  }
];

export const SERVICE_PACKS: ServicePack[] = [
  {
    id: 'pack-express',
    name: 'Pack Hogar Express',
    description: 'Solución rápida para departamentos y casas pequeñas. Eliminación de insectos rastreros.',
    price: '$35.000',
    features: [
      'Desinsectación perimetral',
      'Control de arañas y hormigas',
      'Garantía de 30 días',
      'Certificado digital inmediato'
    ],
    icon: 'Zap'
  },
  {
    id: 'pack-integral',
    name: 'Pack Full Erradicación',
    description: 'Nuestro servicio más solicitado. Combate insectos y roedores en una sola intervención.',
    price: '$65.000',
    features: [
      'Desinsectación + Desratización',
      'Control de baratas y roedores',
      'Sellado preventivo de accesos',
      'Garantía de 90 días',
      'Visita de refuerzo incluida'
    ],
    icon: 'ShieldCheck'
  },
  {
    id: 'pack-pyme',
    name: 'Pack Comercial / PyME',
    description: 'Especializado para restaurantes y locales con exigencia sanitaria MINSAL.',
    price: 'Desde $80.000',
    features: [
      'Resolución Sanitaria completa',
      'Control mensual preventivo',
      'Libro de registro técnico',
      'Atención de urgencia 24h'
    ],
    icon: 'Building2'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'gel-roach',
    name: 'Gel Profesional Cucarachas',
    description: 'Cebo de alta atracción. Erradica nidos completos en cocinas sin olor.',
    price: '$12.990',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cebo-block',
    name: 'Cebo Ratones Premium',
    description: 'Bloques parafinados resistentes a humedad. Efectivo contra ratas y ratones.',
    price: '$14.500',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'spray-barrera',
    name: 'Insecticida Residual 1L',
    description: 'Barrera química protectora para perímetros. Larga duración (6 meses).',
    price: '$18.000',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=400'
  }
];
