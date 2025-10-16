# 🎨 Tipografía - Manager GDS

## ✨ Fuente Principal: Encode Sans

**Encode Sans** es una familia tipográfica moderna, clara y versátil, perfecta para entornos digitales. Diseñada para excelente legibilidad en pantallas.

---

## 📦 Pesos Implementados

Se han cargado **6 pesos** de Encode Sans:

```
• Light (300)      - Para textos secundarios sutiles
• Regular (400)    - Texto general del cuerpo
• Medium (500)     - Labels, botones, énfasis medio
• Semibold (600)   - Títulos, textos destacados
• Bold (700)       - Títulos principales (h1)
• Black (900)      - Elementos ultra destacados
```

---

## 🎯 Distribución de Pesos por Elemento

### **Textos Generales**
```css
/* Cuerpo de texto */
body {
  font-weight: 400;  /* Regular */
}

/* Párrafos y textos normales */
p, span, div {
  font-weight: 400;  /* Regular */
}

/* Textos secundarios */
.text-muted-foreground {
  font-weight: 300;  /* Light - opcional */
}
```

### **Títulos y Encabezados**
```css
/* Títulos secundarios (h2-h6) */
h2, h3, h4, h5, h6 {
  font-weight: 600;  /* Semibold */
}

/* Título principal (h1) */
h1 {
  font-weight: 700;  /* Bold */
}

/* Textos grandes destacados */
.text-lg, .text-xl, .text-2xl, .text-3xl, .text-4xl {
  font-weight: 600;  /* Semibold */
}
```

### **Elementos Interactivos**
```css
/* Botones */
button {
  font-weight: 500;  /* Medium */
}

/* Labels de formularios */
label {
  font-weight: 500;  /* Medium */
}
```

### **Énfasis y Destacados**
```css
/* Texto en negrita */
strong, b {
  font-weight: 600;  /* Semibold */
}
```

---

## 🎨 Clases Utilitarias

Se han creado clases Tailwind personalizadas para todos los pesos:

```html
<!-- Light (300) -->
<p class="font-light">Texto sutil y ligero</p>

<!-- Regular (400) - Default -->
<p class="font-regular">Texto normal del cuerpo</p>

<!-- Medium (500) -->
<p class="font-medium">Labels y botones</p>

<!-- Semibold (600) -->
<h3 class="font-semibold">Títulos secundarios</h3>

<!-- Bold (700) -->
<h1 class="font-bold">Título principal</h1>

<!-- Black (900) -->
<h1 class="font-black">Súper destacado</h1>
```

---

## 📋 Casos de Uso Específicos

### **Dashboard**
```tsx
// Título principal
<h1 className="text-3xl font-bold">Manager GDS</h1>

// Subtítulos
<h2 className="text-xl font-semibold">Estadísticas</h2>

// Texto descriptivo
<p className="text-sm font-regular text-muted-foreground">
  Sistema de gestión de requerimientos
</p>
```

### **Formularios**
```tsx
// Label del campo
<Label className="font-medium">Nombre del Asesor</Label>

// Texto de ayuda
<p className="text-xs font-light text-muted-foreground">
  Selecciona tu nombre de la lista
</p>
```

### **Botones**
```tsx
// Botón primario
<Button className="font-medium">Crear Requerimiento</Button>

// Botón secundario
<Button variant="outline" className="font-regular">
  Cancelar
</Button>
```

### **Badges y Etiquetas**
```tsx
// Badge normal
<Badge className="font-medium">ADMINISTRADOR</Badge>

// Badge destacado
<Badge className="font-semibold text-lg">CRÍTICO</Badge>
```

### **Tarjetas y Cards**
```tsx
// Título de tarjeta
<CardTitle className="text-xl font-semibold">
  Panel de Administración
</CardTitle>

// Descripción
<CardDescription className="font-regular">
  Configura el sistema
</CardDescription>
```

---

## 🔧 Configuración Técnica

### **1. Importación de la Fuente**

En `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
```

### **2. Configuración en Tailwind**

En `tailwind.config.ts`:
```typescript
extend: {
  fontFamily: {
    sans: ['"Encode Sans"', 'system-ui', 'sans-serif'],
  },
}
```

### **3. Estilos Base**

En `index.css`:
```css
body {
  font-family: 'Encode Sans', system-ui, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 🎯 Jerarquía Visual

### **Niveles de Importancia**

```
Nivel 1: font-black (900)
  → Elementos ultra destacados, llamados de acción críticos
  
Nivel 2: font-bold (700)
  → Títulos principales (h1), encabezados de página
  
Nivel 3: font-semibold (600)
  → Títulos secundarios (h2-h6), textos destacados
  
Nivel 4: font-medium (500)
  → Botones, labels, elementos interactivos
  
Nivel 5: font-regular (400)
  → Texto del cuerpo, párrafos, contenido general
  
Nivel 6: font-light (300)
  → Textos secundarios, ayuda, anotaciones
```

---

## 🌟 Mejores Prácticas

### **DO's (Hacer)** ✅

```tsx
// ✅ Usar font-bold para títulos principales
<h1 className="font-bold text-3xl">Manager GDS</h1>

// ✅ Usar font-semibold para subtítulos
<h2 className="font-semibold text-xl">Dashboard</h2>

// ✅ Usar font-medium para botones
<Button className="font-medium">Guardar</Button>

