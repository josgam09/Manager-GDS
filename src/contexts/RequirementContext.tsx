import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Requirement, RequirementStatus, RequirementPriority } from '@/types/requirement';

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
    nombreAsesor: 'Sandra Milena Jaramillo',
    horaIngresoCorreo: '09:30',
    correoElectronico: 'cliente@example.com',
    asuntoCorreoElectronico: 'Solicitud de cambio de vuelo',
    pais: 'CO',
    origenConsulta: 'AMADEUS',
    esSoporteIngles: false,
    pnrTktLocalizador: 'ABC123',
    tipoSolicitud: 'Solicitudes',
    motivo: 'Cambio de Status',
    subMotivo: 'O - Open for Use',
    solicitudCliente: 'Cliente solicita cambio de vuelo debido a error en la emisión del ticket. El sistema no permitió completar la reserva correctamente.',
    puedeEntregarInformacion: true,
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
    tags: ['amadeus', 'cambio-status', 'error-emision'],
  },
  {
    id: '2',
    ticketNumber: 'GDS-2025-002',
    nombreAsesor: 'Sofia Guarin',
    horaIngresoCorreo: '14:15',
    correoElectronico: 'support@example.com',
    asuntoCorreoElectronico: 'Refund request - Flight cancellation',
    pais: 'US',
    origenConsulta: 'SABRE',
    esSoporteIngles: true,
    pnrTktLocalizador: 'XYZ789',
    tipoSolicitud: 'Reclamos',
    motivo: 'Alternativas',
    subMotivo: 'Cancelación - Operacional',
    solicitudCliente: 'Passenger requests refund due to flight cancellation. Original booking was made through GDS Sabre.',
    puedeEntregarInformacion: false,
    escaladoA: 'SUPERVISOR',
    analisisAnalista: 'Caso complejo de cancelación operacional que requiere validación de políticas internacionales',
    informacionBrindada: '',
    observaciones: 'English support case. Escalado a supervisor para validación de políticas internacionales.',
    status: 'pendiente-supervisor',
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
    tags: ['sabre', 'alternativas', 'english-support'],
  },
  {
    id: '3',
    ticketNumber: 'GDS-2025-003',
    nombreAsesor: 'José Ramos',
    horaIngresoCorreo: '11:00',
    correoElectronico: 'agencia@travel.com',
    asuntoCorreoElectronico: 'Corrección en facturación',
    pais: 'BR',
    origenConsulta: 'AMADEUS',
    esSoporteIngles: false,
    pnrTktLocalizador: 'DEF456',
    tipoSolicitud: 'Solicitudes',
    motivo: 'Facturación',
    subMotivo: 'Aeropuerto',
    solicitudCliente: 'Agencia solicita corrección en facturación. Se cobró tarifa incorrecta en el ATO.',
    puedeEntregarInformacion: false,
    escaladoA: 'OTRA_AREA',
    nombreAreaEscalamiento: 'Finanzas',
    informacionBrindada: '',
    observaciones: 'Caso escalado a finanzas. Resuelto en 48 horas.',
    status: 'pendiente-otra-area',
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
