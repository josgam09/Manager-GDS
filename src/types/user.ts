// Tipos de Usuario y Autenticación

export type UserRole = 'ADMINISTRADOR' | 'SUPERVISOR' | 'ANALISTA';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthUser extends User {
  token?: string;
}

// Credenciales de demo
export const DEMO_USERS = [
  {
    id: '1',
    name: 'Administrador del Sistema',
    email: 'admin@jetsmart.com',
    password: 'password123',
    role: 'ADMINISTRADOR' as UserRole,
    isActive: true,
    createdAt: new Date('2025-01-01'),
  },
  {
    id: '2',
    name: 'Supervisor de Soporte',
    email: 'supervisor@jetsmart.com',
    password: 'password123',
    role: 'SUPERVISOR' as UserRole,
    isActive: true,
    createdAt: new Date('2025-01-01'),
  },
  {
    id: '3',
    name: 'Analista GDS',
    email: 'analista@jetsmart.com',
    password: 'password123',
    role: 'ANALISTA' as UserRole,
    isActive: true,
    createdAt: new Date('2025-01-01'),
  },
];


