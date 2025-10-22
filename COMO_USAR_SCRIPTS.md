# 📖 Guía Rápida: Cómo Usar los Scripts de Respuesta

## 🎯 En 4 Pasos Simples

---

### **Paso 1️⃣: Llena el Formulario Básico**

Ve a **"Nuevo Requerimiento"** y completa:

✅ Nombre del Asesor  
✅ Hora de Ingreso  
✅ Origen Consulta  
✅ PNR/TKT/Localizador  
✅ Correo Electrónico  
✅ **Selecciona un "Tipo de Solicitud"** ⬅️ IMPORTANTE  
✅ **O un "Reclamo/Incidente"** ⬅️ IMPORTANTE  
✅ Solicitud del Cliente  

---

### **Paso 2️⃣: Aparecen los Scripts Automáticamente** ✨

Cuando selecciones un **Tipo de Solicitud** o **Reclamo/Incidente**, verás una tarjeta azul que dice:

```
✨ Scripts de Respuesta Sugeridos (2)
```

Dentro encontrarás **botones** con los scripts disponibles, por ejemplo:

```
📄 Waiver aprobado - Cambio de fecha
   Estimado/a cliente, Se ha procesado exitosamente su...
   🏷️ waiver  aprobado  cambio-fecha

📄 Waiver en proceso - Escalamiento
   Estimado/a cliente, Su solicitud de waiver ha sido...
   🏷️ waiver  escalado  proceso
```

---

### **Paso 3️⃣: Selecciona y Personaliza el Script**

**A) Haz click en el script que mejor se ajuste al caso**

Se abrirá un editor grande con:
- Título del script arriba
- Texto completo editable en el centro
- Botones "Cancelar" y "Aplicar Script" abajo

**B) Personaliza el script**

Busca valores entre corchetes y reemplázalos:

❌ **Antes:**
```
- Nuevo itinerario confirmado: [INDICAR VUELOS]
- Fecha de viaje: [FECHA]
```

✅ **Después:**
```
- Nuevo itinerario confirmado: SCL-BUE, vuelo JA800
- Fecha de viaje: 25 de Octubre 2025
```

**C) Haz click en "Aplicar Script"**

---

### **Paso 4️⃣: Confirma que Esté Correcto** ⚠️

Aparecerá una **alerta de confirmación** con un checklist:

```
⚠️ ¿Estás seguro?

Asegúrate que la información esté correcta antes de aplicar el script.

Verifica que:
✓ Has reemplazado todos los valores entre corchetes [ ]
✓ La información es específica para este caso
✓ El texto está completo y sin errores
✓ El tono es profesional y apropiado

[Revisar de nuevo]  [Confirmar y aplicar]
```

**Haz click en "Confirmar y aplicar"**

---

### **✅ ¡Listo!**

El script se copiará automáticamente al campo **"Información Brindada"**.

Puedes:
- ✏️ Editarlo más si lo necesitas
- ✅ Completar el resto del formulario
- 💾 Guardar el requerimiento

---

## 🎬 Ejemplo Completo de Uso

### **Caso:** Cliente solicita waiver para cambio de fecha

**1. Lleno el formulario:**
- Asesor: Sandra Milena Jaramillo
- Hora: 14:30
- PNR: ABC123
- Email: cliente@example.com
- **Tipo Solicitud: "Waiver GDS - Sabre"** ✨

**2. Aparecen 2 scripts:**
- ✅ Waiver aprobado - Cambio de fecha
- ✅ Waiver en proceso - Escalamiento

**3. Selecciono:** "Waiver aprobado - Cambio de fecha"

**4. En el editor, personalizo:**

Cambio esto:
```
- Nuevo itinerario confirmado: [INDICAR VUELOS]
- Fecha de viaje: [FECHA]
```

Por esto:
```
- Nuevo itinerario confirmado: Santiago-Buenos Aires, vuelo JA800
- Fecha de viaje: 25 de Octubre 2025
```

**5. Click en "Aplicar Script"**

**6. Confirmo en la alerta**

**7. El texto aparece en "Información Brindada"**

**8. Guardo el requerimiento** ✅

---

## ⏱️ Ahorro de Tiempo

### Sin Scripts:
- ✍️ Escribir respuesta: **5-10 minutos**
- 🤔 Pensar qué decir: **2-3 minutos**
- ✅ Revisar ortografía: **1-2 minutos**
- **Total: 8-15 minutos por caso**

### Con Scripts:
- 🖱️ Seleccionar script: **10 segundos**
- ✏️ Personalizar: **1-2 minutos**
- ✅ Aplicar y continuar: **10 segundos**
- **Total: 2-3 minutos por caso**

### **Ahorro: 5-12 minutos por requerimiento** ⚡

---

## ❓ Preguntas Frecuentes

### ¿Puedo editar el script después de aplicarlo?
✅ **Sí**, el script se pega en el campo "Información Brindada" como texto normal. Puedes editarlo libremente.

### ¿Qué pasa si no hay scripts para mi tipo de solicitud?
💡 No aparecerá ninguna tarjeta de scripts. Simplemente escribe la respuesta manualmente o solicita que se agregue un script para ese caso.

### ¿Puedo usar múltiples scripts?
✅ **Sí**, puedes aplicar un script, editarlo, y luego agregar partes de otro script manualmente si lo necesitas.

### ¿Los scripts se actualizan automáticamente?
📝 No, los scripts están guardados en el código. Para agregar nuevos, un desarrollador debe actualizarlos en `src/data/responseScripts.ts`.

### ¿Qué hago si el script tiene información incorrecta?
✏️ Edítalo directamente en el editor antes de aplicarlo. También puedes reportar el error para que se corrija en el script original.

---

## 🚀 Próximos Pasos

Para completar el sistema con los scripts del archivo Excel:

1. **Exporta el archivo Excel a CSV** o comparte el contenido
2. **Identifica los mejores scripts** por cada tipo/reclamo
3. **Los agregaremos al sistema** siguiendo el formato establecido
4. **Los agentes tendrán acceso inmediato** a todos los scripts

---

## 📞 ¿Necesitas Ayuda?

Para agregar más scripts o modificar los existentes:
1. Abre el archivo: `src/data/responseScripts.ts`
2. Sigue el formato de los scripts existentes
3. Guarda y el sistema los mostrará automáticamente

---

**¡El sistema está listo para usar!** 🎉  
**Recarga el navegador** (`Ctrl + Shift + R`) y prueba crear un nuevo requerimiento.

---

**Manager-GDS** - Sistema Inteligente de Scripts de Respuesta  
**Versión**: 1.0.0  
**Fecha**: 16 de Octubre, 2025



