import React, { useState, useMemo } from 'react';
import { useRequirements } from '@/contexts/RequirementContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import RequirementStatusBadge from '@/components/RequirementStatusBadge';
import RequirementPriorityBadge from '@/components/RequirementPriorityBadge';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Plus, 
  Download,
  Search,
  Filter,
  Calendar,
  User,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Requirement, CasoOpcion, AreaEscalamiento } from '@/types/requirement';

// Tipos para filtros
type FiltroFecha = 'hoy' | 'esta-semana' | 'este-mes' | 'este-ano' | 'todas';
type EstadoFiltro = 'en-gestion' | 'escalados' | 'cerrados' | 'todos';
type PrioridadFiltro = 'critica' | 'alta' | 'media' | 'baja' | 'todas';

const Dashboard = () => {
  const { requirements } = useRequirements();
  
  // Estados para filtros
  const [filtroFecha, setFiltroFecha] = useState<FiltroFecha>('todas');
  const [filtroMotivo, setFiltroMotivo] = useState<string>('todos');
  const [filtroSubMotivo, setFiltroSubMotivo] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<EstadoFiltro>('todos');
  const [filtroArea, setFiltroArea] = useState<string>('todas');
  const [filtroPrioridad, setFiltroPrioridad] = useState<PrioridadFiltro>('todas');
  const [busqueda, setBusqueda] = useState<string>('');

  // Función para calcular tiempo transcurrido
  const calcularTiempoTranscurrido = (fechaInicio: Date, fechaFin?: Date) => {
    const ahora = fechaFin || new Date();
    const diffMs = ahora.getTime() - fechaInicio.getTime();
    const diffMinutos = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutos < 60) {
      return `${diffMinutos} min`;
    } else if (diffMinutos < 1440) {
      const horas = Math.floor(diffMinutos / 60);
      const minutos = diffMinutos % 60;
      return `${horas}h ${minutos}min`;
    } else {
      const dias = Math.floor(diffMinutos / 1440);
      const horas = Math.floor((diffMinutos % 1440) / 60);
      return `${dias}d ${horas}h`;
    }
  };

  // Función para obtener fechas según filtro
  const obtenerFechasFiltro = (filtro: FiltroFecha) => {
    const ahora = new Date();
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    
    switch (filtro) {
      case 'hoy':
        return { inicio: hoy, fin: new Date(hoy.getTime() + 24 * 60 * 60 * 1000) };
      case 'esta-semana':
        const lunes = new Date(hoy);
        lunes.setDate(hoy.getDate() - hoy.getDay() + 1);
        const domingo = new Date(lunes);
        domingo.setDate(lunes.getDate() + 6);
        domingo.setHours(23, 59, 59, 999);
        return { inicio: lunes, fin: domingo };
      case 'este-mes':
        const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
        const finMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0, 23, 59, 59, 999);
        return { inicio: inicioMes, fin: finMes };
      case 'este-ano':
        const inicioAno = new Date(ahora.getFullYear(), 0, 1);
        const finAno = new Date(ahora.getFullYear(), 11, 31, 23, 59, 59, 999);
        return { inicio: inicioAno, fin: finAno };
      default:
        return null;
    }
  };

  // Función para filtrar requerimientos
  const requerimientosFiltrados = useMemo(() => {
    let filtrados = [...requirements];

    // Filtro por fecha
    if (filtroFecha !== 'todas') {
      const fechas = obtenerFechasFiltro(filtroFecha);
      if (fechas) {
        filtrados = filtrados.filter(req => {
          const fechaReq = new Date(req.initialDate);
          return fechaReq >= fechas.inicio && fechaReq <= fechas.fin;
        });
      }
    }

    // Filtro por motivo
    if (filtroMotivo !== 'todos') {
      filtrados = filtrados.filter(req => req.motivo === filtroMotivo);
    }

    // Filtro por sub motivo
    if (filtroSubMotivo !== 'todos') {
      filtrados = filtrados.filter(req => req.subMotivo === filtroSubMotivo);
    }

    // Filtro por estado
    if (filtroEstado !== 'todos') {
      switch (filtroEstado) {
        case 'en-gestion':
          filtrados = filtrados.filter(req => 
            req.status === 'pendiente-agencia' || req.status === 'respuesta-agencia'
          );
          break;
        case 'escalados':
          filtrados = filtrados.filter(req => 
            req.status === 'pendiente-supervisor' || 
            req.status === 'pendiente-otra-area' || 
            req.status === 'respuesta-supervisor'
          );
          break;
        case 'cerrados':
          filtrados = filtrados.filter(req => req.status === 'cerrado');
          break;
      }
    }

    // Filtro por área
    if (filtroArea !== 'todas') {
      filtrados = filtrados.filter(req => req.areaEscalamiento === filtroArea);
    }

    // Filtro por prioridad
    if (filtroPrioridad !== 'todas') {
      filtrados = filtrados.filter(req => req.priority === filtroPrioridad);
    }

    // Filtro por búsqueda
    if (busqueda.trim()) {
      const termino = busqueda.toLowerCase();
      filtrados = filtrados.filter(req => 
        req.ticketNumber.toLowerCase().includes(termino) ||
        req.asuntoCorreoElectronico?.toLowerCase().includes(termino) ||
        req.pnrTktLocalizador?.toLowerCase().includes(termino) ||
        req.solicitudCliente.toLowerCase().includes(termino)
      );
    }

    return filtrados;
  }, [requirements, filtroFecha, filtroMotivo, filtroSubMotivo, filtroEstado, filtroArea, filtroPrioridad, busqueda]);

  // Estadísticas en tiempo real
  const estadisticas = useMemo(() => {
    const filtrados = requerimientosFiltrados;
    return {
      total: filtrados.length,
      enGestion: filtrados.filter(r => r.status === 'pendiente-agencia' || r.status === 'respuesta-agencia').length,
      escalados: filtrados.filter(r => 
        r.status === 'pendiente-supervisor' || 
        r.status === 'pendiente-otra-area' || 
        r.status === 'respuesta-supervisor'
      ).length,
      cerrados: filtrados.filter(r => r.status === 'cerrado').length,
    };
  }, [requerimientosFiltrados]);

  // Función para exportar CSV
  const exportarCSV = () => {
    const headers = [
      'Número Único',
      'Estado',
      'País',
      'Fecha Ingreso',
      'Hora Ingreso Correo',
      'Asunto',
      'Origen',
      'Tipo Claims',
      'Motivo',
      'Sub Motivo',
      'Asignado a',
      'Estado Final',
      'Prioridad',
      'PNR/TKT/Localizador',
      'Solicitud Cliente'
    ];

    const csvContent = [
      headers.join(','),
      ...requerimientosFiltrados.map(req => [
        req.ticketNumber,
        req.status,
        req.pais || '',
        new Date(req.initialDate).toLocaleDateString('es-AR'),
        calcularTiempoTranscurrido(new Date(req.initialDate), req.resolvedAt ? new Date(req.resolvedAt) : undefined),
        req.asuntoCorreoElectronico || '',
        req.origenConsulta,
        req.tipoSolicitud || '',
        req.motivo || '',
        req.subMotivo || '',
        req.nombreAsesor,
        req.status,
        req.priority,
        req.pnrTktLocalizador || '',
        req.solicitudCliente
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const fecha = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `dashboard_claims_${fecha}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Resetear sub motivo cuando cambia el motivo
  const handleMotivoChange = (nuevoMotivo: string) => {
    setFiltroMotivo(nuevoMotivo);
    setFiltroSubMotivo('todos');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard - Manager GDS</h1>
          <p className="text-muted-foreground mt-1">
            Gestión centralizada de requerimientos GDS
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportarCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
          <Link to="/requirements/new">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Nuevo Requerimiento
            </Button>
          </Link>
        </div>
      </div>

      {/* Estadísticas en tiempo real */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{estadisticas.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">En Gestión</p>
                <p className="text-2xl font-bold">{estadisticas.enGestion}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Escalados</p>
                <p className="text-2xl font-bold">{estadisticas.escalados}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Cerrados</p>
                <p className="text-2xl font-bold">{estadisticas.cerrados}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Filtro de fecha */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Filtro de Fecha</Label>
              <Select value={filtroFecha} onValueChange={(value: FiltroFecha) => setFiltroFecha(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoy">Hoy</SelectItem>
                  <SelectItem value="esta-semana">Esta Semana</SelectItem>
                  <SelectItem value="este-mes">Este Mes</SelectItem>
                  <SelectItem value="este-ano">Este Año</SelectItem>
                  <SelectItem value="todas">Todas las fechas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de motivo */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Motivo</Label>
              <Select value={filtroMotivo} onValueChange={handleMotivoChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los motivos</SelectItem>
                  <SelectItem value="Cambio de Status">Cambio de Status</SelectItem>
                  <SelectItem value="Certificado Médico">Certificado Médico</SelectItem>
                  <SelectItem value="Cambio de Nombre">Cambio de Nombre</SelectItem>
                  <SelectItem value="Facturación">Facturación</SelectItem>
                  <SelectItem value="Opcionales – Bundles">Opcionales – Bundles</SelectItem>
                  <SelectItem value="Política Comercial">Política Comercial</SelectItem>
                  <SelectItem value="Remisiones">Remisiones</SelectItem>
                  <SelectItem value="Devoluciones">Devoluciones</SelectItem>
                  <SelectItem value="Pagos">Pagos</SelectItem>
                  <SelectItem value="Check-In">Check-In</SelectItem>
                  <SelectItem value="Distribución">Distribución</SelectItem>
                  <SelectItem value="Alternativas">Alternativas</SelectItem>
                  <SelectItem value="BSP">BSP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de sub motivo */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Sub Motivo</Label>
              <Select 
                value={filtroSubMotivo} 
                onValueChange={(value) => setFiltroSubMotivo(value)}
                disabled={filtroMotivo === 'todos'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los sub motivos</SelectItem>
                  {/* Aquí se pueden agregar los sub motivos específicos según el motivo seleccionado */}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de estado */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Estado</Label>
              <Select value={filtroEstado} onValueChange={(value: EstadoFiltro) => setFiltroEstado(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="en-gestion">En Gestión</SelectItem>
                  <SelectItem value="escalados">Escalados</SelectItem>
                  <SelectItem value="cerrados">Cerrados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de área */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Área de Escalamiento</Label>
              <Select value={filtroArea} onValueChange={(value) => setFiltroArea(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las áreas</SelectItem>
                  <SelectItem value="Cobros Ato">Cobros Ato</SelectItem>
                  <SelectItem value="Sobreventa">Sobreventa</SelectItem>
                  <SelectItem value="Medios de pago">Medios de pago</SelectItem>
                  <SelectItem value="Facturación">Facturación</SelectItem>
                  <SelectItem value="Finanzas">Finanzas</SelectItem>
                  <SelectItem value="Área Comercial">Área Comercial</SelectItem>
                  <SelectItem value="Ventas">Ventas</SelectItem>
                  <SelectItem value="Área legal">Área legal</SelectItem>
                  <SelectItem value="Distribución">Distribución</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de prioridad */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Prioridad</Label>
              <Select value={filtroPrioridad} onValueChange={(value: PrioridadFiltro) => setFiltroPrioridad(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las prioridades</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Búsqueda */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Búsqueda</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Número, asunto, PNR..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Botón limpiar filtros */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold opacity-0">Limpiar</Label>
              <Button 
                variant="outline" 
                onClick={() => {
                  setFiltroFecha('todas');
                  setFiltroMotivo('todos');
                  setFiltroSubMotivo('todos');
                  setFiltroEstado('todos');
                  setFiltroArea('todas');
                  setFiltroPrioridad('todas');
                  setBusqueda('');
                }}
                className="w-full"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de requerimientos */}
      <Card>
        <CardHeader>
          <CardTitle>Tabla de Requerimientos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Mostrando {requerimientosFiltrados.length} de {requirements.length} requerimientos
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número Único</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>País</TableHead>
                  <TableHead>Fecha Ingreso</TableHead>
                  <TableHead>Hora Ingreso Correo</TableHead>
                  <TableHead>Asunto</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Tipo Claims</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Sub Motivo</TableHead>
                  <TableHead>Asignado a</TableHead>
                  <TableHead>Estado Final</TableHead>
                  <TableHead>Prioridad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requerimientosFiltrados.map((requirement) => (
                  <TableRow key={requirement.id}>
                    <TableCell>
                      <Link 
                        to={`/requirements/${requirement.id}`}
                        className="font-mono text-primary hover:underline"
                      >
                        {requirement.ticketNumber}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <RequirementStatusBadge status={requirement.status} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{requirement.pais || 'N/A'}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(requirement.initialDate).toLocaleDateString('es-AR')}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono">
                        {calcularTiempoTranscurrido(
                          new Date(requirement.initialDate), 
                          requirement.resolvedAt ? new Date(requirement.resolvedAt) : undefined
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {requirement.asuntoCorreoElectronico || 'Sin asunto'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{requirement.origenConsulta}</Badge>
                    </TableCell>
                    <TableCell>
                      {requirement.tipoSolicitud || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {requirement.motivo || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {requirement.subMotivo || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {requirement.nombreAsesor}
                      </div>
                    </TableCell>
                    <TableCell>
                      <RequirementStatusBadge status={requirement.status} />
                    </TableCell>
                    <TableCell>
                      <RequirementPriorityBadge priority={requirement.priority} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {requerimientosFiltrados.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron requerimientos con los filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;