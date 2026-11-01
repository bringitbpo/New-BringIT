// Single place for BringIT contact details used across the site.
export const WHATSAPP_NUMBER = '8801351656330';
export const WHATSAPP_DISPLAY = '+880 1351-656330';
export const US_PHONE_TEL = '+15163411071';
export const US_PHONE_DISPLAY = '+1 516-341-1071';
export const EMAIL = 'bringit.bpo@gmail.com';

export const whatsappLink = (message = "Hi, I'd like to learn more about BringIT") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
