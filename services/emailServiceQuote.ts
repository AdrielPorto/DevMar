import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

interface QuoteEmailParams {
  name: string;
  email: string;
  company: string;
  service: string;
  description: string;
  deadline: string;
  budget: string;
}

export const sendQuoteEmail = async (formElement: HTMLFormElement): Promise<void> => {
  try {
    await emailjs.sendForm(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.QUOTE,
      formElement,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    console.log('Solicitação de orçamento enviada com sucesso!');
  } catch (error) {
    console.error('Falha ao enviar solicitação de orçamento:', error);
    throw new Error('Falha ao enviar a solicitação. Tente novamente mais tarde.');
  }
};

