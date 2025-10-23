import React from 'react';
import { useRequirements } from '@/contexts/RequirementContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RequirementsTable from '@/components/RequirementsTable';
import { AlertCircle, CheckCircle, Clock, TrendingUp, Plus, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { requirements } = useRequirements();

  // Estadísticas principales
  const stats = {
    total: requirements.length,
    enGestion: requirements.filter(r => 
      ['nuevo', 'en-proceso', 'pendiente-informacion', 'respuesta-agencia'].includes(r.status)
    ).length,
    escalados: requirements.filter(r => 
      ['pendiente-supervisor', 'pendiente-otra-area', 'pendiente-agencia'].includes(r.status)
    ).length,
    cerrados: requirements.filter(r => 
      ['resuelto', 'cerrado'].includes(r.status)
    ).length,
    critica: requirements.filter(r => r.priority === 'critica').length,
  };

  // Estadísticas por origen de consulta
  const origenStats = {
    amadeus: requirements.filter(r => r.origenConsulta === 'AMADEUS').length,
    sabre: requirements.filter(r => r.origenConsulta === 'SABRE').length,
    noCorresponde: requirements.filter(r => r.origenConsulta === 'NO CORRESPONDE').length,
  };

  // Estadísticas por tipo de solicitud
  const tipoStats = {
    solicitudes: requirements.filter(r => r.tipoSolicitud === 'Solicitudes').length,
    reclamos: requirements.filter(r => r.tipoSolicitud === 'Reclamos').length,
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Manager GDS</h1>
          <p className="text-muted-foreground">
            Panel de control y gestión de requerimientos
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/requirements/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Requerimiento
            </Button>
          </Link>
          <Link to="/requirements">
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Ver Todos
            </Button>
          </Link>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requerimientos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Todos los casos registrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Gestión</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.enGestion}</div>
            <p className="text-xs text-muted-foreground">
              Casos activos en proceso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalados</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.escalados}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención especial
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cerrados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.cerrados}</div>
            <p className="text-xs text-muted-foreground">
              Casos resueltos exitosamente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas secundarias */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Por Origen de Consulta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">AMADEUS</span>
              <Badge variant="default">{origenStats.amadeus}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SABRE</span>
              <Badge variant="secondary">{origenStats.sabre}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">NO CORRESPONDE</span>
              <Badge variant="outline">{origenStats.noCorresponde}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Por Tipo de Solicitud</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Solicitudes</span>
              <Badge variant="outline">{tipoStats.solicitudes}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Reclamos</span>
              <Badge variant="outline">{tipoStats.reclamos}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prioridad Crítica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.critica}</div>
              <p className="text-sm text-muted-foreground">
                Casos de máxima prioridad
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de requerimientos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Listado de Requerimientos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RequirementsTable 
            requirements={requirements}
            title="Dashboard - Requerimientos"
            showFilters={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;