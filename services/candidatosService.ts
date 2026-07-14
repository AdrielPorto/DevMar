import { supabase } from "../supabase/supabaseClient";

export interface CooperadoFormData {
  nome_completo: string;
  email: string;
  whatsapp: string;
  estado: string;
  cidade: string;
  genero: string;
  genero_outro?: string;
  faixa_etaria: string;
  area_interesse: string;
  area_outro?: string;
  metodologia_agil: string;
  nivel_profissional: string;
  situacao_atual: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  mensagem?: string;
}

// Função original para buscar candidatos
export async function cadastrarCandidato(candidato: any) {
  const { data, error } = await supabase
    .from("candidatos")
    .select("*");

  console.log(data);
  console.log(error);
}

// Função para enviar formulário de candidato/cooperado
export async function submitCooperadoForm(formData: CooperadoFormData) {
  try {
    const { data, error } = await supabase
      .from("candidatos")
      .insert([
        {
          ...formData,
          status: 'Novo'
        }
      ])
      .select();

    if (error) {
      console.error('Erro ao enviar formulário:', error);
      
      // Detecta erro de email duplicado
      if (error.message && error.message.includes('candidatos_email_key')) {
        throw new Error('Este email já está registrado. Por favor, use um email diferente ou entre em contato conosco');
      }
      
      // Detecta erro de whatsapp duplicado
      if (error.message && error.message.includes('candidatos_whatsapp_key')) {
        throw new Error('Este número de WhatsApp já está registrado. Por favor, use um número diferente ou entre em contato conosco');
      }
      
      throw new Error(error.message || 'Falha ao enviar o formulário. Tente novamente mais tarde.');
    }

    console.log('Formulário enviado com sucesso!', data);
    return data;
  } catch (err) {
    console.error('Erro:', err);
    throw err;
  }
}