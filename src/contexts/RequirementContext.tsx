import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Requirement, RequirementStatus, RequirementPriority } from '@/types/requirement';

interface RequirementContextType {
  requirements: Requirement[];
  addRequirement: (requirement: Omit<Requirement, 'id' | 'createdAt' | 'updatedAt' | 'history' | 'ticketNumber'>) => void;
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
    nombreAsesor: 'Sandra Milena Jaramillo',
    canalConsulta: 'SISTEMA DE DISTRIBUCIÓN GDS',
    origenConsulta: 'AMADEUS',
    esSoporteIngles: false,
    horaIngresoCorreo: '09:30',
    pnrTktLocalizador: 'ABC123',
    correoElectronico: 'cliente@example.com',
    tipoSolicitud: 'Waiver GDS - Sabre',
    reclamoIncidente: 'Error en Emisión (Amadeus - Navitaire -Sabre)',
    solicitudCliente: 'Cliente solicita waiver para cambio de vuelo debido a error en la emisión del ticket. El sistema no permitió completar la reserva correctamente.',
    informacionBrindada: 'Se revisó el PNR en Amadeus. Se identificó error en la tarifa aplicada. Se procedió a solicitar waiver al GDS para realizar el cambio sin penalidad.',
    observaciones: 'Caso resuelto satisfactoriamente. Cliente confirmó recepción del nuevo ticket.',
    status: 'en-proceso',
    priority: 'alta',
    assignedTo: 'Juan Pérez',
    assignedTeam: 'Soporte GDS',
    slaDeadline: new Date('2025-01-20'),
    initialDate: new Date('2025-01-15'),
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
        comment: 'Prioridad alta debido a error en emisión',
      },
    ],
    tags: ['amadeus', 'waiver', 'error-emision'],
  },
  {
    id: '2',
    ticketNumber: 'GDS-2025-002',
    nombreAsesor: 'Sofia Guarin',
    canalConsulta: 'SISTEMA DE DISTRIBUCIÓN GDS',
    origenConsulta: 'GDS',
    esSoporteIngles: true,
    horaIngresoCorreo: '14:15',
    pnrTktLocalizador: 'XYZ789',
    correoElectronico: 'support@example.com',
    tipoSolicitud: 'Remisión Voluntaria - Involuntaria',
    reclamoIncidente: 'Alternativa por Cancelación - Demora - Sobreventa',
    solicitudCliente: 'Passenger requests refund due to flight cancellation. Original booking was made through GDS Sabre.',
    informacionBrindada: 'Reviewed cancellation policy. Flight was cancelled by airline. Customer eligible for full refund. Processed refund request through GDS.',
    observaciones: 'English support case. Customer notified via email about refund timeline.',
    status: 'nuevo',
    priority: 'media',
    assignedTeam: 'Soporte GDS',
    slaDeadline: new Date('2025-01-25'),
    initialDate: new Date('2025-01-18'),
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
    tags: ['sabre', 'refund', 'english-support'],
  },
  {
    id: '3',
    ticketNumber: 'GDS-2025-003',
    nombreAsesor: 'José Ramos',
    canalConsulta: 'SISTEMA DE DISTRIBUCIÓN GDS',
    origenConsulta: 'AMADEUS',
    esSoporteIngles: false,
    horaIngresoCorreo: '11:00',
    pnrTktLocalizador: 'DEF456',
    correoElectronico: 'agencia@travel.com',
    tipoSolicitud: 'Facturación',
    reclamoIncidente: 'Escalamiento Finanzas - Facturación -ATO',
    solicitudCliente: 'Agencia solicita corrección en facturación. Se cobró tarifa incorrecta en el ATO.',
    informacionBrindada: 'Se revisó el caso con el equipo de finanzas. Se identificó error en el cargo automático. Se procesó nota de crédito para ajustar el monto.',
    observaciones: 'Caso escalado a finanzas. Resuelto en 48 horas.',
    status: 'resuelto',
    priority: 'baja',
    assignedTo: 'Laura Sánchez',
    assignedTeam: 'Finanzas',
    slaDeadline: new Date('2025-01-17'),
    initialDate: new Date('2025-01-10'),
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
        action: 'Escalado a Finanzas',
        user: 'José Ramos',
      },
      {
        id: '3',
        date: new Date('2025-01-14'),
        action: 'Requerimiento resuelto',
        user: 'Laura Sánchez',
        comment: 'Nota de crédito procesada. Cliente notificado.',
      },
    ],
    tags: ['facturacion', 'finanzas', 'nota-credito'],
  },
];

export const RequirementProvider = ({ children }: { children: ReactNode }) => {
  const [requirements, setRequirements] = useState<Requirement[]>(mockRequirements);

  const addRequirement = (requirement: Omit<Requirement, 'id' | 'createdAt' | 'updatedAt' | 'history' | 'ticketNumber'>) => {
    const ticketNumber = `GDS-${new Date().getFullYear()}-${String(requirements.length + 1).padStart(3, '0')}`;
    const newRequirement: Requirement = {
      ...requirement,
      id: Date.now().toString(),
      ticketNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
      history: [
        {
          id: '1',
          date: new Date(),
          action: 'Requerimiento creado',
          user: requirement.nombreAsesor,
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
