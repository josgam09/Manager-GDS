import React from 'react';
import { useRequirements } from '@/contexts/RequirementContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, TrendingUp, Plus, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { requirements } = useRequirements();

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

  // Estadísticas principales
  const stats = {
    total: requirements.length,
    nuevo: requirements.filter(r => r.status === 'nuevo').length,
    enProceso: requirements.filter(r => r.status === 'en-proceso').length,
    pendienteSupervisor: requirements.filter(r => r.status === 'pendiente-supervisor').length,
    respuestaSupervisor: requirements.filter(r => r.status === 'respuesta-supervisor').length,
    pendienteOtraArea: requirements.filter(r => r.status === 'pendiente-otra-area').length,
    pendienteAgencia: requirements.filter(r => r.status === 'pendiente-agencia').length,
    respuestaAgencia: requirements.filter(r => r.status === 'respuesta-agencia').length,
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

  // Estadísticas por tipo de solicitud
  const tipoStats = {
    solicitudes: requirements.filter(r => r.tipoSolicitud === 'Solicitudes').length,
    reclamos: requirements.filter(r => r.tipoSolicitud === 'Reclamos').length,
  };

  // Estadísticas por soporte inglés
  const soporteIngles = requirements.filter(r => r.esSoporteIngles).length;

  // Estadísticas por país
  const paisStats = requirements.reduce((acc, req) => {
    const pais = req.pais || 'Sin país';
    acc[pais] = (acc[pais] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Requerimientos recientes (últimos 5)
  const recentRequirements = requirements
    .sort((a, b) => new Date(b.initialDate).getTime() - new Date(a.initialDate).getTime())
    .slice(0, 5);

  // Requerimientos críticos
  const requerimientosCriticos = requirements.filter(r => r.priority === 'critica');

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

      {/* Estadísticas principales */}
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

      {/* Estadísticas detalladas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Pendiente Agencia</span>
                </div>
                <span className="font-semibold">{stats.pendienteAgencia}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
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

        <Card>
          <CardHeader>
            <CardTitle>Tipo de Solicitud</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Solicitudes</span>
                </div>
                <span className="font-semibold">{tipoStats.solicitudes}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Reclamos</span>
                </div>
                <span className="font-semibold">{tipoStats.reclamos}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Prioridad Crítica</span>
                </div>
                <span className="font-semibold text-red-600">{stats.critica}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requerimientos críticos */}
      {requerimientosCriticos.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Requerimientos Críticos ({requerimientosCriticos.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requerimientosCriticos.slice(0, 3).map((requirement) => (
                <Link
                  key={requirement.id}
                  to={`/requirements/${requirement.id}`}
                  className="block p-3 rounded-lg border border-red-200 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                          {requirement.ticketNumber}
                        </span>
                        <Badge variant="destructive" className="text-xs">CRÍTICA</Badge>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {requirement.tipoSolicitud} - {requirement.motivo}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {requirement.solicitudCliente}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                      <div>{new Date(requirement.initialDate).toLocaleDateString('es-AR')}</div>
                      <div className="mt-1">
                        {calcularTiempoTranscurrido(new Date(requirement.initialDate))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {requerimientosCriticos.length > 3 && (
                <div className="text-center pt-2">
                  <Link to="/requirements">
                    <Button variant="outline" size="sm">
                      Ver todos los críticos ({requerimientosCriticos.length})
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requerimientos recientes */}
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
                      <Badge 
                        variant={requirement.priority === 'critica' ? 'destructive' : 'outline'} 
                        className="text-xs"
                      >
                        {requirement.priority}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">
                      {requirement.tipoSolicitud} - {requirement.motivo}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {requirement.solicitudCliente}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {requirement.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        PNR: {requirement.pnrTktLocalizador}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        País: {requirement.pais}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {requirement.nombreAsesor}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                    <div>{new Date(requirement.initialDate).toLocaleDateString('es-AR')}</div>
                    <div className="text-xs mt-1">
                      {requirement.horaIngresoCorreo}
                    </div>
                    <div className="text-xs mt-1 font-mono">
                      {calcularTiempoTranscurrido(
                        new Date(requirement.initialDate), 
                        requirement.resolvedAt ? new Date(requirement.resolvedAt) : undefined
                      )}
                    </div>
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