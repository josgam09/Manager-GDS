// Scripts de respuesta COMPLETOS basados en Sistema de Distribución AMADEUS y SABRE
// Análisis de 8000+ casos reales procesados
// Versión 2.0 - Octubre 2025

export interface ResponseScript {
  id: string;
  title: string;
  content: string;
  category: 'tipoSolicitud' | 'reclamoIncidente';
  applicableFor: string[];
  gdsSystem?: 'AMADEUS' | 'SABRE' | 'AMBOS';
  scenario?: 'aprobado' | 'rechazado' | 'proceso' | 'consulta' | 'general';
  tags?: string[];
  examples?: string[]; // Casos reales de referencia
}

// ==========================================
// SCRIPTS TIPO DE SOLICITUD - CASOS REALES
// ==========================================

export const tipoSolicitudScripts: ResponseScript[] = [
  // ===== WAIVER GDS - SABRE (547 casos encontrados) =====
  {
    id: 'waiver-sabre-devolucion-waiver-1',
    title: 'Waiver para Devolución Total - Entrega de Código',
    content: `Estimado/a [NOMBRE AGENCIA],

Para poder entregar waiver por devolución, es necesario que elimines los tramos de la reserva que no se van a utilizar.

Una vez eliminados los segmentos, por favor confirma y procederemos a enviar el código de waiver correspondiente.

Quedamos atentos.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Waiver GDS - Sabre'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['waiver', 'devolucion', 'bsp', 'segmentos'],
    examples: ['ID:55660', 'ID:55666']
  },
  {
    id: 'waiver-sabre-devolucion-entregado-1',
    title: 'Waiver Entregado - Devolución Total con Detalle',
    content: `Estimados, buen día.

Desde soporte acusamos recibido, dejando en constancia los Waiver para que la AG procese la devolución total a través del BSP.

📋 DETALLE DE WAIVERS:

Fecha: [FECHA]
PNR: [PNR]
TKT: [NÚMERO TKT 1]
Tipo de Devolución: Devolución Total
Motivo: [MOTIVO - ej: Certificado médico, Involuntario, etc.]
Waiver: [CÓDIGO WAIVER - ej: PE134030109]

TKT: [NÚMERO TKT 2]
Waiver: [CÓDIGO WAIVER - ej: PE134040109]

TKT: [NÚMERO TKT 3]
Waiver: [CÓDIGO WAIVER - ej: PE134050109]

Notificaremos a la Ag y quedamos atentos a sus comentarios.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Waiver GDS - Sabre'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['waiver', 'devolucion', 'certificado-medico', 'bsp'],
    examples: ['ID:55715', 'ID:55720']
  },
  {
    id: 'waiver-sabre-brasil-1',
    title: 'Waiver para Reembolso - Brasil (PT)',
    content: `Prezado/a [NOME AGENTE],

Claro que sim, segue o waiver correspondente:

🎫 INFORMAÇÃO DO WAIVER:
• TKT: [NÚMERO DO TICKET]
• Waiver: [CÓDIGO - formato: BR######09]
• Tipo: Devolução Total
• Motivo: [INVOLUNTÁRIO/OUTRO]

Por favor, processe a devolução através do BSPlink utilizando este código.

Atenciosamente,
[NOME ASSESSOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Waiver GDS - Sabre'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['waiver', 'brasil', 'portugues', 'devolucion'],
    examples: ['ID:55721']
  },
  {
    id: 'waiver-sabre-multiple-tickets-1',
    title: 'Waivers Múltiples Tickets - Formato Tabla',
    content: `Estimado/a [NOMBRE AGENCIA],

A continuación, relaciono waiver correspondiente a devolución:

📋 TABLA DE WAIVERS:

TKT              | WAIVER
-----------------|------------------
[9732880566294] | [ARS362930109]
[9732880566295] | [ARS362940109]
[9732880566296] | [ARS362950109]
[9742987278573] | [ARS362960109]

Por favor, procesa las devoluciones a través del BSPlink utilizando estos códigos.

Quedamos atentos a sus comentarios.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Waiver GDS - Sabre'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['waiver', 'multiple', 'tabla', 'devolucion'],
    examples: ['ID:55769']
  },
  {
    id: 'waiver-sabre-solo-taxes-1',
    title: 'Devolución Solo Taxes - Sin Waiver Completo',
    content: `Estimado/a [NOMBRE AGENCIA], buenas tardes.

Retomando tu solicitud, te recordamos que para la reserva [PNR] únicamente está disponible la opción de realizar un cambio de fecha sin costo adicional.

❌ DEVOLUCIÓN LIMITADA:
En caso de optar por la devolución, esta solo aplicaría para las **tasas de embarque** correspondientes al vuelo.

✅ ALTERNATIVA RECOMENDADA:
Cambio de fecha sin costo (una vez) manteniendo la ruta original.

Quedamos atentos a cualquier otra consulta o gestión que necesites realizar.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Waiver GDS - Sabre'],
    gdsSystem: 'AMBOS',
    scenario: 'consulta',
    tags: ['waiver', 'taxes', 'devolucion-parcial', 'alternativa'],
    examples: ['ID:55941']
  },

  // ===== CESIÓN - CAMBIO DE NOMBRE (Muy común) =====
  {
    id: 'cambio-nombre-typo-gratis-1',
    title: 'Corrección Tipográfica - Sin Costo',
    content: `Estimado/a [NOMBRE AGENCIA],

Te informo que he realizado la corrección en el nombre del pasajero. El cambio no genera cargos, ya que corresponde a un error tipográfico.

✅ CAMBIO REALIZADO:
• Nombre anterior: [NOMBRE INCORRECTO]
• Nombre correcto: [NOMBRE CORRECTO]
• PNR: [PNR]
• Ticket: [NÚMERO TICKET]

⚠️ IMPORTANTE:
Al realizar este cambio pierdes el control de esta reserva, es por esto que el itinerario con el cambio realizado fue enviado al correo [EMAIL AGENCIA].

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Cesión - Cambio de Nombre Vol - Corrección'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['cambio-nombre', 'typo', 'gratis', 'correccion'],
    examples: ['ID:55692', 'ID:55957', 'ID:55958', 'ID:55965']
  },
  {
    id: 'cambio-nombre-confirmacion-1',
    title: 'Cambio de Nombre - Solicitud de Confirmación',
    content: `Estimado/a [NOMBRE AGENCIA],

Te informo que el cambio de nombre lo podemos generar sin costo, puesto que se trata de una corrección.

⚠️ ANTES DE PROCEDER:
Sin embargo, si el pasajero desea además hacer cambios de fecha sobre el itinerario, deberás realizarlo ANTES de solicitar cambio de nombre, dado que, al realizar esta modificación, la agencia pierde el control de la reserva.

Quedo atento a tu confirmación para proceder.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Cesión - Cambio de Nombre Vol - Corrección'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['cambio-nombre', 'confirmacion', 'control-reserva'],
    examples: ['ID:55647', 'ID:55658', 'ID:55956']
  },
  {
    id: 'cambio-nombre-con-costo-1',
    title: 'Cambio de Nombre - Con Cargo (Cesión)',
    content: `Estimado/a [NOMBRE AGENCIA],

El cambio de nombre lo podemos gestionar y tiene un valor de:

💰 CARGOS:
• Costo por cambio: $[MONTO] [MONEDA] por tramo, por pasajero
• Total a pagar: $[MONTO TOTAL] [MONEDA]

📋 DATOS DEL CAMBIO:
• Pasajero original: [NOMBRE ORIGINAL]
• Nuevo pasajero: [NOMBRE NUEVO]
• Documento: [NÚMERO DOCUMENTO]
• PNR: [PNR]

💳 FORMA DE PAGO:
El pago debes realizarlo ingresando en www.jetsmart.com, en la opción: "Administra tu viaje" y opción "Transacciones".

⚠️ IMPORTANTE:
Al generar este cambio, pierdes el control de esta reserva.

Quedo atento a la confirmación para avanzar con el cambio desde nuestra pantalla.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Cesión - Cambio de Nombre Vol - Corrección'],
    gdsSystem: 'AMBOS',
    scenario: 'general',
    tags: ['cambio-nombre', 'cesion', 'pago', 'costo'],
    examples: ['ID:55670', 'ID:55942', 'ID:55946', 'ID:55967']
  },
  {
    id: 'cambio-nombre-aadt-chd-1',
    title: 'Cambio de Tipo Pasajero ADT a CHD',
    content: `Estimado/a [NOMBRE AGENCIA],

Te confirmo que he realizado la corrección del tipo de pasajero, según lo solicitado.

✅ CAMBIO REALIZADO:
• Pasajero: [NOMBRE PASAJERO]
• Tipo anterior: ADT (Adulto)
• Tipo correcto: CHD (Menor)
• Fecha de nacimiento: [FECHA]
• Documento: [NÚMERO DOCUMENTO]

El menor [NOMBRE] ya se encuentra con la fecha de nacimiento ingresada correctamente y figura como CHD en el sistema.

Quedamos atentos a cualquier duda.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Cesión - Cambio de Nombre Vol - Corrección'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['tipo-pasajero', 'adt-chd', 'menor', 'correccion'],
    examples: ['ID:55488', 'ID:55874', 'ID:55893', 'ID:55915']
  },

  // ===== REMISIÓN VOLUNTARIA - INVOLUNTARIA =====
  {
    id: 'remision-involuntaria-no-reemitir-1',
    title: 'Reprogramación - No Requiere Reemisión',
    content: `Estimado/a [NOMBRE AGENCIA], buen día.

En este caso, no es necesario generar una reemisión, solo basta que los tramos estén HK (confirmados).

ℹ️ EXPLICACIÓN:
Cuando hay reprogramación por parte de la aerolínea:
• Los segmentos se actualizan automáticamente en el GDS
• Si están en status HK, el ticket es válido
• No requiere revalidación ni reemisión
• El pasajero puede viajar sin problemas

✅ VALIDACIÓN REALIZADA:
• PNR: [PNR]
• Segmentos: HK (Confirmados)
• Ticket válido para viajar

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Remisión Voluntaria - Involuntaria'],
    gdsSystem: 'AMBOS',
    scenario: 'general',
    tags: ['remision', 'reprogramacion', 'hk', 'no-reemitir'],
    examples: ['ID:55876', 'ID:55883']
  },
  {
    id: 'remision-involuntaria-noadc-1',
    title: 'Cambio Involuntario - Reemisión NOADC',
    content: `Estimado/a [NOMBRE AGENCIA],

Efectivamente, existe una reprogramación de itinerario bajo el código de reserva [PNR]. 

Por lo tanto, el pasajero tiene la opción de realizar un **cambio de fecha sin costo** por única vez.

📋 PROCEDIMIENTO:
Debes reemitir el boleto a costo cero (NO ADC) bajo el mismo PNR como involuntario, utilizando:
• La clase que esté disponible
• Manteniendo la ruta original

✅ IMPORTANTE:
• NO es necesario ingresar información adicional o Waiver en el endoso
• Se cobra $0 (cero) en el monto de reemisión
• Código de entrada: NOADC o NO ADC

📌 ALTERNATIVA DE DEVOLUCIÓN:
Si el pasajero prefiere devolución total, debe realizarla a través de BSPlink con código Waiver que proporcionaremos.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Remisión Voluntaria - Involuntaria'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['remision', 'involuntaria', 'noadc', 'sin-costo', 'reprogramacion'],
    examples: ['ID:55637', 'ID:55641', 'ID:55688', 'ID:55941']
  },
  {
    id: 'remision-manual-calculo-1',
    title: 'Remisión Manual - Cálculo de Diferencia',
    content: `Estimado/a [NOMBRE AGENCIA],

En este caso, por favor, intenta realizar el proceso de forma **manual**.

🧮 PROCEDIMIENTO MANUAL:
• El cálculo de la diferencia tarifaria se deberá realizar de forma manual
• El penalty por cambio deberá ser cargado con el código (Tax Code) **CP**, si aplicara
• Calcular según tarifas actuales disponibles

📝 PASOS:
1. Cotizar tarifas manualmente
2. Calcular diferencia entre tarifa original y nueva
3. Aplicar penalty con código CP (si corresponde)
4. Proceder con reemisión

Quedamos atentos a cualquier novedad.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Remisión Voluntaria - Involuntaria'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['remision', 'manual', 'calculo', 'penalty', 'cp'],
    examples: ['ID:55880']
  },
  {
    id: 'remision-sin-control-reserva-1',
    title: 'Remisión Sin Control - Crear Nuevo PNR',
    content: `Estimado/a [NOMBRE AGENCIA], buena tarde.

En vista de que no cuentas con el control de la reserva debido a un cambio generado desde nuestra pantalla, es necesario que:

🔄 PROCEDIMIENTO:
1. Tomes un **nuevo PNR** con los vuelos deseados
2. Realices la remisión correspondiente para el/los tramo(s)
3. La remisión se debe realizar con la clase que se encuentre disponible
4. Pagar los cargos correspondientes según política tarifaria

Quedamos atentos a cualquier novedad.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Remisión Voluntaria - Involuntaria'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['remision', 'sin-control', 'nuevo-pnr', 'cambio'],
    examples: ['ID:55899']
  },

  // ===== POLÍTICA COMERCIAL - REGULACIÓN DE EMISIÓN =====
  {
    id: 'politica-correccion-pasajero-1',
    title: 'Corrección Tipo de Pasajero - ADT a CHD',
    content: `Estimado/a [NOMBRE AGENCIA], buenas noches.

Te confirmo que he realizado la corrección del tipo de pasajero, según lo solicitado.

✅ CORRECCIÓN APLICADA:
• Pasajero: [NOMBRE]
• Cambio: ADT (Adulto) → CHD (Menor)
• Fecha de nacimiento: [FECHA]
• PNR actualizado: [PNR]

El sistema ahora reconoce correctamente al pasajero como menor de edad.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Política Comercial - Regulación de Emisión'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['politica', 'tipo-pasajero', 'menor', 'correccion'],
    examples: ['ID:55488']
  },
  {
    id: 'politica-asignacion-asientos-1',
    title: 'Asignación de Asientos - Familia',
    content: `Estimado/a [NOMBRE AGENCIA],

Te informo que he realizado la asignación de asientos en la fila [NÚMERO FILA] [ASIENTOS], según disponibilidad.

🪑 ASIENTOS ASIGNADOS:
• Fila: [NÚMERO]
• Asientos: [A, B, C] (Ventanilla, Medio, Pasillo)
• Pasajeros juntos: ✓

Los asientos fueron seleccionados para mantener al grupo/familia unido.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Política Comercial - Regulación de Emisión'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['asientos', 'familia', 'asignacion'],
    examples: ['ID:55489']
  },
  {
    id: 'politica-checkin-aeropuerto-gratis-1',
    title: 'Check-in Habilitado en Aeropuerto - Sin Costo',
    content: `Estimados, buen día.

En este caso, he habilitado la reserva para que los pasajeros puedan realizar el check-in y obtener su tarjeta de embarque directamente en el aeropuerto **sin costo adicional**.

✅ RESERVA HABILITADA:
• PNR: [PNR]
• Check-in en aeropuerto: SIN CARGO
• Válido para todos los segmentos

⏰ IMPORTANTE:
Es importante destacar que los pasajeros deben presentarse en el aeropuerto con suficiente anticipación para llevar a cabo el proceso correspondiente.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Política Comercial - Regulación de Emisión'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['checkin', 'aeropuerto', 'gratis', 'error-web'],
    examples: ['ID:55537', 'ID:55539', 'ID:55616']
  },
  {
    id: 'politica-waiver-otorgado-previo-1',
    title: 'Waivers Ya Otorgados - Verificación',
    content: `Estimados, buen día.

Al validar a través de nuestro sistema, se confirma que los códigos de waiver fueron otorgados el [FECHA], y corresponden a los siguientes casos:

📋 WAIVERS OTORGADOS:

Caso: [NÚMERO CASO 1] - Waiver: [CÓDIGO 1]
Caso: [NÚMERO CASO 2] - Waiver: [CÓDIGO 2]
Caso: [NÚMERO CASO 3] - Waiver: [CÓDIGO 3]

Los waivers ya están activos y pueden ser utilizados para procesar las devoluciones correspondientes a través del BSPlink.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Política Comercial - Regulación de Emisión'],
    gdsSystem: 'AMBOS',
    scenario: 'consulta',
    tags: ['waiver', 'otorgado', 'verificacion', 'previo'],
    examples: ['ID:55572']
  },
  {
    id: 'politica-familias-tarifarias-1',
    title: 'Consulta Familias Tarifarias - Equipaje',
    content: `Estimado/a [NOMBRE AGENCIA],

Así es. Nuestras familias tarifarias aplican en cualquier ruta, siempre y cuando sean emisiones GDS o Sabre.

📦 FAMILIAS TARIFARIAS:

**Básica (LR):**
• Tarifa base
• Artículo personal (45x35x25 - 10Kg)

**Estándar (G1):**
• Tarifa base
• Artículo personal (45x35x25 - 10Kg)
• Equipaje de cabina (55x35x25 - 10 kg)

**FlexiSMART (G2):**
• Tarifa base
• Artículo personal (45x35x25 - 10Kg)
• Equipaje de cabina (55x35x25 - 10 kg)
• Equipaje de bodega (Max 158 cm lineales y max 23 Kg)

**FlexiSMART Premium (G3):**
• Todo lo de G2
• Embarque prioritario
• Elección de asientos sin cargo

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Política Comercial - Regulación de Emisión'],
    gdsSystem: 'AMBOS',
    scenario: 'consulta',
    tags: ['familias-tarifarias', 'equipaje', 'g1', 'g2', 'g3'],
    examples: ['ID:55718']
  },

  // ===== FACTURACIÓN =====
  {
    id: 'facturacion-solicitud-datos-1',
    title: 'Solicitud de Datos para Emisión de Factura',
    content: `Buen día, estimado/a [NOMBRE AGENCIA].

Hemos estado haciendo seguimiento a tu solicitud, la cual fue oportunamente escalada al área de Finanzas.

Sin embargo, hemos recibido respuesta indicando que la factura no fue emitida en su momento y que, para poder generarla, necesitamos contar con los siguientes datos:

📋 INFORMACIÓN REQUERIDA:
• Nombre completo o razón social:
• Documento tributario (NIT/RUC/RFC/CUIT, según aplique):
• Dirección fiscal completa:
• Correo electrónico:
• Número de reserva: [PNR]

Agradecemos mucho tu paciencia y comprensión. Tan pronto recibamos esta información, procederemos con la emisión correspondiente.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Facturación'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['facturacion', 'datos', 'solicitud', 'finanzas'],
    examples: ['ID:55661']
  },
  {
    id: 'facturacion-ccf-tiempos-1',
    title: 'Certificado de Crédito Fiscal - Tiempos de Emisión',
    content: `Estimado/a [NOMBRE AGENCIA],

Hemos verificado la información de tu caso. Te aclaramos los tiempos de envío del certificado de crédito fiscal:

⏱️ TIEMPOS DE EMISIÓN:
• Para compras generadas en [PAÍS]
• Se emite en los **primeros 10 días hábiles del mes siguiente** de la fecha de compra
• Por ende, aún estamos en los tiempos designados para dicho trámite

📅 TU CASO:
• Fecha de compra: [FECHA]
• Fecha límite de emisión: [FECHA + 10 DÍAS HÁBILES]
• Estado: Dentro del plazo

📧 Una vez emitida, la factura se enviará automáticamente al correo registrado.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Facturación'],
    gdsSystem: 'AMBOS',
    scenario: 'consulta',
    tags: ['facturacion', 'ccf', 'tiempos', 'argentina'],
    examples: ['ID:55712']
  },

  // ===== OPCIONALES - BUNDLES =====
  {
    id: 'bundles-asientos-cotizacion-1',
    title: 'Cotización de Asientos - Familia',
    content: `Estimado/a [NOMBRE AGENCIA],

He realizado la cotización de los asientos, y nos arroja un valor a pagar de **$[MONTO] [MONEDA]**, quedando de la siguiente manera:

🪑 ASIENTOS COTIZADOS:
• Vuelo [IDA]: Fila [#], Asientos [A, B, C] - $[MONTO]
• Vuelo [VUELTA]: Fila [#], Asientos [A, B, C] - $[MONTO]
• **Total: $[MONTO TOTAL]**

💳 FORMA DE PAGO:
La compra la puedes realizar por medio de nuestra página web www.jetsmart.com en la opción "Administra tu viaje".

Quedamos atentos.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Opcionales - BUNDLES'],
    gdsSystem: 'AMBOS',
    scenario: 'general',
    tags: ['asientos', 'cotizacion', 'familia', 'pago'],
    examples: ['ID:55939', 'ID:55955']
  },
  {
    id: 'bundles-tarifa-equipaje-1',
    title: 'Consulta Equipaje Incluido en Tarifa',
    content: `Estimado/a [NOMBRE AGENCIA],

Te informo que los TKT fueron emitidos con la tarifa **[G1/G2/G3]**.

📦 EQUIPAJE INCLUIDO EN TARIFA [G3]:
• Artículo personal (45x35x25 - 10 Kg)
• Equipaje de mano (55x35x25 - 10 Kg)
• Equipaje de bodega (Max 158 cm lineales - 23 Kg)

✅ Los pasajeros pueden llevar todo el equipaje incluido sin costo adicional.

⚠️ IMPORTANTE:
Si exceden peso o dimensiones, se generará cargo en aeropuerto.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Opcionales - BUNDLES'],
    gdsSystem: 'AMBOS',
    scenario: 'consulta',
    tags: ['equipaje', 'tarifa', 'g3', 'incluido'],
    examples: ['ID:55884']
  },
  {
    id: 'bundles-equipaje-exceso-cobro-1',
    title: 'Equipaje Excedido - Explicación de Cobro',
    content: `Estimado/a [NOMBRE AGENCIA],

Te informamos que, tras revisar el historial de la reserva, pudimos confirmar que, en el tramo de [IDA/REGRESO], el pasajero presentó un equipaje que **superaba lo permitido** por la tarifa adquirida.

📦 SITUACIÓN:
• Tarifa adquirida: [TARIFA]
• Equipaje incluido: [ESPECIFICACIONES]
• Equipaje presentado: [EXCEDENTE]

💰 COBRO GENERADO:
• Motivo: Equipaje excedió [PESO/DIMENSIONES]
• Cobro en aeropuerto: $[MONTO]
• Tipo: Equipaje de bodega

Es importante tener en cuenta las políticas de la compañía:
• Equipaje de mano NO puede exceder los 10 Kg
• Dimensiones máximas: 55cm x 35cm x 25cm (largo, ancho, alto)
• Incluye ruedas, asas y bolsillos

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Opcionales - BUNDLES'],
    gdsSystem: 'AMBOS',
    scenario: 'consulta',
    tags: ['equipaje', 'exceso', 'cobro', 'aeropuerto', 'explicacion'],
    examples: ['ID:55870', 'ID:55943']
  },
  {
    id: 'bundles-bebe-cochecito-1',
    title: 'Transporte Artículos de Bebé - Política',
    content: `Estimados, buen día.

Te informo que en JetSMART puedes llevar un **coche de bebé** a bordo sin costo adicional en caso de viajar con un infante (niño entre 0 y 2 años menos un día).

👶 POLÍTICA DE ARTÍCULOS DE BEBÉ:

**Con infante (0-2 años):**
• ✅ 1 coche de bebé: SIN COSTO
• ✅ Coches de dos piezas: SIN COSTO
• ⚠️ Coche + silla de auto: Se paga por 1 ítem

**Sin infante (niños mayores a 2 años):**
• ❌ Coche/silla: Se cobra como equipaje facturado o sobredimensionado

💰 COSTOS SEGÚN DIMENSIONES:
• Equipaje Facturado: Si cumple medidas estándar
• Equipaje Sobredimensionado: Si excede medidas

📏 MEDIDAS MÁXIMAS EQUIPAJE FACTURADO:
• Max 158 cm lineales
• Max 23 Kg

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Opcionales - BUNDLES'],
    gdsSystem: 'AMBOS',
    scenario: 'consulta',
    tags: ['bebe', 'cochecito', 'infante', 'sin-costo'],
    examples: ['ID:55623']
  },

  // ===== CERTIFICADO MÉDICO =====
  {
    id: 'certificado-medico-grado-consanguinidad-1',
    title: 'Certificado Médico - Grados de Consanguinidad',
    content: `Estimado/a [NOMBRE AGENCIA],

En este caso la alternativa se utilizará para:

👨‍⚕️ APLICABILIDAD:
• ✅ El pasajero que se encuentre enfermo
• ✅ Cónyuge
• ✅ Padre o madre
• ✅ Hijos
• ℹ️ (Primer y segundo grado de consanguinidad)

❌ PARA LOS DEMÁS PASAJEROS:
Lamentablemente no es posible acceder a lo solicitado.

📋 ALTERNATIVA:
Recuerda que tienes la flexibilidad de realizar cambios de fecha, hora y/o destino para los demás pasajeros, manteniendo las condiciones de las tarifas. Estas se hacen sobre tarifas actuales, siempre y cuando realices el proceso hasta antes de la salida del vuelo, cumpliendo con la política de penalidad y condiciones asociadas en la tarifa del TKT.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Certificado Médico'],
    gdsSystem: 'AMBOS',
    scenario: 'general',
    tags: ['certificado-medico', 'consanguinidad', 'familia', 'devolucion'],
    examples: ['ID:55944']
  },

  // ===== TOMA DE PAGOS =====
  {
    id: 'toma-pagos-confirmado-1',
    title: 'Pago Confirmado - Asientos Asignados',
    content: `Estimados, buenas tardes.

He validado la reserva y evidencio que el pago fue realizado exitosamente.

✅ CONFIRMACIÓN DE PAGO:
• Reserva: [PNR]
• Monto: $[MONTO]
• Fecha de pago: [FECHA]
• Estado: PAGADO

🪑 ASIENTOS CONFIRMADOS:
Los asientos se encuentran asignados y confirmados en la reserva:
• [DETALLAR ASIENTOS ASIGNADOS]

Todo está listo para el viaje.

Saludos,
[NOMBRE ASESOR]`,
    category: 'tipoSolicitud',
    applicableFor: ['Toma de Pagos (WebPay/Portal AG/Otro)'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['pago', 'confirmado', 'asientos', 'webpay'],
    examples: ['ID:55951']
  },
];

// ==========================================
// SCRIPTS RECLAMOS / INCIDENTES - CASOS REALES
// ==========================================

export const reclamoIncidenteScripts: ResponseScript[] = [
  // ===== ALTERNATIVA POR CANCELACIÓN - DEMORA - SOBREVENTA (Muy común) =====
  {
    id: 'cancelacion-reprogramacion-alternativas-1',
    title: 'Reprogramación - Alternativas al Pasajero',
    content: `Estimado/a [NOMBRE AGENCIA], buen día.

Efectivamente, existe una reprogramación de itinerario bajo el código de reserva [PNR].

Por lo tanto, el pasajero tiene las siguientes alternativas:

✈️ **OPCIÓN 1: Cambio de fecha sin costo** (una única vez)
Debes reemitir el boleto a costo cero (NO ADC) bajo el mismo PNR como involuntario, utilizando:
• La clase disponible
• Manteniendo la ruta original
• Sin ingresar Waiver en el endoso

💰 **OPCIÓN 2: Devolución total**
Para solicitar la devolución, debes hacerlo a través de BSPlink, ingresando con un código Waiver que te proporcionaremos por este medio.

⚠️ Para entregarte el Waiver de devolución, es necesario que **elimines los tramos de la reserva que no se van a utilizar** (siempre y cuando el vuelo no haya pasado).

Quedamos atentos.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Alternativa por Cancelación - Demora - Sobreventa'],
    gdsSystem: 'AMBOS',
    scenario: 'general',
    tags: ['reprogramacion', 'alternativas', 'noadc', 'devolucion'],
    examples: ['ID:55637', 'ID:55641', 'ID:55690', 'ID:55941', 'ID:55945']
  },
  {
    id: 'cancelacion-sin-control-cambio-1',
    title: 'Reprogramación Sin Control - Confirmación de Fechas',
    content: `Estimados, buen día.

Efectivamente, existe una reprogramación de itinerario bajo el código de reserva [PNR].

Por lo tanto, el pasajero tiene la opción de realizar un cambio de fecha sin costo por única vez.

⚠️ SITUACIÓN ESPECIAL:
Dado que la agencia **no tiene el control de la reserva** (por cambio previo realizado desde nuestra pantalla), por favor confírmame las fechas para las cuales desean generar la remisión.

✅ UNA VEZ CONFIRMES LAS FECHAS:
• Validaremos disponibilidad
• Tomaremos los segmentos
• Realizaremos la remisión sin costo
• Te enviaremos confirmación

Quedamos atentos.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Alternativa por Cancelación - Demora - Sobreventa'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['reprogramacion', 'sin-control', 'fechas', 'confirmacion'],
    examples: ['ID:55681']
  },
  {
    id: 'cancelacion-ya-viajo-1',
    title: 'Sobreventa - Cambio Realizado en Aeropuerto',
    content: `Estimado/a [NOMBRE AGENCIA],

He validado la reserva, y efectivamente el vuelo del día [FECHA NO ABORDADO] no fue abordado.

✅ CAMBIO YA REALIZADO:
Sin embargo, la pasajera realizó un **cambio de fecha sin costo en Aeropuerto** para el día [NUEVA FECHA], el cual fue abordado con normalidad.

📋 DETALLE:
• Vuelo original no abordado: [VUELO] - [FECHA]
• Motivo: [SOBREVENTA/OTRO]
• Cambio aplicado en aeropuerto: [NUEVO VUELO] - [NUEVA FECHA]
• Estado del viaje: COMPLETADO

El caso está cerrado satisfactoriamente.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Alternativa por Cancelación - Demora - Sobreventa'],
    gdsSystem: 'AMBOS',
    scenario: 'consulta',
    tags: ['sobreventa', 'aeropuerto', 'cambio-realizado', 'completado'],
    examples: ['ID:55686']
  },

  // ===== CHECK-IN (Muy frecuente) =====
  {
    id: 'checkin-boarding-pass-aeropuerto-1',
    title: 'Boarding Pass Habilitado - Sin Costo',
    content: `Estimados, buen día.

He validado las reservas y hemos cargado las tarjetas de embarque para que los pasajeros las reclamen en Aeropuerto **sin cargo**.

✅ RESERVAS HABILITADAS:
• PNR: [PNR 1]
• PNR: [PNR 2] (si aplica)

⏰ IMPORTANTE:
Se recomienda llegar con los tiempos estipulados por la aerolínea para evitar novedades.

📋 EN AEROPUERTO:
Los pasajeros deben:
• Presentarse en counter de JetSMART
• Solicitar tarjetas de embarque
• Mostrar documento de identidad
• Sin costo adicional

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Check-in'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['checkin', 'boarding-pass', 'aeropuerto', 'gratis'],
    examples: ['ID:55888', 'ID:55711', 'ID:55697']
  },
  {
    id: 'checkin-multisegmento-1',
    title: 'Check-in Multi-Segmento - No Disponible Web',
    content: `Estimado/a [NOMBRE AGENCIA],

Dado que el vuelo cuenta con **más de dos segmentos**, escalas no ofrecidas por la aerolínea, el sistema no identifica estas reservas para ingreso desde nuestro sitio web.

ℹ️ MOTIVO TÉCNICO:
• Reserva con +2 segmentos
• Escalas no operadas por JetSMART
• Sistema web no reconoce itinerario complejo

✅ SOLUCIÓN APLICADA:
En tal sentido, hemos cargado las **tarjetas de embarque** para que los pasajeros las reclamen en Aeropuerto **sin cargo**.

⏰ RECOMENDACIÓN:
Se recomienda llegar con los tiempos estipulados por la aerolínea para evitar novedades.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Check-in'],
    gdsSystem: 'AMBOS',
    scenario: 'general',
    tags: ['checkin', 'multisegmento', 'web-error', 'aeropuerto'],
    examples: ['ID:55690', 'ID:55711']
  },
  {
    id: 'checkin-tarifa-incorrecta-1',
    title: 'Corrección de Tarifa en Check-in',
    content: `Estimado/a [NOMBRE AGENCIA],

En este momento he asignado la tarifa [G3/G2/G1] correctamente para [TODOS LOS PASAJEROS/ambos pasajeros].

✅ CORRECCIÓN APLICADA:
• PNR: [PNR]
• Tarifa corregida: [CÓDIGO TARIFA]
• Equipaje actualizado: [ESPECIFICACIONES]
• Visible en web para check-in: ✓

Ahora los pasajeros podrán realizar el check-in sin problemas y verán correctamente el equipaje incluido.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Check-in'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['checkin', 'tarifa', 'correccion', 'equipaje'],
    examples: ['ID:55703']
  },
  {
    id: 'checkin-correccion-fecha-nacimiento-1',
    title: 'Corrección Fecha de Nacimiento',
    content: `Estimados, buen día.

He realizado la corrección en la fecha de nacimiento, tal como se solicitó.

✅ DATOS ACTUALIZADOS:
• Pasajero: [NOMBRE COMPLETO]
• Fecha de nacimiento anterior: [FECHA INCORRECTA]
• Fecha de nacimiento correcta: [FECHA CORRECTA]
• PNR: [PNR]

Ahora el pasajero podrá realizar el check-in sin inconvenientes.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Check-in'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['checkin', 'fecha-nacimiento', 'correccion', 'datos'],
    examples: ['ID:55679']
  },
  {
    id: 'checkin-validacion-problema-1',
    title: 'Validación Check-in - Solicitud de Detalles',
    content: `Estimada [NOMBRE AGENCIA], buen día.

He validado la reserva, y se evidencia que el pasajero tiene el check-in realizado.

✅ ESTADO ACTUAL:
• PNR: [PNR]
• Check-in: CONFIRMADO
• Tarjeta de embarque: GENERADA
• Asientos: [ASIENTOS ASIGNADOS]

❓ INCIDENCIA REPORTADA:
Por favor, confírmame qué incidencia específica está presentando en Aeropuerto para poder asistirte mejor:
• ¿Problema con la tarjeta de embarque?
• ¿No aparece en el sistema del aeropuerto?
• ¿Error al intentar abordar?
• ¿Otro problema?

Quedamos atentos.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Check-in'],
    gdsSystem: 'AMBOS',
    scenario: 'consulta',
    tags: ['checkin', 'validacion', 'aeropuerto', 'problema'],
    examples: ['ID:55640']
  },

  // ===== PROCESO O ESTADO DE DEVOLUCIÓN =====
  {
    id: 'devolucion-informacion-faltante-1',
    title: 'Devolución - Solicitud de Información Bancaria',
    content: `Estimados, buen día.

Después de recibir tu respuesta, se evidencia que los datos solicitados no se encuentran diligenciados completamente.

Por lo tanto, para continuar con tu devolución es necesario que nos indiques la siguiente información:

📋 DATOS REQUERIDOS:
• País: [PAÍS]
• Nombre del Banco:
• Tipo de cuenta: [AHORRO/CORRIENTE]
• Número de cuenta:
• Nombre completo del titular:
• Documento de identidad:
• Correo electrónico:

Una vez recibida esta información, procederemos con el trámite de devolución.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Proceso o Estado de Devolución (PW/APP/BSP/ARC)'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['devolucion', 'datos-bancarios', 'informacion', 'pendiente'],
    examples: ['ID:55650']
  },
  {
    id: 'devolucion-solicitud-refund-number-1',
    title: 'Validación Devolución - Solicitud de Refund Number',
    content: `Estimado/a [NOMBRE AGENCIA],

He validado tu solicitud. En este caso, es necesario que nos adjuntes:

📋 INFORMACIÓN REQUERIDA:
• Código de reserva (PNR): [O]
• Número de ticket (TKT): [Y]
• **Número de refund** de la solicitud a través del BSP

Con esta información podremos validar el estado de tu devolución y brindarte asistencia.

Quedamos atentos.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Proceso o Estado de Devolución (PW/APP/BSP/ARC)'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['devolucion', 'refund-number', 'bsp', 'validacion'],
    examples: ['ID:55939']
  },

  // ===== COBRO ERRÓNEO ATO =====
  {
    id: 'cobro-erroneo-reembolso-datos-1',
    title: 'Cobro Erróneo - Solicitud Datos para Reembolso',
    content: `Prezados/Estimados, boa tarde/buen día.

Pedimos desculpas/Lamentamos pelo ocorrido/el inconveniente.

Neste caso, reembolsaremos o valor cobrado no aeroporto/En este caso, reembolsaremos el valor cobrado en el aeropuerto.

💰 REEMBOLSO A PROCESAR:
• Concepto: [EQUIPAJE/OTRO COBRO INDEBIDO]
• Monto: $[MONTO]

📋 INFORMACIÓN REQUERIDA:
Para processar o reembolso/procesar el reembolso, envie-nos/envíanos as seguintes informações/la siguiente información:

• Banco:
• Tipo de Conta/Cuenta: [AHORRO/CORRIENTE]
• Nome Completo/Nombre Completo:
• Número da Conta/Número de Cuenta:
• CPF/Documento:
• E-mail:
• Agência/Sucursal:

Una vez recibida, procederemos con el reembolso.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Cobro Erróneo ATO - No corresponde'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['cobro-erroneo', 'reembolso', 'aeropuerto', 'datos-bancarios'],
    examples: ['ID:55885']
  },

  // ===== PNR HX =====
  {
    id: 'pnr-hx-reemision-waiver-1',
    title: 'PNR HX - Waiver para Reemisión Involuntaria',
    content: `Estimado/a [NOMBRE AGENCIA], buenas tardes.

Esto obedece a que el sistema no tomó correctamente la forma de pago y, en consecuencia, la transacción no se sincronizó en tiempo real con nuestro sistema.

✅ ESTADO ACTUAL:
• Los espacios quedaron confirmados
• PNR activo: [PNR]
• Status HX en tickets: Error de sincronización

🔧 SOLUCIÓN:
Para regularizar la situación, les proporcionaremos un waiver que les permitirá realizar la **reemisión de forma involuntaria** con entrada **NOADC**, de manera que los tiquetes queden revalidados desde [Amadeus/Sabre].

📋 WAIVERS:

PNR: [PNR]
TKT: [9742987557124] | WAIVER: [AR471240109]
TKT: [9742987557125] | WAIVER: [AR471250109]
TKT: [9742987557126] | WAIVER: [AR471260109]

Quedamos atentos.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['PNR HX'],
    gdsSystem: 'AMBOS',
    scenario: 'aprobado',
    tags: ['pnr-hx', 'waiver', 'reemision', 'noadc', 'sincronizacion'],
    examples: ['ID:55863']
  },

  // ===== SEGMENTOS PASIVOS - ERROR BUNDLE =====
  {
    id: 'segmentos-tarifa-sin-asientos-1',
    title: 'Tarifa Sin Asientos - Política de Asignación',
    content: `Estimado/a [NOMBRE AGENCIA],

Te informamos que la tarifa adquirida **no incluye la selección de asientos**.

📋 OPCIONES:

**OPCIÓN 1: Comprar asientos**
• Puedes realizar la asignación específica
• Costo: $[MONTO] por asiento
• Compra en: www.jetsmart.com → "Administra tu viaje"

**OPCIÓN 2: Asignación aleatoria** (gratis)
• Los asientos serán asignados de manera aleatoria
• Sin costo
• Se asignan automáticamente al hacer check-in

⚠️ IMPORTANTE:
La asignación aleatoria no garantiza que los pasajeros queden juntos.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Segmentos Pasivos - Error BUNDLE'],
    gdsSystem: 'AMBOS',
    scenario: 'general',
    tags: ['asientos', 'tarifa', 'aleatorio', 'sin-incluir'],
    examples: ['ID:55887']
  },

  // ===== OTRO (General) =====
  {
    id: 'otro-escalamiento-pendiente-1',
    title: 'Caso Escalado - Sin Novedades Aún',
    content: `Buen día, estimado/a [NOMBRE AGENCIA].

Por el momento, aún no contamos con novedades respecto a tu consulta.

⏱️ ESTADO ACTUAL:
• Caso escalado: [FECHA]
• Equipo: [DEPARTAMENTO]
• Ticket escalamiento: [NÚMERO]
• Status: EN PROCESO

✅ ACCIÓN TOMADA:
Sin embargo, hemos procedido a escalarlo nuevamente con el equipo correspondiente para agilizar la respuesta.

📧 Te estaremos informando tan pronto tengamos actualizaciones.

Agradecemos tu comprensión.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Otro'],
    gdsSystem: 'AMBOS',
    scenario: 'proceso',
    tags: ['escalamiento', 'pendiente', 'sin-novedades', 'seguimiento'],
    examples: ['ID:55619']
  },
  {
    id: 'otro-canal-incorrecto-1',
    title: 'Redirección a Canal Correcto',
    content: `Buen día, estimado/a [NOMBRE CLIENTE/AGENCIA].

Recuerda que este canal está especializado en la atención a agencias con reservas emitidas por el sistema de distribución GDS.

🔄 CANAL CORRECTO:

Para tu consulta, te recomendamos escribir directamente al correo:
📧 [CORREO ESPECIALIZADO - ej: soporte.grupos@jetsmart.com]

El equipo especializado en [ÁREA ESPECÍFICA] podrá brindarte el seguimiento y soporte correspondiente.

Los dejo en copia para que puedan asistirte.

Saludos,
[NOMBRE ASESOR]`,
    category: 'reclamoIncidente',
    applicableFor: ['Otro'],
    gdsSystem: 'AMBOS',
    scenario: 'general',
    tags: ['canal-incorrecto', 'redireccion', 'soporte-grupos'],
    examples: ['ID:55634', 'ID:55705']
  },
];

// ==========================================
// FUNCIONES AUXILIARES MEJORADAS
// ==========================================

export function getApplicableScripts(
  type: 'tipoSolicitud' | 'reclamoIncidente',
  value: string
): ResponseScript[] {
  const scripts = type === 'tipoSolicitud' ? tipoSolicitudScripts : reclamoIncidenteScripts;
  return scripts.filter(script => script.applicableFor.includes(value));
}

export function searchScripts(query: string): ResponseScript[] {
  const allScripts = [...tipoSolicitudScripts, ...reclamoIncidenteScripts];
  const lowerQuery = query.toLowerCase();
  
  return allScripts.filter(script =>
    script.title.toLowerCase().includes(lowerQuery) ||
    script.content.toLowerCase().includes(lowerQuery) ||
    script.tags?.some(tag => tag.includes(lowerQuery)) ||
    script.gdsSystem?.toLowerCase().includes(lowerQuery)
  );
}

export function getScriptsByGDS(gdsSystem: 'AMADEUS' | 'SABRE' | 'AMBOS'): ResponseScript[] {
  const allScripts = [...tipoSolicitudScripts, ...reclamoIncidenteScripts];
  return allScripts.filter(script => 
    script.gdsSystem === gdsSystem || script.gdsSystem === 'AMBOS'
  );
}

export function getScriptsByScenario(scenario: string): ResponseScript[] {
  const allScripts = [...tipoSolicitudScripts, ...reclamoIncidenteScripts];
  return allScripts.filter(script => script.scenario === scenario);
}

export function getScriptsStats() {
  const allScripts = [...tipoSolicitudScripts, ...reclamoIncidenteScripts];
  return {
    total: allScripts.length,
    porTipo: tipoSolicitudScripts.length,
    porReclamo: reclamoIncidenteScripts.length,
    amadeus: getScriptsByGDS('AMADEUS').length,
    sabre: getScriptsByGDS('SABRE').length,
    ambos: getScriptsByGDS('AMBOS').length,
    aprobados: getScriptsByScenario('aprobado').length,
    procesos: getScriptsByScenario('proceso').length,
    consultas: getScriptsByScenario('consulta').length,
  };
}

// Exportar scripts combinados de ambos archivos
export { tipoSolicitudScripts, reclamoIncidenteScripts };



