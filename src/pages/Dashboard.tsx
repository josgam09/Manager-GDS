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
    <div className="space-y-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Manager GDS</h1>
          <p className="text-sm text-muted-foreground">
            Panel de control y gestión de requerimientos
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/requirements/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Requerimiento
            </Button>
          </Link>
          <Link to="/requirements">
            <Button variant="outline" size="sm" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Ver Todos
            </Button>
          </Link>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="ml-3">
                <p className="text-xs font-medium text-muted-foreground">Total</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-muted-foreground">En Gestión</p>
                <p className="text-xl font-bold text-blue-600">{stats.enGestion}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-muted-foreground">Escalados</p>
                <p className="text-xl font-bold text-orange-600">{stats.escalados}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="ml-3">
                <p className="text-xs font-medium text-muted-foreground">Cerrados</p>
                <p className="text-xl font-bold text-green-600">{stats.cerrados}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas secundarias */}
      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Por Origen</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">AMADEUS</span>
                <Badge variant="default" className="text-xs">{origenStats.amadeus}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">SABRE</span>
                <Badge variant="secondary" className="text-xs">{origenStats.sabre}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">NO CORRESPONDE</span>
                <Badge variant="outline" className="text-xs">{origenStats.noCorresponde}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Por Tipo</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Solicitudes</span>
                <Badge variant="outline" className="text-xs">{tipoStats.solicitudes}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Reclamos</span>
                <Badge variant="outline" className="text-xs">{tipoStats.reclamos}</Badge>
              </div>
              <div className="flex items-center justify-between pt-1 border-t">
                <span className="text-xs font-medium">Críticos</span>
                <Badge variant="destructive" className="text-xs">{stats.critica}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <Link to="/requirements" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <BarChart3 className="h-3 w-3" />
                  Ver Todos
                </Button>
              </Link>
              <Link to="/requirements/new" className="block">
                <Button size="sm" className="w-full justify-start gap-2">
                  <Plus className="h-3 w-3" />
                  Nuevo Caso
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de requerimientos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Requerimientos Recientes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RequirementsTable 
            requirements={requirements.slice(0, 8)}
            title=""
            showFilters={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;