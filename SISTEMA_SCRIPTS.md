# 🤖 Sistema Inteligente de Scripts de Respuesta

## 📋 Descripción General

El sistema de scripts automatiza la creación de respuestas en el campo "Información Brindada", ahorrando tiempo a los agentes y asegurando consistencia en las respuestas.

---

## ✨ Características

### 1. **Auto-Sugerencia Inteligente**
- Scripts se muestran automáticamente según:
  - **Tipo de Solicitud** seleccionado
  - **Reclamo/Incidente** seleccionado
- Puede haber múltiples scripts para la misma opción

### 2. **Múltiples Opciones**
- Si hay varios scripts disponibles, se muestran todos
- El agente puede revisar y elegir el más adecuado
- Cada script tiene:
  - ✅ Título descriptivo
  - ✅ Preview del contenido
  - ✅ Tags para identificación rápida

### 3. **Editor de Scripts**
- El agente puede personalizar el script antes de aplicarlo
- Campos para completar marcados con [ ]
- Vista previa en tiempo real

### 4. **Confirmación de Seguridad**
- Alerta final antes de aplicar el script
- Checklist de verificación:
  - ✅ Valores entre corchetes reemplazados
  - ✅ Información específica del caso
  - ✅ Texto completo y sin errores
  - ✅ Tono profesional

---

## 🎯 ¿Cómo Funciona?

### **Paso 1: Seleccionar Tipo o Reclamo**

Cuando el agente selecciona un **Tipo de Solicitud** o **Reclamo/Incidente**, el sistema automáticamente:

1. Busca scripts aplicables en la base de datos
2. Muestra una tarjeta con "Scripts de Respuesta Sugeridos (N)"
3. Lista todos los scripts disponibles

### **Paso 2: Elegir un Script**

El agente hace click en el script que mejor se ajuste al caso:

- Ve el título completo
- Lee un preview del contenido
- Verifica los tags asociados

### **Paso 3: Personalizar**

Se abre un editor donde puede:

- **Leer** el script completo
- **Editar** cualquier parte del texto
- **Reemplazar** valores entre corchetes [ ] con info específica
- **Ajustar** el tono o contenido según necesidad

Ejemplo de script antes de editar:
```
Estimado/a cliente,

Se ha procesado exitosamente su solicitud de waiver GDS-Sabre.

Detalles del proceso:
- Se aplicó waiver para cambio de fecha sin penalidad
- Nuevo itinerario confirmado: [INDICAR VUELOS]
- Fecha de viaje: [FECHA]
- No se generan cargos adicionales

El nuevo ticket ha sido emitido y enviado a su correo electrónico.

Saludos cordiales,
```

Ejemplo después de personalizar:
```
Estimado/a Sr. Pérez,

Se ha procesado exitosamente su solicitud de waiver GDS-Sabre.

Detalles del proceso:
- Se aplicó waiver para cambio de fecha sin penalidad
- Nuevo itinerario confirmado: SCL-BUE, vuelo JA800
- Fecha de viaje: 25 de Octubre 2025
- No se generan cargos adicionales

El nuevo ticket ha sido emitido y enviado a su correo electrónico.

Saludos cordiales,
```

### **Paso 4: Aplicar Script**

Al hacer click en "Aplicar Script":

1. Se cierra el editor
2. Se muestra una alerta de confirmación
3. El agente revisa el checklist
4. Confirma que todo está correcto
5. El script se inserta en el campo "Información Brindada"

### **Paso 5: Continuar con el Formulario**

El agente puede:
- Seguir editando el texto si lo necesita
- Completar el resto del formulario
- Guardar el requerimiento

---

## 📊 Scripts Actuales

### Por Tipo de Solicitud:

#### **Waiver GDS - Sabre** (2 scripts)
1. ✅ Waiver aprobado - Cambio de fecha
2. ✅ Waiver en proceso - Escalamiento

#### **Waiver Comercial** (1 script)
1. ✅ Waiver comercial aprobado

#### **Remisión Voluntaria - Involuntaria** (1 script)
1. ✅ Remisión voluntaria procesada

#### **Cesión - Cambio de Nombre Vol - Corrección** (1 script)
1. ✅ Corrección de nombre procesada

#### **Facturación** (2 scripts)
1. ✅ Factura emitida
2. ✅ Corrección de factura

### Por Reclamos / Incidentes:

#### **Error en Emisión** (2 scripts)
1. ✅ Error de emisión - Ticket reemitido
2. ✅ Error de emisión - En proceso

#### **Alternativa por Cancelación - Demora - Sobreventa** (2 scripts)
1. ✅ Alternativa por cancelación
2. ✅ Compensación por demora

#### **Proceso o Estado de Devolución** (2 scripts)
1. ✅ Devolución en proceso
2. ✅ Estado de devolución - Consulta

#### **Cobro Erróneo ATO** (1 script)
1. ✅ Cobro erróneo - Ajuste procesado

