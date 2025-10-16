export type RequirementStatus = 
  | 'nuevo' 
  | 'en-proceso' 
  | 'pendiente-informacion' 
  | 'pendiente-supervisor' 
  | 'pendiente-otra-area' 
  | 'resuelto' 
  | 'cerrado';
export type RequirementPriority = 'baja' | 'media' | 'alta' | 'critica';

// Nombre del Asesor
export type AsesorName = 
  | 'Jenny Andrea Taborda'
  | 'Jhoan Restrepo'
  | 'José Ramos'
  | 'Julieth Urbina'
  | 'Luz Lozada'
  | 'Manuela Maz'
  | 'Mauricio Rios'
  | 'Nazly Lugo'
  | 'Rafael Carmona'
  | 'Sandra Milena Jaramillo'
  | 'Sofia Guarin'
  | 'Valentina Mejía'
  | 'Viviana Virlen';

// Canal de Consulta (fijo)
export type CanalConsulta = 'SISTEMA DE DISTRIBUCIÓN GDS';

// Origen Consulta
export type OrigenConsulta = 'AMADEUS' | 'NO CORRESPONDE' | 'SABRE';

// Tipo de Solicitud
export type TipoSolicitud = 
  | 'Waiver GDS - Sabre'
  | 'Waiver Comercial'
  | 'Remisión Voluntaria - Involuntaria'
  | 'Cesión - Cambio de Nombre Vol - Corrección'
  | 'Certificado Médico'
  | 'Cambio de Status (Ticket)'
  | 'Opcionales - BUNDLES'
  | 'Retracto (CL/BR/CO)'
  | 'Política Comercial - Regulación de Emisión'
  | 'Facturación'
  | 'Toma de Pagos (WebPay/Portal AG/Otro)';

// Reclamos / Incidentes
export type ReclamoIncidente = 
  | 'Error en Emisión (Amadeus - Navitaire -Sabre)'
  | 'Alternativa por Cancelación - Demora - Sobreventa'
  | 'Proceso o Estado de Devolución (PW/APP/BSP/ARC)'
  | 'Segmentos Pasivos - Error BUNDLE'
  | 'Cobro Erróneo ATO - No corresponde'
  | 'Check-in'
  | 'Escalamiento Finanzas - Facturación -ATO'
  | 'Ingreso APP - Error en ATO -Otro'
  | 'ACM (Dev BSP/ARC/Pago Exceso)'
  | 'Otro'
  | 'PNR HX';

export interface RequirementHistory {
  id: string;
  date: Date;
  action: string;
  user: string;
  comment?: string;
}

// Tipos de Usuario del Sistema
export type UserRole = 'ANALISTA' | 'SUPERVISOR' | 'ADMINISTRADOR';

// Opciones de Escalamiento
export type EscalationOption = 'SUPERVISOR' | 'OTRA_AREA';

// Acciones del Supervisor
export type SupervisorAction = 'autorizar_analista' | 'resolver_directo' | null;

export interface Requirement {
  id: string;
  ticketNumber: string; // Número de ticket/caso autogenerado
  
  // Campos del formulario
  nombreAsesor: AsesorName;
  canalConsulta: CanalConsulta;
  origenConsulta: OrigenConsulta;
  esSoporteIngles: boolean; // Si/No
  horaIngresoCorreo: string; // Formato HH:MM
  pnrTktLocalizador: string; // PNR - TKT - Localizador AMADEUS-SABRE
  correoElectronico: string;
  tipoSolicitud: TipoSolicitud | '';
  reclamoIncidente: ReclamoIncidente | '';
  solicitudCliente: string; // Texto largo
  
  // Control de escalamiento
  puedeEntregarInformacion: boolean; // Si/No - Nueva pregunta
  escaladoA?: EscalationOption; // SUPERVISOR | OTRA_AREA
  nombreAreaEscalamiento?: string; // Nombre del área si es OTRA_AREA
  
  // Gestión del Supervisor (para casos escalados)
  respuestaSupervisor?: string; // Respuesta/instrucciones del supervisor al analista
  accionSupervisor?: SupervisorAction; // Qué decidió hacer el supervisor
  supervisorResolvio?: boolean; // Si el supervisor resolvió directamente el caso
  
  informacionBrindada: string; // Texto largo
  observaciones: string; // Texto largo
  
  // Campos de gestión interna
  status: RequirementStatus;
  priority: RequirementPriority;
  assignedTo?: string;
  assignedTeam?: string;
  slaDeadline?: Date;
  
  // Timestamps
  initialDate: Date;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  
  // Historial y extras
  history: RequirementHistory[];
  attachments?: string[];
  tags?: string[];
}
