export type RequirementStatus = 'nuevo' | 'en-proceso' | 'pendiente-informacion' | 'resuelto' | 'cerrado';
export type RequirementPriority = 'baja' | 'media' | 'alta' | 'critica';
export type RequirementType = 'consulta' | 'incidencia' | 'solicitud' | 'configuracion' | 'reportes' | 'otro';
export type GDSSystem = 'sabre' | 'amadeus' | 'travelport' | 'sirena' | 'otro';
export type RequirementCategory = 'reservas' | 'tarifas' | 'disponibilidad' | 'pnr' | 'tickets' | 'reportes' | 'accesos' | 'capacitacion' | 'otro';

export interface RequirementHistory {
  id: string;
  date: Date;
  action: string;
  user: string;
  comment?: string;
}

export interface Requirement {
  id: string;
  ticketNumber: string; // Número de ticket/caso
  title: string; // Asunto del requerimiento
  requirementType: RequirementType;
  gdsSystem: GDSSystem; // Sistema GDS afectado
  category: RequirementCategory;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  organization: string; // Agencia/Organización
  officeId?: string; // Office ID del GDS
  pcc?: string; // Pseudo City Code
  description: string; // Descripción detallada del requerimiento
  expectedResult: string; // Resultado esperado o solución requerida
  affectedPNR?: string; // PNR afectado (si aplica)
  errorMessage?: string; // Mensaje de error (si aplica)
  initialDate: Date;
  status: RequirementStatus;
  priority: RequirementPriority;
  assignedTo?: string;
  assignedTeam?: string; // Equipo asignado (Soporte GDS, Desarrollo, Comercial, etc.)
  slaDeadline?: Date; // Fecha límite según SLA
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  history: RequirementHistory[];
  attachments?: string[]; // URLs o nombres de archivos adjuntos
  tags?: string[]; // Etiquetas para categorización adicional
}
