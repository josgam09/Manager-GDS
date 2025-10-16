import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RequirementStatusBadge from '@/components/RequirementStatusBadge';
import RequirementPriorityBadge from '@/components/RequirementPriorityBadge';
import GDSSystemBadge from '@/components/GDSSystemBadge';
import { Plus, Search, Download } from 'lucide-react';
import { RequirementStatus, RequirementPriority, GDSSystem } from '@/types/requirement';
import { toast } from 'sonner';

const RequirementsList = () => {
  const { requirements } = useRequirements();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<RequirementPriority | 'all'>('all');
  const [gdsFilter, setGdsFilter] = useState<GDSSystem | 'all'>('all');

  const filteredRequirements = useMemo(() => {
    return requirements.filter((requirement) => {
      const matchesSearch =
        requirement.title.toLowerCase().includes(search.toLowerCase()) ||
        requirement.requesterName.toLowerCase().includes(search.toLowerCase()) ||
        requirement.description.toLowerCase().includes(search.toLowerCase()) ||
        requirement.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
        requirement.organization.toLowerCase().includes(search.toLowerCase()) ||
        (requirement.affectedPNR && requirement.affectedPNR.toLowerCase().includes(search.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || requirement.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || requirement.priority === priorityFilter;
      const matchesGDS = gdsFilter === 'all' || requirement.gdsSystem === gdsFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesGDS;
    });
  }, [requirements, search, statusFilter, priorityFilter, gdsFilter]);

  const exportToCSV = () => {
    const headers = [
      'Ticket', 'Título', 'Tipo', 'Sistema GDS', 'Categoría', 'Solicitante', 
      'Email', 'Teléfono', 'Organización', 'Office ID', 'PCC', 'PNR Afectado',
      'Estado', 'Prioridad', 'Asignado a', 'Equipo', 'Fecha Inicial', 
      'Fecha SLA', 'Fecha Creación', 'Última Actualización'
    ];
    
    const rows = filteredRequirements.map(req => [
      req.ticketNumber,
      req.title,
      req.requirementType,
      req.gdsSystem,
      req.category,
      req.requesterName,
      req.requesterEmail,
      req.requesterPhone || '',
      req.organization || '',
      req.officeId || '',
      req.pcc || '',
      req.affectedPNR || '',
      req.status,
      req.priority,
      req.assignedTo || '',
      req.assignedTeam || '',
      new Date(req.initialDate).toLocaleDateString('es-AR'),
      req.slaDeadline ? new Date(req.slaDeadline).toLocaleDateString('es-AR') : '',
      new Date(req.createdAt).toLocaleString('es-AR'),
      new Date(req.updatedAt).toLocaleString('es-AR'),
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Requerimientos GDS</h1>
          <p className="text-muted-foreground mt-1">
            Administra y da seguimiento a todos los requerimientos GDS
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
            <Select value={gdsFilter} onValueChange={(value) => setGdsFilter(value as GDSSystem | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Sistema GDS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los sistemas</SelectItem>
                <SelectItem value="sabre">Sabre</SelectItem>
                <SelectItem value="amadeus">Amadeus</SelectItem>
                <SelectItem value="travelport">Travelport</SelectItem>
                <SelectItem value="sirena">Sirena</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                          {requirement.ticketNumber}
                        </span>
                        <h3 className="font-semibold">{requirement.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {requirement.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <RequirementStatusBadge status={requirement.status} />
                        <RequirementPriorityBadge priority={requirement.priority} />
                        <GDSSystemBadge system={requirement.gdsSystem} />
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{requirement.organization}</span>
                        {requirement.affectedPNR && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">PNR: {requirement.affectedPNR}</span>
                          </>
                        )}
                        {requirement.assignedTo && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">Asignado: {requirement.assignedTo}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                      <div>{new Date(requirement.initialDate).toLocaleDateString('es-AR')}</div>
                      <div className="text-xs mt-1">
                        {new Date(requirement.createdAt).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      {requirement.slaDeadline && (
                        <div className="text-xs mt-1 text-warning">
                          SLA: {new Date(requirement.slaDeadline).toLocaleDateString('es-AR')}
                        </div>
                      )}
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

