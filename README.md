# Manager GDS

## Sistema de Gestión de Requerimientos GDS

Manager GDS es una aplicación web moderna diseñada para la gestión centralizada de requerimientos relacionados con sistemas GDS (Global Distribution System) como Sabre, Amadeus, Travelport y Sirena.

## 🚀 Características Principales

- **Gestión Integral de Requerimientos**: Crea, actualiza y da seguimiento a requerimientos GDS
- **Multi-GDS**: Soporte para múltiples sistemas GDS (Sabre, Amadeus, Travelport, Sirena)
- **Categorización Avanzada**: Organiza requerimientos por tipo, categoría, prioridad y sistema
- **Dashboard Analítico**: Visualiza estadísticas y métricas en tiempo real
- **Sistema de Tickets**: Numeración automática y tracking de casos
- **Gestión de SLA**: Seguimiento de fechas límite y cumplimiento de SLA
- **Historial Completo**: Registro detallado de todas las actividades y cambios
- **Exportación de Datos**: Descarga reportes en formato CSV
- **Interfaz Moderna**: UI responsiva construida con React y shadcn/ui

## 🏗️ Tecnologías

Este proyecto está construido con:

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **State Management**: Context API
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📋 Prerequisitos

- Node.js 18.x o superior
- npm o bun

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/josgam09/Manager-GDS.git

# Navegar al directorio del proyecto
cd Manager-GDS

# Instalar dependencias
npm install
# o
bun install

# Iniciar el servidor de desarrollo
npm run dev
# o
bun dev
```

## 📱 Uso

### Dashboard

El dashboard principal muestra:
- Resumen de requerimientos por estado
- Distribución por sistema GDS
- Requerimientos recientes
- Métricas y estadísticas

### Gestión de Requerimientos

**Crear Nuevo Requerimiento:**
1. Navegar a "Nuevo Requerimiento"
2. Completar el formulario con:
   - Información general (título, tipo, sistema GDS)
   - Datos del solicitante
   - Descripción detallada del requerimiento
   - Estado y asignación

**Ver y Editar:**
- Click en cualquier requerimiento para ver detalles completos
- Editar información desde la vista de detalle
- Ver historial completo de actividades

### Filtros y Búsqueda

- Buscar por texto en múltiples campos
- Filtrar por estado, prioridad y sistema GDS
- Exportar resultados filtrados a CSV

## 🎯 Casos de Uso

### Tipos de Requerimientos

1. **Consultas**: Preguntas sobre funcionalidades GDS
2. **Incidencias**: Problemas técnicos o errores
3. **Solicitudes**: Peticiones de acceso, configuración, etc.
4. **Configuración**: Cambios en configuración de sistemas
5. **Reportes**: Solicitudes de informes y análisis

### Categorías

- Reservas
- Tarifas
- Disponibilidad
- PNR (Passenger Name Record)
- Tickets
- Reportes
- Accesos
- Capacitación

## 🔐 Sistemas GDS Soportados

- **Sabre**: Sistema GDS de Sabre Corporation
- **Amadeus**: Sistema GDS de Amadeus IT Group
- **Travelport**: Sistema GDS de Travelport (Galileo, Worldspan, Apollo)
- **Sirena**: Sistema GDS ruso

## 📊 Estructura del Proyecto

```
Manager-GDS/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # Componentes de shadcn/ui
│   │   ├── Layout.tsx   # Layout principal
│   │   ├── *Badge.tsx   # Componentes de badges
│   │   └── StatCard.tsx # Card de estadísticas
│   ├── contexts/        # Context providers
│   │   └── RequirementContext.tsx
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Dashboard.tsx
│   │   ├── RequirementsList.tsx
│   │   ├── RequirementForm.tsx
│   │   └── RequirementDetail.tsx
│   ├── types/           # Definiciones de TypeScript
│   │   └── requirement.ts
│   ├── lib/             # Utilidades
│   │   └── utils.ts
│   └── App.tsx          # Componente principal
├── public/              # Archivos estáticos
└── package.json
```

## 🚀 Despliegue

### Build para producción

```bash
npm run build
# o
bun run build
```

### Preview del build

```bash
npm run preview
# o
bun preview
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Integración con API backend
- [ ] Autenticación y autorización
- [ ] Sistema de notificaciones
- [ ] Adjuntar archivos a requerimientos
- [ ] Chat interno por requerimiento
- [ ] Integración con sistemas GDS reales
- [ ] Reportes avanzados y analytics
- [ ] Modo offline

## 📄 Licencia

Este proyecto es privado y está destinado al uso interno de la organización.

## 👤 Autor

**Jose Gamez**
- GitHub: [@josgam09](https://github.com/josgam09)
- Email: jose.gamez@jetsmart.com

## 🙏 Agradecimientos

- Equipo de JetSmart
- Comunidad de React y shadcn/ui
- Lovable.dev por el proyecto base

---

**Manager GDS** - Gestión Eficiente de Requerimientos GDS