// ✅ Usar font-regular para texto del cuerpo
<p className="font-regular">Descripción del caso</p>

// ✅ Usar font-light para textos secundarios
<span className="font-light text-sm text-muted-foreground">
  Opcional
</span>
```

### **DON'Ts (Evitar)** ❌

```tsx
// ❌ NO usar font-black en todo
<p className="font-black">Texto normal</p>  

// ❌ NO usar font-light en botones
<Button className="font-light">Guardar</Button>

// ❌ NO mezclar pesos sin jerarquía
<div>
  <h1 className="font-light">Título</h1>
  <p className="font-black">Párrafo</p>
</div>

// ❌ NO usar font-bold en textos pequeños
<span className="text-xs font-bold">Ayuda</span>
```

---

## 📱 Responsive Typography

### **Tamaños y Pesos Combinados**

```tsx
// Mobile: Más ligero, Desktop: Más pesado
<h1 className="
  text-2xl md:text-3xl lg:text-4xl 
  font-semibold md:font-bold
">
  Título Responsivo
</h1>

// Ajuste de peso según viewport
<p className="
  text-sm md:text-base 
  font-regular md:font-medium
">
  Texto adaptativo
</p>
```

---

## 🎨 Ejemplos de Páginas

### **Página de Login**
```tsx
// Título principal
<h1 className="text-4xl font-bold">Manager GDS</h1>

// Subtítulo
<p className="text-lg font-medium text-muted-foreground">
  Sistema de Gestión de Requerimientos
</p>

// Botones demo
<Button className="font-semibold">Administrador</Button>

// Texto de ayuda
<p className="text-xs font-light">
  Contraseña: password123
</p>
```

### **Dashboard**
```tsx
// Título de página
<h1 className="text-3xl font-bold">Dashboard</h1>

// Título de tarjeta
<CardTitle className="text-xl font-semibold">
  Estadísticas Generales
</CardTitle>

// Métricas grandes
<div className="text-3xl font-bold">245</div>
<p className="text-sm font-medium text-muted-foreground">
  Requerimientos
</p>
```

### **Formularios**
```tsx
// Título de sección
<h3 className="text-lg font-semibold border-b pb-2">
  Información del Cliente
</h3>

// Label
<Label className="font-medium">Email</Label>

// Texto de ayuda
<p className="text-xs font-regular text-muted-foreground">
  Ingresa el correo del cliente
</p>
```

---

## 🚀 Performance

### **Optimizaciones Aplicadas**

✅ **Preconnect a Google Fonts**: Mejora velocidad de carga
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

✅ **Display Swap**: Evita FOIT (Flash of Invisible Text)
```
&display=swap
```

✅ **Font Smoothing**: Mejor renderizado en pantallas
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

✅ **Solo 6 pesos cargados**: Reduce peso de descarga (vs. cargar todos)

---

## 📊 Peso de Descarga

```
Encode Sans (6 pesos):
  • Light (300):    ~12 KB
  • Regular (400):  ~12 KB
  • Medium (500):   ~12 KB
  • Semibold (600): ~12 KB
  • Bold (700):     ~12 KB
  • Black (900):    ~12 KB
  
Total aproximado: ~72 KB (comprimido con WOFF2)
```

Comparado con fuentes del sistema: +72 KB una sola vez (cached después)

---

## 🎯 Accesibilidad

### **Legibilidad**

✅ **Peso mínimo 300**: Light es legible en tamaños apropiados  
✅ **Regular (400) para texto del cuerpo**: Óptimo para lectura prolongada  
✅ **Suficiente contraste**: Los pesos crean jerarquía clara  
✅ **Antialiasing**: Mejor en pantallas de baja resolución  

### **Tamaños Mínimos Recomendados**

```css
/* font-light (300) */
min-size: 14px  → Legible

/* font-regular (400) */
min-size: 12px  → Legible

/* font-medium (500) */
min-size: 11px  → Legible

/* font-semibold+ (600+) */
min-size: 10px  → Legible
```

---

## ✅ Checklist de Implementación

- [x] Importar Encode Sans desde Google Fonts
- [x] Configurar en Tailwind (fontFamily)
- [x] Aplicar en body (font-family)
- [x] Crear clases utilitarias de pesos
- [x] Configurar títulos (h1-h6)
- [x] Configurar botones y labels
- [x] Activar font smoothing
- [x] Documentar uso y mejores prácticas

---

## 🔄 Actualizar y Ver Cambios

```bash
# El servidor debe recargar automáticamente
# Si no, recarga el navegador:
Ctrl + Shift + R
```

**Verifica que**:
1. Los títulos se vean más pesados (Bold/Semibold)
2. Los botones tengan un peso medio
3. El texto del cuerpo sea Regular
4. La fuente general sea Encode Sans

---

## 🎉 Resultado Final

**Antes**: Sistema con fuente genérica (system-ui)  
**Ahora**: Encode Sans con jerarquía tipográfica profesional

**Beneficios**:
- ✅ Look más profesional y moderno
- ✅ Mejor legibilidad en pantallas
- ✅ Jerarquía visual clara
- ✅ Consistencia en todo el sistema
- ✅ Identidad visual mejorada

---

**Versión**: 4.1  
**Fecha**: 16 de Octubre, 2025  
**Autor**: Jose Gamez (@josgam09)

¡Disfruta de la nueva tipografía! 🎨✨

