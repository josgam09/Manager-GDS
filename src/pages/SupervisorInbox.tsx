import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { useAuth } from '@/contexts/AuthContext';
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
import { Inbox, Search, Home, AlertCircle, Clock } from 'lucide-react';
import { RequirementPriority } from '@/types/requirement';

const SupervisorInbox = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { requirements } = useRequirements();
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<RequirementPriority | 'all'>('all');

  // Filtrar casos escalados a supervisor
  const escaladosASupervisor = useMemo(() => {
    return requirements.filter((req) => {
      const esEscaladoSupervisor = req.status === 'pendiente-supervisor';
      const matchesSearch = search
        ? req.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
          req.nombreAsesor.toLowerCase().includes(search.toLowerCase()) ||
          req.solicitudCliente.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesPriority = priorityFilter === 'all' || req.priority === priorityFilter;

      return esEscaladoSupervisor && matchesSearch && matchesPriority;
    });
  }, [requirements, search, priorityFilter]);

  // Estadísticas
  const stats = {
    total: escaladosASupervisor.length,
    criticos: escaladosASupervisor.filter(r => r.priority === 'critica').length,
    altos: escaladosASupervisor.filter(r => r.priority === 'alta').length,
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
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Inbox className="h-8 w-8 text-orange-600" />
            Bandeja de Supervisor
          </h1>
          <p className="text-muted-foreground mt-1">
            Casos escalados que requieren tu atención
          </p>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              Prioridad Crítica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{stats.criticos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              Prioridad Alta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{stats.altos}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ticket, asesor o solicitud..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as RequirementPriority | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="critica">Crítica</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de casos */}
      <Card>
        <CardHeader>
          <CardTitle>Casos Pendientes ({escaladosASupervisor.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {escaladosASupervisor.length === 0 ? (
              <div className="text-center py-12">
                <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg font-semibold">
                  ¡Excelente! No hay casos pendientes
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Todos los casos escalados han sido atendidos
                </p>
              </div>
            ) : (
              escaladosASupervisor.map((requirement) => (
                <Link
                  key={requirement.id}
                  to={`/requirements/${requirement.id}`}
                  className="block p-4 rounded-lg border-2 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 hover:bg-orange-100/50 dark:hover:bg-orange-900/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded">
                          {requirement.ticketNumber}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {requirement.origenConsulta}
                        </Badge>
                        <Badge variant="destructive" className="text-xs">
                          ESCALADO
                        </Badge>
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
                        <span className="text-muted-foreground">Escalado por: {requirement.nombreAsesor}</span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                      <div>{new Date(requirement.createdAt).toLocaleDateString('es-AR')}</div>
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

export default SupervisorInbox;







