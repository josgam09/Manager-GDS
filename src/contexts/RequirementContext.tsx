import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Requirement, RequirementStatus, RequirementPriority, RequirementType, GDSSystem, RequirementCategory } from '@/types/requirement';

interface RequirementContextType {
  requirements: Requirement[];
  addRequirement: (requirement: Omit<Requirement, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => void;
  updateRequirement: (id: string, updates: Partial<Requirement>) => void;
  deleteRequirement: (id: string) => void;
  getRequirement: (id: string) => Requirement | undefined;
  addRequirementHistory: (id: string, action: string, comment?: string) => void;
}

const RequirementContext = createContext<RequirementContextType | undefined>(undefined);

// Mock data inicial de requerimientos GDS
const mockRequirements: Requirement[] = [
  {
    id: '1',
    ticketNumber: 'GDS-2025-001',
    title: 'Error al procesar reserva en Sabre',
    requirementType: 'incidencia',
    gdsSystem: 'sabre',
    category: 'reservas',
    requesterName: 'María González',
    requesterEmail: 'maria.gonzalez@agencia.com',
    requesterPhone: '+54 11 1234-5678',
    organization: 'Viajes Globales SA',
    officeId: 'BUEXX08AA',
    pcc: '4TL8',
    description: 'Al intentar crear una reserva con múltiples segmentos, el sistema GDS Sabre retorna error de timeout. El problema ocurre consistentemente con vuelos que tienen más de 3 segmentos.',
    expectedResult: 'Poder crear reservas con múltiples segmentos sin errores de timeout',
    affectedPNR: 'ABC123',
    errorMessage: 'ERR: TIMEOUT - UNABLE TO PROCESS REQUEST',
    initialDate: new Date('2025-01-15'),
    status: 'en-proceso',
    priority: 'alta',
    assignedTo: 'Juan Pérez',
    assignedTeam: 'Soporte GDS',
    slaDeadline: new Date('2025-01-20'),
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-16'),
    history: [
      {
        id: '1',
        date: new Date('2025-01-15'),
        action: 'Requerimiento creado',
        user: 'Sistema',
      },
      {
        id: '2',
        date: new Date('2025-01-16'),
        action: 'Asignado a Juan Pérez - Soporte GDS',
        user: 'Admin',
        comment: 'Prioridad alta debido a impacto en operación',
      },
    ],
    tags: ['sabre', 'reservas', 'timeout'],
  },
  {
    id: '2',
    ticketNumber: 'GDS-2025-002',
    title: 'Consulta sobre tarifas corporativas en Amadeus',
    requirementType: 'consulta',
    gdsSystem: 'amadeus',
    category: 'tarifas',
    requesterName: 'Ana Martínez',
    requesterEmail: 'ana.martinez@travel.com',
    requesterPhone: '+54 11 9876-5432',
    organization: 'Travel Express',
    officeId: 'BUEXX09BB',
    pcc: 'BUE123',
    description: 'Necesito información sobre cómo configurar las tarifas corporativas negociadas para el cliente XYZ Corporation en el sistema Amadeus. No encuentro documentación actualizada.',
    expectedResult: 'Obtener guía paso a paso para configuración de tarifas corporativas',
    initialDate: new Date('2025-01-18'),
    status: 'nuevo',
    priority: 'media',
    assignedTeam: 'Comercial',
    slaDeadline: new Date('2025-01-25'),
    createdAt: new Date('2025-01-18'),
    updatedAt: new Date('2025-01-18'),
    history: [
      {
        id: '1',
        date: new Date('2025-01-18'),
        action: 'Requerimiento creado',
        user: 'Sistema',
      },
    ],
    tags: ['amadeus', 'tarifas', 'corporativo'],
  },
  {
    id: '3',
    ticketNumber: 'GDS-2025-003',
    title: 'Solicitud de acceso a reportes de auditoría',
    requirementType: 'solicitud',
    gdsSystem: 'sabre',
    category: 'reportes',
    requesterName: 'Carlos Rodríguez',
    requesterEmail: 'carlos.rodriguez@agencia.com',
    requesterPhone: '+54 11 5555-6666',
    organization: 'Viajes Premium',
    officeId: 'BUEXX10CC',
    pcc: '8XYZ',
    description: 'Solicito acceso a los reportes de auditoría de transacciones del último trimestre. Necesito analizar el volumen de reservas y patrones de uso del GDS.',
    expectedResult: 'Acceso otorgado a reportes de auditoría con permisos de lectura',
    initialDate: new Date('2025-01-10'),
    status: 'resuelto',
    priority: 'baja',
    assignedTo: 'Laura Sánchez',
    assignedTeam: 'Administración',
    slaDeadline: new Date('2025-01-17'),
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-14'),
    resolvedAt: new Date('2025-01-14'),
    history: [
      {
        id: '1',
        date: new Date('2025-01-10'),
        action: 'Requerimiento creado',
        user: 'Sistema',
      },
      {
        id: '2',
        date: new Date('2025-01-11'),
        action: 'Asignado a Laura Sánchez - Administración',
        user: 'Admin',
      },
      {
        id: '3',
        date: new Date('2025-01-14'),
        action: 'Requerimiento resuelto',
        user: 'Laura Sánchez',
        comment: 'Acceso otorgado. Credenciales enviadas por email',
      },
    ],
    tags: ['reportes', 'auditoría', 'acceso'],
  },
];

export const RequirementProvider = ({ children }: { children: ReactNode }) => {
  const [requirements, setRequirements] = useState<Requirement[]>(mockRequirements);

  const addRequirement = (requirement: Omit<Requirement, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => {
    const newRequirement: Requirement = {
      ...requirement,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      history: [
        {
          id: '1',
          date: new Date(),
          action: 'Requerimiento creado',
          user: 'Sistema',
        },
      ],
    };
    setRequirements([newRequirement, ...requirements]);
  };

  const updateRequirement = (id: string, updates: Partial<Requirement>) => {
    setRequirements(requirements.map(requirement => 
      requirement.id === id 
        ? { ...requirement, ...updates, updatedAt: new Date() }
        : requirement
    ));
  };

  const deleteRequirement = (id: string) => {
    setRequirements(requirements.filter(requirement => requirement.id !== id));
  };

  const getRequirement = (id: string) => {
    return requirements.find(requirement => requirement.id === id);
  };

  const addRequirementHistory = (id: string, action: string, comment?: string) => {
    setRequirements(requirements.map(requirement => {
      if (requirement.id === id) {
        const newHistory = {
          id: Date.now().toString(),
          date: new Date(),
          action,
          user: 'Usuario',
          comment,
        };
        return {
          ...requirement,
          history: [...requirement.history, newHistory],
          updatedAt: new Date(),
        };
      }
      return requirement;
    }));
  };

  return (
    <RequirementContext.Provider value={{
      requirements,
      addRequirement,
      updateRequirement,
      deleteRequirement,
      getRequirement,
      addRequirementHistory,
    }}>
      {children}
    </RequirementContext.Provider>
  );
};

export const useRequirements = () => {
  const context = useContext(RequirementContext);
  if (context === undefined) {
    throw new Error('useRequirements must be used within a RequirementProvider');
  }
  return context;
};

