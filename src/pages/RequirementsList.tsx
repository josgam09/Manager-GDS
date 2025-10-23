import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RequirementStatusBadge from '@/components/RequirementStatusBadge';
import RequirementPriorityBadge from '@/components/RequirementPriorityBadge';
import { Plus, Search, Download, Home, User, Clock, MapPin } from 'lucide-react';
import { RequirementStatus, RequirementPriority, OrigenConsulta } from '@/types/requirement';
import { toast } from 'sonner';

const RequirementsList = () => {
  const { requirements } = useRequirements();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<RequirementPriority | 'all'>('all');
  const [origenFilter, setOrigenFilter] = useState<OrigenConsulta | 'all'>('all');
  const [tipoFilter, setTipoFilter] = useState<'Solicitudes' | 'Reclamos' | 'all'>('all');

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

  const filteredRequirements = useMemo(() => {
    if (!requirements || !Array.isArray(requirements)) {
      return [];
    }

    return requirements.filter((requirement) => {
      // Búsqueda segura
      const searchTerm = search.toLowerCase();
      const matchesSearch = 
        (requirement.nombreAsesor && requirement.nombreAsesor.toLowerCase().includes(searchTerm)) ||
        (requirement.solicitudCliente && requirement.solicitudCliente.toLowerCase().includes(searchTerm)) ||
        (requirement.ticketNumber && requirement.ticketNumber.toLowerCase().includes(searchTerm)) ||
        (requirement.pnrTktLocalizador && requirement.pnrTktLocalizador.toLowerCase().includes(searchTerm)) ||
        (requirement.correoElectronico && requirement.correoElectronico.toLowerCase().includes(searchTerm)) ||
        (requirement.tipoSolicitud && requirement.tipoSolicitud.toLowerCase().includes(searchTerm)) ||
        (requirement.asuntoCorreoElectronico && requirement.asuntoCorreoElectronico.toLowerCase().includes(searchTerm)) ||
        (requirement.motivo && requirement.motivo.toLowerCase().includes(searchTerm)) ||
        (requirement.subMotivo && requirement.subMotivo.toLowerCase().includes(searchTerm));
      
      const matchesStatus = statusFilter === 'all' || requirement.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || requirement.priority === priorityFilter;
      const matchesOrigen = origenFilter === 'all' || requirement.origenConsulta === origenFilter;
      const matchesTipo = tipoFilter === 'all' || requirement.tipoSolicitud === tipoFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesOrigen && matchesTipo;
    });
  }, [requirements, search, statusFilter, priorityFilter, origenFilter, tipoFilter]);

  const exportToCSV = () => {
    if (!filteredRequirements || filteredRequirements.length === 0) {
      toast.error('No hay datos para exportar');
      return;
    }

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
      'Solicitud Cliente',
      'Información Brindada',
      'Observaciones'
    ];
    
    const rows = filteredRequirements.map(req => [
      req.ticketNumber || '',
      req.status || '',
      req.pais || '',
      req.initialDate ? new Date(req.initialDate).toLocaleDateString('es-AR') : '',
      calcularTiempoTranscurrido(
        req.initialDate ? new Date(req.initialDate) : new Date(), 
        req.resolvedAt ? new Date(req.resolvedAt) : undefined
      ),
      req.asuntoCorreoElectronico || '',
      req.origenConsulta || '',
      req.tipoSolicitud || '',
      req.motivo || '',
      req.subMotivo || '',
      req.nombreAsesor || '',
      req.status || '',
      req.priority || '',
      req.pnrTktLocalizador || '',
      req.solicitudCliente || '',
      req.informacionBrindada || '',
      req.observaciones || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `requerimientos_gds_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Archivo CSV descargado exitosamente');
  };

  // Verificación de datos
  if (!requirements) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Requerimientos GDS</h1>
            <p className="text-muted-foreground mt-1">
              Administra y da seguimiento a todos los requerimientos
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              Cargando requerimientos...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex gap-2 mb-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Inicio
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Requerimientos GDS</h1>
          <p className="text-muted-foreground mt-1">
            Administra y da seguimiento a todos los requerimientos
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
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

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar requerimientos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as RequirementStatus | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="nuevo">Nuevo</SelectItem>
                <SelectItem value="en-proceso">En Proceso</SelectItem>
                <SelectItem value="pendiente-informacion">Pendiente Info</SelectItem>
                <SelectItem value="pendiente-supervisor">Pendiente Supervisor</SelectItem>
                <SelectItem value="respuesta-supervisor">Respuesta Supervisor</SelectItem>
                <SelectItem value="pendiente-otra-area">Pendiente Otra Área</SelectItem>
                <SelectItem value="pendiente-agencia">Pendiente Agencia</SelectItem>
                <SelectItem value="respuesta-agencia">Respuesta Agencia</SelectItem>
                <SelectItem value="resuelto">Resuelto</SelectItem>
                <SelectItem value="cerrado">Cerrado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as RequirementPriority | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="critica">Crítica</SelectItem>
              </SelectContent>
            </Select>
            <Select value={origenFilter} onValueChange={(value) => setOrigenFilter(value as OrigenConsulta | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Origen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los orígenes</SelectItem>
                <SelectItem value="AMADEUS">AMADEUS</SelectItem>
                <SelectItem value="NO CORRESPONDE">NO CORRESPONDE</SelectItem>
                <SelectItem value="SABRE">SABRE</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tipoFilter} onValueChange={(value) => setTipoFilter(value as 'Solicitudes' | 'Reclamos' | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="Solicitudes">Solicitudes</SelectItem>
                <SelectItem value="Reclamos">Reclamos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de requerimientos */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Tabla de Requerimientos</CardTitle>
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredRequirements.length} de {requirements.length} requerimientos
            </p>
          </div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequirements.map((requirement) => (
                  <TableRow key={requirement.id}>
                    <TableCell>
                      <Link 
                        to={`/requirements/${requirement.id}`}
                        className="font-mono text-primary hover:underline"
                      >
                        {requirement.ticketNumber || 'Sin ticket'}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <RequirementStatusBadge status={requirement.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <Badge variant="outline">{requirement.pais || 'N/A'}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {requirement.initialDate 
                        ? new Date(requirement.initialDate).toLocaleDateString('es-AR')
                        : 'Sin fecha'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-mono">
                          {calcularTiempoTranscurrido(
                            requirement.initialDate ? new Date(requirement.initialDate) : new Date(), 
                            requirement.resolvedAt ? new Date(requirement.resolvedAt) : undefined
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {requirement.asuntoCorreoElectronico || 'Sin asunto'}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{requirement.origenConsulta || 'N/A'}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={requirement.tipoSolicitud === 'Reclamos' ? 'destructive' : 'default'}>
                        {requirement.tipoSolicitud || 'N/A'}
                      </Badge>
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
                        {requirement.nombreAsesor || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <RequirementStatusBadge status={requirement.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredRequirements.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {requirements.length === 0 
                  ? 'No hay requerimientos disponibles' 
                  : 'No se encontraron requerimientos con los filtros aplicados'
                }
              </p>
              {requirements.length === 0 && (
                <Link to="/requirements/new">
                  <Button className="mt-4">Crear Primer Requerimiento</Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequirementsList;