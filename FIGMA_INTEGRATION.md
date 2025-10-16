# Integración con Figma - UI KIT 2025

## Token de Acceso

El token de acceso a Figma debe configurarse como variable de entorno:

```bash
# Crear archivo .env.local en la raíz del proyecto
VITE_FIGMA_TOKEN=your_figma_token_here
```

**Nota de Seguridad**: El token de Figma se encuentra en el archivo `TOKEN FIGMA.txt` en el directorio raíz del workspace. 
⚠️ **NUNCA** commitear este token al repositorio. Siempre usar variables de entorno.

## Pasos para Integración Completa

### 1. Obtener el File Key de Figma

Para integrar el diseño de Figma, necesitas:

1. Subir el archivo `UI KIT 2025 with Landings.fig` a Figma.com
2. Obtener la URL del archivo, que tendrá este formato:
   ```
   https://www.figma.com/file/[FILE_KEY]/UI-KIT-2025
   ```
3. El `FILE_KEY` es lo que necesitamos para la integración

### 2. Exportar Assets desde Figma

#### Colores y Tokens de Diseño

Para exportar los colores del UI KIT:

```bash
# Instalar plugin de Figma Tokens
# O usar la API de Figma para extraer estilos
```

Actualizar el archivo `tailwind.config.ts` con los colores del diseño:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Colores del UI KIT 2025
        primary: {
          DEFAULT: '#[COLOR_FROM_FIGMA]',
          foreground: '#[COLOR_FROM_FIGMA]',
        },
        // ... más colores
      },
    },
  },
};
```

#### Iconos y Logos

1. Exportar iconos como SVG desde Figma
2. Guardar en `public/icons/` o `src/assets/icons/`
3. Importar en componentes según necesidad

### 3. Usar la API de Figma

Para automatizar la extracción de diseños:

```typescript
// Ejemplo de uso de la API de Figma
const FIGMA_TOKEN = import.meta.env.VITE_FIGMA_TOKEN;
const FILE_KEY = 'TU_FILE_KEY_AQUI';

async function getFigmaFile() {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    }
  );
  
  const data = await response.json();
  return data;
}
```

### 4. Exportar Imágenes

Para exportar imágenes desde Figma:

```typescript
async function exportImages(nodeIds: string[]) {
  const params = new URLSearchParams({
    ids: nodeIds.join(','),
    format: 'png',
    scale: '2',
  });
  
  const response = await fetch(
    `https://api.figma.com/v1/images/${FILE_KEY}?${params}`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    }
  );
  
  const data = await response.json();
  return data.images;
}
```

## Herramientas Recomendadas

### Plugins de Figma Útiles

1. **Figma Tokens**: Para exportar design tokens
2. **Iconify**: Para gestión de iconos
3. **Design System Manager**: Para mantener consistencia

### Bibliotecas para Integración

```bash
# Instalar dependencias para trabajar con Figma
npm install --save-dev @figma/plugin-typings
npm install figma-api
```

## Estado Actual

✅ Token de Figma configurado
✅ Proyecto React + shadcn/ui listo
✅ Sistema de diseño base implementado
⏳ **Pendiente**: URL del archivo Figma en Figma.com

## Próximos Pasos

1. **Subir el archivo .fig a Figma.com**
   - Crear cuenta o iniciar sesión en Figma
   - Subir `UI KIT 2025 with Landings.fig`
   - Compartir el enlace del proyecto

2. **Extraer Design Tokens**
   - Colores principales
   - Tipografía (fuentes, tamaños, pesos)
   - Espaciados y márgenes
   - Sombras y efectos
   - Bordes y radios

3. **Actualizar Configuración de Tailwind**
   - Aplicar colores del UI KIT
   - Configurar tipografía personalizada
   - Ajustar breakpoints si es necesario

4. **Exportar y Organizar Assets**
   - Logo de Manager GDS
   - Iconos personalizados para GDS systems
   - Ilustraciones o gráficos

## Documentación Adicional

- [Figma API Documentation](https://www.figma.com/developers/api)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
- [Tailwind CSS Customization](https://tailwindcss.com/docs/configuration)

## Notas

El proyecto actual ya tiene un diseño funcional y moderno usando shadcn/ui. La integración con Figma permitirá:

- Aplicar la identidad visual específica del UI KIT 2025
- Mantener consistencia entre diseño y desarrollo
- Facilitar futuras actualizaciones de diseño
- Documentar el sistema de diseño

---

**Actualizado**: Octubre 2025
**Responsable**: Jose Gamez

