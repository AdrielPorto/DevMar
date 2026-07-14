import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Heart, Code, Briefcase, MessageSquare, Loader2, CheckCircle, XCircle, LinkIcon, Github } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { submitCooperadoForm, CooperadoFormData } from '../services/candidatosService';

const Cooperado: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<CooperadoFormData>({
    nome_completo: '',
    email: '',
    whatsapp: '',
    estado: '',
    cidade: '',
    genero: '',
    genero_outro: '',
    faixa_etaria: '',
    area_interesse: '',
    area_outro: '',
    metodologia_agil: '',
    nivel_profissional: '',
    situacao_atual: '',
    linkedin: '',
    github: '',
    portfolio: '',
    mensagem: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string>('');
  const [cidades, setCidades] = useState<string[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);

  useEffect(() => {
    if (!formState.estado) {
      setCidades([]);
      return;
    }

    const carregarCidades = async () => {
      setLoadingCidades(true);
      setCidades([]);

      try {
        // Usa a sigla do estado diretamente (mais confiável que código numérico)
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formState.estado}/municipios`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const dados = await response.json();
        
        if (!Array.isArray(dados) || dados.length === 0) {
          throw new Error(`Nenhum dado retornado para ${formState.estado}`);
        }
        
        const cidadesOrdenadas = dados
          .map((municipio: any) => municipio.nome)
          .sort((a: string, b: string) => a.localeCompare(b));
        
        setCidades(cidadesOrdenadas);
        setFormState(prev => ({
          ...prev,
          cidade: ''
        }));
        
      } catch (error) {
        console.error(`❌ Erro ao buscar cidades para ${formState.estado}:`, error);
        setCidades([]);
      } finally {
        setLoadingCidades(false);
      }
    };

    carregarCidades();
  }, [formState.estado]);

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const areaInteresse = [
    'Desenvolvimento Backend',
    'Desenvolvimento Frontend',
    'Desenvolvimento Full Stack',
    'Desenvolvimento Mobile',
    'Ciência de Dados',
    'Engenharia de Dados',
    'Inteligência Artificial / Machine Learning',
    'DevOps',
    'Cloud Computing',
    'Segurança da Informação',
    'Infraestrutura e Redes',
    'QA / Testes de Software',
    'UX/UI Design',
    'Gestão de Projetos',
    'Product Management',
    'Desenvolvimento de Jogos',
    'Banco de Dados',
    'Suporte Técnico',
    'Outro'
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formState.nome_completo || formState.nome_completo.trim().split(/\s+/).length < 2) {
      newErrors.nome_completo = 'Por favor, informe seu nome completo';
    }
    if (!formState.email) {
      newErrors.email = 'Email é obrigatório';
    }
    if (!formState.whatsapp) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    }
    if (!formState.estado) {
      newErrors.estado = 'Estado é obrigatório';
    }
    if (!formState.cidade) {
      newErrors.cidade = 'Cidade é obrigatória';
    }
    if (!formState.genero) {
      newErrors.genero = 'Gênero é obrigatório';
    }
    if (formState.genero === 'Outro' && !formState.genero_outro) {
      newErrors.genero_outro = 'Por favor, especifique o gênero';
    }
    if (!formState.faixa_etaria) {
      newErrors.faixa_etaria = 'Faixa etária é obrigatória';
    }
    if (!formState.area_interesse) {
      newErrors.area_interesse = 'Área de interesse é obrigatória';
    }
    if (formState.area_interesse === 'Outra' && !formState.area_outro) {
      newErrors.area_outro = 'Por favor, especifique sua área de interesse';
    }
    if (!formState.metodologia_agil) {
      newErrors.metodologia_agil = 'Por favor, selecione uma opção';
    }
    if (!formState.nivel_profissional) {
      newErrors.nivel_profissional = 'Nível profissional é obrigatório';
    }
    if (!formState.situacao_atual) {
      newErrors.situacao_atual = 'Situação atual é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [id]: value
    }));
    
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
    
    if (id === 'email' && submitError) {
      setSubmitError('');
      setSubmitStatus('idle');
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormState(prev => ({
      ...prev,
      whatsapp: value
    }));
    if (errors.whatsapp) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.whatsapp;
        return newErrors;
      });
    }
    if (submitError) {
      setSubmitError('');
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitCooperadoForm(formState);
      setSubmitStatus('success');
      setFormState({
        nome_completo: '',
        email: '',
        whatsapp: '',
        estado: '',
        cidade: '',
        genero: '',
        genero_outro: '',
        faixa_etaria: '',
        area_interesse: '',
        area_outro: '',
        metodologia_agil: '',
        nivel_profissional: '',
        situacao_atual: '',
        linkedin: '',
        github: '',
        portfolio: '',
        mensagem: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro ao enviar o formulário.';
      setSubmitError(errorMessage);
      setSubmitStatus('error');
      
      // Adiciona highlight visual ao campo com erro
      if (errorMessage.includes('email')) {
        setErrors(prev => ({
          ...prev,
          email: errorMessage
        }));
      } else if (errorMessage.includes('WhatsApp') || errorMessage.includes('whatsapp')) {
        setErrors(prev => ({
          ...prev,
          whatsapp: errorMessage
        }));
      }
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-brand-bg min-h-[calc(100vh-80px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-blue mb-4">
              {t.cooperado?.title || 'Quero ser Cooperado'}
            </h1>
            <p className="text-brand-slate text-lg max-w-2xl mx-auto">
              {t.cooperado?.subtitle || 'Junte-se à DevMar e faça parte de uma cooperativa de tecnologia inovadora.'}
            </p>
          </ScrollReveal>
        </div>

        {/* Form */}
        <ScrollReveal delay={0.2}>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border-t-4 border-brand-red">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-brand-red/10 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-brand-red" />
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-blue">
                {t.cooperado?.formTitle || 'Inscrição para Cooperado'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Nome Completo */}
              <div>
                <label htmlFor="nome_completo" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                  <User className="h-4 w-4" />
                  Nome Completo <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  id="nome_completo"
                  className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                    errors.nome_completo ? 'border-red-500' : 'border-brand-slate/20'
                  } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue`}
                  placeholder="Seu nome completo"
                  value={formState.nome_completo}
                  onChange={handleChange}
                />
                {errors.nome_completo && (
                  <p className="text-red-500 text-sm mt-1">{errors.nome_completo}</p>
                )}
              </div>

              {/* Email e WhatsApp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <Mail className="h-4 w-4" />
                    Email <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                      errors.email ? 'border-red-500' : 'border-brand-slate/20'
                    } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue`}
                    placeholder="seu@email.com"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="whatsapp" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <Phone className="h-4 w-4" />
                    WhatsApp <span className="text-brand-red">*</span>
                  </label>
                  <div className={`rounded-lg border ${
                    errors.whatsapp ? 'border-red-500' : 'border-brand-slate/20'
                  } transition-all`}>
                    <PhoneInput
                      country={'br'}
                      value={formState.whatsapp}
                      onChange={handlePhoneChange}
                      placeholder=""
                      inputProps={{
                        id: 'whatsapp',
                        name: 'whatsapp',
                        required: true
                      }}
                      containerClass="phone-input-container"
                      inputClass="w-full text-brand-blue"
                      buttonClass="phone-input-button"
                      dropdownClass="phone-input-dropdown"
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                  )}
                </div>
              </div>

              {/* Estado e Cidade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="estado" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <MapPin className="h-4 w-4" />
                    Estado <span className="text-brand-red">*</span>
                  </label>
                  <select
                    id="estado"
                    className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                      errors.estado ? 'border-red-500' : 'border-brand-slate/20'
                    } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer`}
                    value={formState.estado}
                    onChange={handleChange}
                  >
                    <option value="">Selecione um estado</option>
                    {estados.map(estado => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                  {errors.estado && (
                    <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="cidade" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <MapPin className="h-4 w-4" />
                    Cidade <span className="text-brand-red">*</span>
                  </label>
                  <select
                    id="cidade"
                    className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                      errors.cidade ? 'border-red-500' : 'border-brand-slate/20'
                    } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer ${
                      !formState.estado ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    value={formState.cidade}
                    onChange={handleChange}
                    disabled={!formState.estado || loadingCidades}
                  >
                    <option value="" disabled hidden>{
                      !formState.estado ? 'Selecione um estado primeiro' : loadingCidades ? 'Carregando cidades...' : 'Selecione uma cidade'
                    }</option>
                    {cidades.map(cidade => (
                      <option key={cidade} value={cidade}>{cidade}</option>
                    ))}
                  </select>
                  {errors.cidade && (
                    <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>
                  )}
                </div>
              </div>

              {/* Gênero */}
              <div>
                <label htmlFor="genero" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                  <Heart className="h-4 w-4" />
                  Gênero <span className="text-brand-red">*</span>
                </label>
                <select
                  id="genero"
                  className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                    errors.genero ? 'border-red-500' : 'border-brand-slate/20'
                  } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer`}
                  value={formState.genero}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Não binário">Não binário</option>
                  <option value="Outro">Outro</option>
                </select>
                {errors.genero && (
                  <p className="text-red-500 text-sm mt-1">{errors.genero}</p>
                )}
              </div>

              {/* Gênero Outro (condicional) */}
              {formState.genero === 'Outro' && (
                <div>
                  <label htmlFor="genero_outro" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    Especifique <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="genero_outro"
                    className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                      errors.genero_outro ? 'border-red-500' : 'border-brand-slate/20'
                    } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue`}
                    placeholder="Especifique seu gênero"
                    value={formState.genero_outro || ''}
                    onChange={handleChange}
                  />
                  {errors.genero_outro && (
                    <p className="text-red-500 text-sm mt-1">{errors.genero_outro}</p>
                  )}
                </div>
              )}

              {/* Faixa Etária */}
              <div>
                <label htmlFor="faixa_etaria" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                  Faixa Etária <span className="text-brand-red">*</span>
                </label>
                <select
                  id="faixa_etaria"
                  className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                    errors.faixa_etaria ? 'border-red-500' : 'border-brand-slate/20'
                  } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer`}
                  value={formState.faixa_etaria}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Selecione</option>
                  <option value="18-24">18 - 24 anos</option>
                  <option value="25-34">25 - 34 anos</option>
                  <option value="35-44">35 - 44 anos</option>
                  <option value="45-54">45 - 54 anos</option>
                  <option value="55+">55+ anos</option>
                </select>
                {errors.faixa_etaria && (
                  <p className="text-red-500 text-sm mt-1">{errors.faixa_etaria}</p>
                )}
              </div>

              {/* Área de Interesse */}
              <div>
                <label htmlFor="area_interesse" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                  <Code className="h-4 w-4" />
                  Área de Interesse <span className="text-brand-red">*</span>
                </label>
                <select
                  id="area_interesse"
                  className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                    errors.area_interesse ? 'border-red-500' : 'border-brand-slate/20'
                  } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer`}
                  value={formState.area_interesse}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Selecione uma área</option>
                  {areaInteresse.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                {errors.area_interesse && (
                  <p className="text-red-500 text-sm mt-1">{errors.area_interesse}</p>
                )}
              </div>

              {/* Área Outro (condicional) */}
              {formState.area_interesse === 'Outro' && (
                <div>
                  <label htmlFor="area_outro" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    Qual? <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="area_outro"
                    className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                      errors.area_outro ? 'border-red-500' : 'border-brand-slate/20'
                    } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue`}
                    placeholder="Especifique sua área de interesse"
                    value={formState.area_outro || ''}
                    onChange={handleChange}
                  />
                  {errors.area_outro && (
                    <p className="text-red-500 text-sm mt-1">{errors.area_outro}</p>
                  )}
                </div>
              )}

              {/* Metodologia Ágil */}
              <div>
                <label htmlFor="metodologia_agil" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                  <Briefcase className="h-4 w-4" />
                  Você possui experiência com metodologias ágeis? <span className="text-brand-red">*</span>
                </label>
                <select
                  id="metodologia_agil"
                  className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                    errors.metodologia_agil ? 'border-red-500' : 'border-brand-slate/20'
                  } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer`}
                  value={formState.metodologia_agil}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Selecione</option>
                  <option value="Scrum">Scrum</option>
                  <option value="Kanban">Kanban</option>
                  <option value="Scrum e Kanban">Scrum e Kanban</option>
                  <option value="Outras metodologias">Outras metodologias</option>
                  <option value="Ainda não possuo experiência">Ainda não possuo experiência</option>
                </select>
                {errors.metodologia_agil && (
                  <p className="text-red-500 text-sm mt-1">{errors.metodologia_agil}</p>
                )}
              </div>

              {/* Nível Profissional */}
              <div>
                <label htmlFor="nivel_profissional" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                  <Briefcase className="h-4 w-4" />
                  Nível Profissional <span className="text-brand-red">*</span>
                </label>
                <select
                  id="nivel_profissional"
                  className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                    errors.nivel_profissional ? 'border-red-500' : 'border-brand-slate/20'
                  } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer`}
                  value={formState.nivel_profissional}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Selecione</option>
                  <option value="Estudante">Estudante</option>
                  <option value="Estagiário(a)">Estagiário(a)</option>
                  <option value="Júnior">Trainee</option>
                  <option value="Júnior">Júnior</option>
                  <option value="Pleno">Pleno</option>
                  <option value="Sênior">Sênior</option>
                  <option value="Especialista">Especialista</option>
                  <option value="Tech Lead">Tech Lead</option>
                  <option value="Gestor(a)">Gestor(a)</option>
                </select>
                {errors.nivel_profissional && (
                  <p className="text-red-500 text-sm mt-1">{errors.nivel_profissional}</p>
                )}
              </div>

              {/* Situação Atual */}
              <div>
                <label htmlFor="situacao_atual" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                  Atualmente você está <span className="text-brand-red">*</span>
                </label>
                <select
                  id="situacao_atual"
                  className={`w-full px-4 py-3 rounded-lg bg-brand-bg border ${
                    errors.situacao_atual ? 'border-red-500' : 'border-brand-slate/20'
                  } focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue appearance-none cursor-pointer`}
                  value={formState.situacao_atual}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Selecione</option>
                  <option value="Empregado(a)">Empregado(a)</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Procurando oportunidade">Procurando oportunidade</option>
                  <option value="Estudando">Estudando</option>
                  <option value="Outro">Outro</option>
                </select>
                {errors.situacao_atual && (
                  <p className="text-red-500 text-sm mt-1">{errors.situacao_atual}</p>
                )}
              </div>

              {/* Redes Sociais e Portfolio */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="linkedin" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <LinkIcon className="h-4 w-4" />
                    LinkedIn <span className="text-gray-500 opacity-60 text-xs font-normal">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue"
                    placeholder="seu-linkedin"
                    value={formState.linkedin || ''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="github" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <Github className="h-4 w-4" />
                    GitHub <span className="text-gray-500 opacity-60 text-xs font-normal">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="github"
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue"
                    placeholder="seu-github"
                    value={formState.github || ''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="portfolio" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                    <LinkIcon className="h-4 w-4" />
                    Portfolio <span className="text-gray-500 opacity-60 text-xs font-normal">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="portfolio"
                    className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue"
                    placeholder="seu-portfolio.com"
                    value={formState.portfolio || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Mensagem Adicional */}
              <div>
                <label htmlFor="mensagem" className="flex items-center gap-2 text-sm font-medium text-brand-slate mb-2">
                  <MessageSquare className="h-4 w-4" />
                  Mensagem Adicional <span className="text-gray-500 opacity-60 text-xs font-normal">(opcional)</span>
                </label>
                <textarea
                  id="mensagem"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-brand-bg border border-brand-slate/20 focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-blue resize-none"
                  placeholder="Conte-nos mais sobre você, suas experiências e por que quer fazer parte da DevMar..."
                  value={formState.mensagem || ''}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Mensagem de Status */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p>Formulário enviado com sucesso! Entraremos em contato em breve.</p>
                </div>
              )}
              
              {submitStatus === 'error' && submitError && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-300 text-red-800">
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Erro ao enviar formulário</p>
                    <p className="text-sm mt-1">{submitError}</p>
                  </div>
                </div>
              )}

              {/* Botão de Envio */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full justify-center text-lg py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Inscrição
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Cooperado;
