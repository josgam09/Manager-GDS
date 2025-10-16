// Scripts de respuesta para Información Brindada
// Basado en Sistema de Distribución AMADEUS y SABRE

export interface ResponseScript {
  id: string;
  title: string;
  content: string;
  category: 'tipoSolicitud' | 'reclamoIncidente';
  applicableFor: string[]; // IDs de tipos o reclamos aplicables
  tags?: string[];
}

// Scripts por Tipo de Solicitud
export const tipoSolicitudScripts: ResponseScript[] = [
  // Waiver GDS - Sabre
  {
    id: 'waiver-gds-sabre-1',
    title: 'Waiver aprobado - Cambio de fecha',
    content: `Estimado/a cliente,

Se ha procesado exitosamente su solicitud de waiver GDS-Sabre.

Detalles del proceso:
- Se aplicó waiver para cambio de fecha sin penalidad
- Nuevo itinerario confirmado
- No se generan cargos adicionales por cambio

El nuevo ticket ha sido emitido y enviado a su correo electrónico.

Saludos cordiales,`,
    category: 'tipoSolicitud',
    applicableFor: ['Waiver GDS - Sabre'],
    tags: ['waiver', 'aprobado', 'cambio-fecha']
  },
  {
    id: 'waiver-gds-sabre-2',
    title: 'Waiver en proceso - Escalamiento',
    content: `Estimado/a cliente,

Su solicitud de waiver ha sido escalada al departamento correspondiente.

Estado actual:
- Ticket escalado a equipo GDS
- Tiempo estimado de respuesta: 24-48 horas
- Le notificaremos una vez tengamos respuesta

Agradecemos su paciencia.

Saludos cordiales,`,
    category: 'tipoSolicitud',
    applicableFor: ['Waiver GDS - Sabre'],
    tags: ['waiver', 'escalado', 'proceso']
  },

  // Waiver Comercial
  {
    id: 'waiver-comercial-1',
    title: 'Waiver comercial aprobado',
    content: `Estimado/a cliente,

Confirmamos la aprobación de su waiver comercial.

Detalles:
- Autorización comercial obtenida
- Se permite modificación sin penalidades comerciales
- Diferencia tarifaria: [INDICAR SI APLICA]

Puede proceder con la modificación solicitada.

Saludos cordiales,`,
    category: 'tipoSolicitud',
    applicableFor: ['Waiver Comercial'],
    tags: ['waiver', 'comercial', 'aprobado']
  },

  // Remisión
  {
    id: 'remision-1',
    title: 'Remisión voluntaria procesada',
    content: `Estimado/a cliente,

Se ha procesado su solicitud de remisión voluntaria.

Información del proceso:
- Remisión aplicada correctamente
- Fecha de validez: [INDICAR FECHAS]
- Nuevos segmentos confirmados

El nuevo itinerario ha sido confirmado y emitido.

Saludos cordiales,`,
    category: 'tipoSolicitud',
    applicableFor: ['Remisión Voluntaria - Involuntaria'],
    tags: ['remision', 'voluntaria']
  },

  // Cambio de Nombre
  {
    id: 'cambio-nombre-1',
    title: 'Corrección de nombre procesada',
    content: `Estimado/a cliente,

Se ha realizado exitosamente la corrección de nombre solicitada.

Detalles:
- Nombre anterior: [INDICAR]
- Nombre correcto: [INDICAR]
- PNR actualizado
- Nuevo ticket emitido

Por favor verifique que la información sea correcta.

Saludos cordiales,`,
    category: 'tipoSolicitud',
    applicableFor: ['Cesión - Cambio de Nombre Vol - Corrección'],
    tags: ['nombre', 'correccion']
  },

  // Facturación
  {
    id: 'facturacion-1',
    title: 'Factura emitida',
    content: `Estimado/a cliente,

Su factura ha sido emitida correctamente.

Detalles de facturación:
- N° Factura: [NÚMERO]
- Fecha de emisión: [FECHA]
- Monto total: [MONTO]
- Adjunto encontrará la factura en PDF

Saludos cordiales,`,
    category: 'tipoSolicitud',
    applicableFor: ['Facturación'],
    tags: ['factura', 'emitida']
  },
  {
    id: 'facturacion-2',
    title: 'Corrección de factura',
    content: `Estimado/a cliente,

Se ha procesado la corrección de su factura.

Corrección realizada:
- Factura original anulada
- Nueva factura emitida con datos correctos
- N° Factura corregida: [NÚMERO]

La nueva factura se encuentra adjunta.

Saludos cordiales,`,
    category: 'tipoSolicitud',
    applicableFor: ['Facturación'],
    tags: ['factura', 'correccion']
  }
];

