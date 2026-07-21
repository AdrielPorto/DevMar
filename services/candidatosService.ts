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
  metodologia_agil: string;
  situacao_atual: string; 
  situacao_outro?: string;
  formacao_academica: string;
  formacao_outro?: string; 
  nivel_profissional: string; 
  stack_principal?: string;
  nivel_ingles: string;
  nivel_espanhol: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  mensagem?: string;
}

export async function cadastrarCandidato(candidato: any) {
  const { data, error } = await supabase
    .from("candidatos_cooperativa")
    .select("*");

  console.log(data);
  console.log(error);
}

export async function submitCooperadoForm(formData: CooperadoFormData) {
  try {
    const { data, error } = await supabase
      .from("candidatos_cooperativa")
      .insert([
        {
          ...formData,
          status: 'Novo'
        }
      ])
      .select();

    if (error) {
      console.error('Erro ao enviar formulário:', error);
      

      if (error.message && error.message.includes('candidatos_cooperativa_email_key')) {
        throw new Error('Este email já está registrado. Por favor, use um email diferente ou entre em contato conosco');
      }
      
      if (error.message && error.message.includes('candidatos_cooperativa_whatsapp_key')) {
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

export async function verificarDuplicidade(email: string, whatsapp: string) {
  const [emailRes, wppRes] = await Promise.all([
    supabase.from("candidatos_cooperativa").select("email").eq("email", email).maybeSingle(),
    supabase.from("candidatos_cooperativa").select("whatsapp").eq("whatsapp", whatsapp).maybeSingle()
  ]);

  return {
    emailExists: !!emailRes.data,
    whatsappExists: !!wppRes.data
  };
}