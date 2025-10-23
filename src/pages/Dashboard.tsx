import React from 'react';
import { useRequirements } from '@/contexts/RequirementContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { requirements } = useRequirements();

  const stats = {
    total: requirements.length,
    nuevo: requirements.filter(r => r.status === 'nuevo').length,
    enProceso: requirements.filter(r => r.status === 'en-proceso').length,
    pendienteSupervisor: requirements.filter(r => r.status === 'pendiente-supervisor').length,
    respuestaSupervisor: requirements.filter(r => r.status === 'respuesta-supervisor').length,
    pendienteOtraArea: requirements.filter(r => r.status === 'pendiente-otra-area').length,
    resuelto: requirements.filter(r => r.status === 'resuelto').length,
    cerrado: requirements.filter(r => r.status === 'cerrado').length,
    critica: requirements.filter(r => r.priority === 'critica').length,
  };

  // Estadísticas por origen de consulta
  const origenStats = {
    amadeus: requirements.filter(r => r.origenConsulta === 'AMADEUS').length,
    noCorresponde: requirements.filter(r => r.origenConsulta === 'NO CORRESPONDE').length,
    sabre: requirements.filter(r => r.origenConsulta === 'SABRE').length,
  };

  // Estadísticas por soporte inglés
  const soporteIngles = requirements.filter(r => r.esSoporteIngles).length;

  const recentRequirements = requirements.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard - Manager GDS</h1>
          <p className="text-muted-foreground mt-1">
            Gestión centralizada de requerimientos GDS
          </p>
        </div>
        <Link to="/requirements/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Nuevo Requerimiento
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">En Proceso</p>
                <p className="text-2xl font-bold">{stats.enProceso}</p>
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
                <p className="text-2xl font-bold">{stats.pendienteSupervisor + stats.pendienteOtraArea}</p>
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
                <p className="text-2xl font-bold">{stats.cerrado}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Requerimientos por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm">Nuevos</span>
                </div>
                <span className="font-semibold">{stats.nuevo}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-sm">En Proceso</span>
                </div>
                <span className="font-semibold">{stats.enProceso}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Pendiente Supervisor</span>
                </div>
                <span className="font-semibold">{stats.pendienteSupervisor}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Respuesta Supervisor</span>
                </div>
                <span className="font-semibold">{stats.respuestaSupervisor}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Pendiente Otra Área</span>
                </div>
                <span className="font-semibold">{stats.pendienteOtraArea}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-sm">Cerrados</span>
                </div>
                <span className="font-semibold">{stats.cerrado}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Origen de Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">AMADEUS</span>
                </div>
                <span className="font-semibold">{origenStats.amadeus}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="text-sm">No Corresponde</span>
                </div>
                <span className="font-semibold">{origenStats.noCorresponde}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">SABRE</span>
                </div>
                <span className="font-semibold">{origenStats.sabre}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Soporte Inglés</span>
                </div>
                <span className="font-semibold">{soporteIngles}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Requerimientos Recientes</CardTitle>
          <Link to="/requirements">
            <Button variant="outline" size="sm">Ver Todos</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequirements.map((requirement) => (
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
                      <Badge variant="outline" className="text-xs">
                        {requirement.origenConsulta}
                      </Badge>
                      {requirement.esSoporteIngles && (
                        <Badge variant="secondary" className="text-xs">EN</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{requirement.tipoSolicitud || 'Sin clasificar'}</h3>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {requirement.solicitudCliente}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {requirement.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {requirement.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        PNR: {requirement.pnrTktLocalizador}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Asesor: {requirement.nombreAsesor}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(requirement.initialDate).toLocaleDateString('es-AR')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;