// Scripts por Reclamos / Incidentes
export const reclamoIncidenteScripts: ResponseScript[] = [
  // Error en Emisión
  {
    id: 'error-emision-1',
    title: 'Error de emisión - Ticket reemitido',
    content: `Estimado/a cliente,

Hemos identificado y corregido el error en la emisión de su ticket.

Acciones realizadas:
- Error detectado en sistema [AMADEUS/SABRE]
- Ticket original anulado
- Nuevo ticket emitido correctamente
- PNR actualizado

El nuevo ticket ha sido enviado a su correo electrónico.

Lamentamos los inconvenientes causados.

Saludos cordiales,`,
    category: 'reclamoIncidente',
    applicableFor: ['Error en Emisión (Amadeus - Navitaire -Sabre)'],
    tags: ['error', 'emision', 'corregido']
  },
  {
    id: 'error-emision-2',
    title: 'Error de emisión - En proceso',
    content: `Estimado/a cliente,

Estamos trabajando en la corrección del error de emisión reportado.

Estado actual:
- Error identificado en el sistema
- Caso escalado al equipo técnico
- Tiempo estimado de solución: [TIEMPO]

Le mantendremos informado del progreso.

Saludos cordiales,`,
    category: 'reclamoIncidente',
    applicableFor: ['Error en Emisión (Amadeus - Navitaire -Sabre)'],
    tags: ['error', 'emision', 'proceso']
  },

  // Cancelación / Demora
  {
    id: 'cancelacion-1',
    title: 'Alternativa por cancelación',
    content: `Estimado/a cliente,

Lamentamos informarle sobre la cancelación de su vuelo.

Alternativas disponibles:
- Opción 1: Reubicación en próximo vuelo disponible
- Opción 2: Devolución total del valor pagado
- Opción 3: Crédito para uso futuro

Por favor indíquenos su preferencia para proceder.

Saludos cordiales,`,
    category: 'reclamoIncidente',
    applicableFor: ['Alternativa por Cancelación - Demora - Sobreventa'],
    tags: ['cancelacion', 'alternativas']
  },
  {
    id: 'demora-1',
    title: 'Compensación por demora',
    content: `Estimado/a cliente,

En referencia a la demora de su vuelo, procedemos con la compensación correspondiente.

Detalles:
- Tiempo de demora: [HORAS]
- Compensación aplicable según normativa
- Monto/Beneficio: [DETALLAR]

La compensación será procesada en [TIEMPO ESTIMADO].

Lamentamos los inconvenientes.

Saludos cordiales,`,
    category: 'reclamoIncidente',
    applicableFor: ['Alternativa por Cancelación - Demora - Sobreventa'],
    tags: ['demora', 'compensacion']
  },

  // Devolución
  {
    id: 'devolucion-1',
    title: 'Devolución en proceso',
    content: `Estimado/a cliente,

Su solicitud de devolución ha sido procesada exitosamente.

Información del proceso:
- Tipo de devolución: [PW/APP/BSP/ARC]
- Monto a devolver: [MONTO]
- Tiempo estimado: 30-45 días hábiles
- Método de devolución: [MÉTODO]

Recibirá confirmación una vez acreditada la devolución.

Saludos cordiales,`,
    category: 'reclamoIncidente',
    applicableFor: ['Proceso o Estado de Devolución (PW/APP/BSP/ARC)'],
    tags: ['devolucion', 'proceso']
  },
  {
    id: 'devolucion-2',
    title: 'Estado de devolución - Consulta',
    content: `Estimado/a cliente,

En referencia a su consulta sobre el estado de la devolución:

Estado actual:
- Solicitud recibida: [FECHA]
- Estado: [EN PROCESO / APROBADA / PENDIENTE]
- Fecha estimada de acreditación: [FECHA]

Para mayor información, puede contactar a nuestro departamento de finanzas.

Saludos cordiales,`,
    category: 'reclamoIncidente',
    applicableFor: ['Proceso o Estado de Devolución (PW/APP/BSP/ARC)'],
    tags: ['devolucion', 'consulta', 'estado']
  },

  // Cobro Erróneo
  {
    id: 'cobro-erroneo-1',
    title: 'Cobro erróneo - Ajuste procesado',
    content: `Estimado/a cliente,

Hemos identificado y corregido el cobro erróneo reportado.

Corrección realizada:
- Cobro incorrecto: [MONTO]
- Cobro correcto: [MONTO]
- Diferencia a devolver: [MONTO]
- Nota de crédito emitida

El ajuste será reflejado en [TIEMPO ESTIMADO].

Lamentamos los inconvenientes.

Saludos cordiales,`,
    category: 'reclamoIncidente',
    applicableFor: ['Cobro Erróneo ATO - No corresponde'],
    tags: ['cobro', 'error', 'ajuste']
  },

  // Check-in
  {
    id: 'checkin-1',
    title: 'Asistencia con check-in',
    content: `Estimado/a cliente,

Hemos asistido con su proceso de check-in.

Acciones realizadas:
- Check-in procesado exitosamente
- Tarjetas de embarque generadas
- Asientos asignados: [DETALLAR]

Las tarjetas de embarque han sido enviadas a su correo electrónico.

Saludos cordiales,`,
    category: 'reclamoIncidente',
    applicableFor: ['Check-in'],
    tags: ['checkin', 'asistencia']
  },

  // Escalamiento Finanzas
  {
    id: 'escalamiento-finanzas-1',
    title: 'Caso escalado a finanzas',
    content: `Estimado/a cliente,

Su caso ha sido escalado al departamento de finanzas para revisión especializada.

Información del escalamiento:
- Motivo: [DETALLAR]
- Ticket de escalamiento: [NÚMERO]
- Tiempo estimado de respuesta: 3-5 días hábiles

El equipo de finanzas se contactará con usted directamente.

Saludos cordiales,`,
    category: 'reclamoIncidente',
    applicableFor: ['Escalamiento Finanzas - Facturación -ATO'],
    tags: ['escalamiento', 'finanzas']
  }
];

// Función para obtener scripts aplicables
export function getApplicableScripts(
  type: 'tipoSolicitud' | 'reclamoIncidente',
  value: string
): ResponseScript[] {
  const scripts = type === 'tipoSolicitud' ? tipoSolicitudScripts : reclamoIncidenteScripts;
  return scripts.filter(script => script.applicableFor.includes(value));
}

// Función para buscar scripts por palabra clave
export function searchScripts(query: string): ResponseScript[] {
  const allScripts = [...tipoSolicitudScripts, ...reclamoIncidenteScripts];
  const lowerQuery = query.toLowerCase();
  
  return allScripts.filter(script =>
    script.title.toLowerCase().includes(lowerQuery) ||
    script.content.toLowerCase().includes(lowerQuery) ||
    script.tags?.some(tag => tag.includes(lowerQuery))
  );
}

