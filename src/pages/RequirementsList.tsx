import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RequirementStatusBadge from '@/components/RequirementStatusBadge';
import RequirementPriorityBadge from '@/components/RequirementPriorityBadge';
import { Plus, Search, Download, Home } from 'lucide-react';
import { RequirementStatus, RequirementPriority, OrigenConsulta } from '@/types/requirement';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const RequirementsList = () => {
  const navigate = useNavigate();
  const { requirements } = useRequirements();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<RequirementPriority | 'all'>('all');
  const [origenFilter, setOrigenFilter] = useState<OrigenConsulta | 'all'>('all');

  const filteredRequirements = useMemo(() => {
    return requirements.filter((requirement) => {
      const matchesSearch =
        requirement.nombreAsesor.toLowerCase().includes(search.toLowerCase()) ||
        requirement.solicitudCliente.toLowerCase().includes(search.toLowerCase()) ||
        requirement.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
        requirement.pnrTktLocalizador.toLowerCase().includes(search.toLowerCase()) ||
        requirement.correoElectronico.toLowerCase().includes(search.toLowerCase()) ||
        (requirement.tipoSolicitud && requirement.tipoSolicitud.toLowerCase().includes(search.toLowerCase())) ||
        (requirement.reclamoIncidente && requirement.reclamoIncidente.toLowerCase().includes(search.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || requirement.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || requirement.priority === priorityFilter;
      const matchesOrigen = origenFilter === 'all' || requirement.origenConsulta === origenFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesOrigen;
    });
  }, [requirements, search, statusFilter, priorityFilter, origenFilter]);

  const exportToCSV = () => {
    const headers = [
      'Ticket', 'Asesor', 'Origen', 'Soporte Inglés', 'Hora Ingreso',
      'PNR/TKT/Localizador', 'Email', 'Tipo Solicitud', 'Reclamo/Incidente',
      'Solicitud Cliente', 'Información Brindada', 'Observaciones',
      'Estado', 'Prioridad', 'Asignado a', 'Equipo', 'Fecha'
    ];
    
    const rows = filteredRequirements.map(req => [
      req.ticketNumber,
      req.nombreAsesor,
      req.origenConsulta,
      req.esSoporteIngles ? 'Sí' : 'No',
      req.horaIngresoCorreo,
      req.pnrTktLocalizador,
      req.correoElectronico,
      req.tipoSolicitud || '',
      req.reclamoIncidente || '',
      req.solicitudCliente,
      req.informacionBrindada || '',
      req.observaciones || '',
      req.status,
      req.priority,
      req.assignedTo || '',
      req.assignedTeam || '',
      new Date(req.initialDate).toLocaleDateString('es-AR'),
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex gap-2 mb-2">
            <Button onClick={() => navigate('/')} variant="outline" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Inicio
            </Button>
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
          <div className="grid gap-4 md:grid-cols-4">
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Requerimientos ({filteredRequirements.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredRequirements.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron requerimientos</p>
                <Link to="/requirements/new">
                  <Button className="mt-4">Crear Primer Requerimiento</Button>
                </Link>
              </div>
            ) : (
              filteredRequirements.map((requirement) => (
                <Link
                  key={requirement.id}
                  to={`/requirements/${requirement.id}`}
                  className="block p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                          {requirement.ticketNumber}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {requirement.origenConsulta}
                        </Badge>
                        {requirement.esSoporteIngles && (
                          <Badge variant="secondary" className="text-xs">EN</Badge>
                        )}
                      </div>
                      <h3 className="font-semibold mb-1">
                        {requirement.tipoSolicitud || requirement.reclamoIncidente || 'Requerimiento GDS'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {requirement.solicitudCliente}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <RequirementStatusBadge status={requirement.status} />
                        <RequirementPriorityBadge priority={requirement.priority} />
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">PNR: {requirement.pnrTktLocalizador}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">Asesor: {requirement.nombreAsesor}</span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                      <div>{new Date(requirement.initialDate).toLocaleDateString('es-AR')}</div>
                      <div className="text-xs mt-1">
                        {requirement.horaIngresoCorreo}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequirementsList;
