
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export enum LegalCategory {
  LABORAL = 'Código del Trabajo',
  CIVIL = 'Código Civil',
  PENAL = 'COIP',
  PROCESAL = 'COGEP',
  CONSTITUCIONAL = 'Constitución',
  COMPANIAS = 'Ley de Compañías',
  DATOS = 'Protección de Datos',
  COMERCIO = 'Código de Comercio'
}

export interface LegalTip {
  title: string;
  description: string;
  category: LegalCategory;
}
