// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

// However, these types are generated automatically if you're using an ORM such as Prisma.
declare module 'next-auth' {
  interface Session {
    accessToken?: any;
    refreshToken?: any;
    user_data?: any;
  }

  interface User {
    tokens?: {
      access_token: string;
      refresh_token: string;
      token_type: string;
    };
    user_data?: HermesUser;
  }
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  tokens: any; //TODO armar tipo de datos para el retorno de los tokens
  user_data?: HermesUser;
};

export type Premise = {
  id: number;
  name: string;
  logo: string;
  privacy_policy: string;
  disabled: boolean;
}

export type Participant = {
  id?: number;
  full_name: string;
  email: string;
  document_number?: string;
  phone_number: string;
  accepts_terms_of_service: boolean;
  accepts_privacy_policy: boolean;
  over_18: boolean;
}

export type Welcome = {
  document_number?: string;
}


//HERMES
export type Role = {
  id: 1;
  name: string;
  perms: number[];
  disabled: boolean;
}

export type Tenant = {
  id: number;
  name: string;
  disabled: boolean;
  stores: Premise[];
}

export type MediaFiles = {
  id: number;
  name: string;
  path: string;
  mime_type: string;
  article_id: number;
  disabled: boolean;
}

export type HermesUser = {
  id: number;
  username: string;
  tenant: Tenant;
  store: Premise;
  role: Role;
  disabled: boolean;
}