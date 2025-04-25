// lib/types/attributes.ts

export interface AttributeOptionTranslation {
  id: string;
  label: string;
  locale: string;
}

export interface AttributeOption {
  id: string;
  adminName: string;
  sortOrder?: number;
  translations?: AttributeOptionTranslation[];
}

export interface AttributeTranslation {
  id: string;
  name: string;
  locale: string;
}

export interface Attribute {
  id: string;
  code: string;
  adminName: string;
  type: 'select';
  isVisibleOnFront: boolean;
  isRequired?: boolean;
  isFilterable?: boolean;
  isConfigurable?: boolean;
  isUserDefined?: boolean;
  swatchType?: string;
  options: AttributeOption[];
  translations?: AttributeTranslation[];
}
