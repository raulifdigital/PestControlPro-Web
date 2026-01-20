
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from '../constants';

export const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const generateInterestMessage = (type: 'service' | 'product' | 'quote', name?: string) => {
  const greeting = "Hola PestControl Pro, ";
  
  if (type === 'service' && name) {
    return `${greeting}estoy interesado en contratar el "${name}". ¿Podrían darme más detalles sobre la disponibilidad?`;
  }
  if (type === 'product' && name) {
    return `${greeting}me gustaría comprar el producto "${name}". ¿Tienen stock disponible y hacen envíos?`;
  }
  if (type === 'quote') {
    return `${greeting}necesito un presupuesto personalizado para mi propiedad. ¿Qué datos necesitan para evaluar el costo?`;
  }
  return `${greeting}necesito ayuda profesional con un problema de plagas en mi domicilio.`;
};
