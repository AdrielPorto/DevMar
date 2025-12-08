export { ptBR } from './pt-BR';
export { enUS } from './en-US';

export type Language = 'pt-BR' | 'en-US';

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { code: 'en-US', label: 'English', flag: '🇺🇸' },
];