#### **Check-in** (1 script)
1. ✅ Asistencia con check-in

#### **Escalamiento Finanzas** (1 script)
1. ✅ Caso escalado a finanzas

---

## 📝 Cómo Agregar Más Scripts

### Basándose en el archivo Excel:

Para agregar scripts del archivo **"Sitema de Distribución AMADEUS y SABRE.xlsx"**:

1. **Abre el archivo**: `src/data/responseScripts.ts`

2. **Copia el formato** de un script existente:

```typescript
{
  id: 'id-unico',
  title: 'Título descriptivo del script',
  content: `Contenido del script aquí

Puede tener múltiples líneas
Y valores entre corchetes [PARA COMPLETAR]

Saludos cordiales,`,
  category: 'tipoSolicitud', // o 'reclamoIncidente'
  applicableFor: ['Nombre exacto del tipo o reclamo'],
  tags: ['palabra1', 'palabra2', 'palabra3']
},
```

3. **Completa los campos**:
   - `id`: Identificador único (ej: 'waiver-sabre-3')
   - `title`: Título que verá el agente
   - `content`: El texto completo del script
   - `category`: 'tipoSolicitud' o 'reclamoIncidente'
   - `applicableFor`: Array con los tipos/reclamos donde aplica
   - `tags`: Palabras clave para búsqueda (opcional)

4. **Agrega el script** al array correspondiente:
   - `tipoSolicitudScripts` si es para Tipo de Solicitud
   - `reclamoIncidenteScripts` si es para Reclamo/Incidente

### Ejemplo Real:

```typescript
// En el array tipoSolicitudScripts
{
  id: 'bundles-1',
  title: 'Opcionales - BUNDLES confirmado',
  content: `Estimado/a cliente,

Su solicitud de opcionales ha sido procesada exitosamente.

Detalle de servicios agregados:
- Bundle seleccionado: [NOMBRE DEL BUNDLE]
- Servicios incluidos: [LISTAR SERVICIOS]
- Costo adicional: [MONTO]

Los servicios se verán reflejados en su reserva.

Saludos cordiales,`,
  category: 'tipoSolicitud',
  applicableFor: ['Opcionales - BUNDLES'],
  tags: ['bundles', 'opcionales', 'servicios']
},
```

---

## 🔄 Próximas Mejoras

### Sugerencias para expandir el sistema:

1. **Importar desde Excel**
   - Leer scripts directamente del archivo Excel
   - Sincronización automática

2. **Búsqueda de Scripts**
   - Buscador por palabra clave
   - Filtros avanzados

3. **Favoritos**
   - Marcar scripts más usados
   - Historial de scripts aplicados

4. **Variables Inteligentes**
   - Auto-completar datos del formulario
   - Ej: [NOMBRE CLIENTE] → toma del campo "Correo Electrónico"

5. **Estadísticas**
   - Scripts más usados
   - Tiempo ahorrado
   - Efectividad de respuestas

---

## 💡 Consejos de Uso

### Para Agentes:

1. **Siempre personaliza**: Los scripts son plantillas, ajústalas al caso específico
2. **Verifica antes de aplicar**: Lee la alerta de confirmación
3. **Reemplaza corchetes**: Nunca dejes valores como [INDICAR FECHA]
4. **Mantén el tono**: Profesional y cortés siempre
5. **Revisa ortografía**: Antes de guardar el requerimiento

### Para Administradores:

1. **Revisa scripts regularmente**: Actualiza según feedback
2. **Agrega scripts nuevos**: Cuando identifiques casos frecuentes
3. **Mantén consistencia**: Usa el mismo tono en todos los scripts
4. **Documenta cambios**: Registra por qué se agregó/modificó un script
5. **Capacita al equipo**: Asegura que todos sepan usar el sistema

---

## 📞 Soporte

¿Necesitas agregar scripts del archivo Excel?

1. Comparte el contenido del archivo (puedes exportar a CSV)
2. Indica qué columnas contienen los scripts
3. Especifica para qué tipos/reclamos aplican
4. Los agregaremos al sistema

---

## 🎯 Beneficios del Sistema

### Para el Agente:
- ⏱️ **Ahorro de tiempo**: No escribir respuestas desde cero
- ✅ **Consistencia**: Respuestas profesionales siempre
- 🎯 **Precisión**: Menos errores de redacción
- 📚 **Aprendizaje**: Ver mejores prácticas en los scripts

### Para la Organización:
- 📊 **Calidad**: Respuestas estandarizadas y profesionales
- 🚀 **Eficiencia**: Más casos resueltos por hora
- 📈 **Satisfacción**: Clientes reciben respuestas claras
- 📖 **Conocimiento**: Base de respuestas documentada

---

**Sistema de Scripts v1.0**  
**Actualizado**: 16 de Octubre, 2025  
**Autor**: Jose Gamez (@josgam09)

