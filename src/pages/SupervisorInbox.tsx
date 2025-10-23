import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RequirementsTable from '@/components/RequirementsTable';
import { Inbox, Home, AlertCircle, Clock } from 'lucide-react';

const SupervisorInbox = () => {
  const { user } = useAuth();
  const { requirements } = useRequirements();

  // Filtrar casos escalados a supervisor
  const escaladosASupervisor = useMemo(() => {
    return requirements.filter((req) => {
      return req.status === 'pendiente-supervisor';
    });
  }, [requirements]);

  // Estadísticas
  const stats = {
    total: escaladosASupervisor.length,
    criticos: escaladosASupervisor.filter(r => r.priority === 'critica').length,
    altos: escaladosASupervisor.filter(r => r.priority === 'alta').length,
    medios: escaladosASupervisor.filter(r => r.priority === 'media').length,
    bajos: escaladosASupervisor.filter(r => r.priority === 'baja').length,
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bandeja del Supervisor</h1>
          <p className="text-muted-foreground">
            Casos escalados que requieren atención del supervisor
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/requirements">
            <Button variant="outline" className="gap-2">
              <Inbox className="h-4 w-4" />
              Todos los Requerimientos
            </Button>
          </Link>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Escalados</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Casos pendientes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Críticos</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.criticos}</div>
            <p className="text-xs text-muted-foreground">
              Máxima prioridad
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alta Prioridad</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.altos}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Prioridad</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.medios}</div>
            <p className="text-xs text-muted-foreground">
              Atención normal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Baja Prioridad</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.bajos}</div>
            <p className="text-xs text-muted-foreground">
              Menor urgencia
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de casos escalados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Inbox className="h-5 w-5" />
            Casos Escalados al Supervisor
          </CardTitle>
        </CardHeader>
        <CardContent>
          {escaladosASupervisor.length > 0 ? (
            <RequirementsTable 
              requirements={escaladosASupervisor}
              title="Bandeja Supervisor"
              showFilters={true}
            />
          ) : (
            <div className="text-center py-12">
              <Inbox className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No hay casos escalados</h3>
              <p className="text-muted-foreground mb-4">
                No hay requerimientos pendientes de tu atención en este momento.
              </p>
              <div className="flex gap-2 justify-center">
                <Link to="/requirements">
                  <Button variant="outline">
                    Ver Todos los Requerimientos
                  </Button>
                </Link>
                <Link to="/requirements/new">
                  <Button>
                    Crear Nuevo Requerimiento
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorInbox;