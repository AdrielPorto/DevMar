import emailjs from 'emailjs-com';

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_uv0fcr9', 
  TEMPLATE_ID: 'template_81hxbjo', 
  USER_ID: 'I4RGoFLukzYhQeKdN', 
};

interface EmailParams {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async (data: EmailParams): Promise<void> => {
  const { SERVICE_ID, TEMPLATE_ID, USER_ID } = EMAILJS_CONFIG;

  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    message: data.message,
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
    console.log('Email enviado com sucesso!');
  } catch (error) {
    console.error('Falha ao enviar o email:', error);
    // Lança um erro para ser capturado pelo componente Contact.tsx
    throw new Error('Falha ao enviar a mensagem. Tente novamente mais tarde.');
  }
};