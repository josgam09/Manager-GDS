import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import RequirementStatusBadge from '@/components/RequirementStatusBadge';
import RequirementPriorityBadge from '@/components/RequirementPriorityBadge';
import SupervisorActionPanel from '@/components/SupervisorActionPanel';
import { ArrowLeft, Mail, Phone, User, Calendar, Clock, Server, Building2, Home, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const RequirementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getRequirement, updateRequirement } = useRequirements();

  const requirement = id ? getRequirement(id) : undefined;
  
  const handleSupervisorAction = (
    action: 'autorizar_analista' | 'resolver_directo',
    respuesta: string,
    informacionBrindada?: string
  ) => {
    if (!requirement || !user) return;

    const updates: any = {
      respuestaSupervisor: respuesta,
      accionSupervisor: action,
      updatedAt: new Date(),
      history: [
        ...requirement.history,
        {
          id: Date.now().toString(),
          date: new Date(),
          action: action === 'autorizar_analista' 
            ? 'Supervisor autorizó al analista para resolver' 
            : 'Supervisor resolvió el caso directamente',
          user: user.name,
          comment: respuesta,
        },
      ],
    };

    if (action === 'autorizar_analista') {
      updates.status = 'en-proceso';
      updates.assignedTo = requirement.nombreAsesor;
    } else {
      updates.status = 'resuelto';
      updates.informacionBrindada = informacionBrindada || '';
      updates.supervisorResolvio = true;
      updates.resolvedAt = new Date();
      updates.assignedTo = user.name;
    }

    updateRequirement(requirement.id, updates);
    
    toast.success(
      action === 'autorizar_analista'
        ? 'Caso autorizado. El analista puede proceder.'
        : 'Caso resuelto exitosamente'
    );
    
    if (action === 'resolver_directo') {
      setTimeout(() => navigate('/supervisor/inbox'), 2000);
    }
  };

  if (!requirement) {
    return (
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Inicio
          </Button>
          <Button onClick={() => navigate('/requirements')} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a Requerimientos
          </Button>
        </div>
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Requerimiento no encontrado</p>
              <Button onClick={() => navigate('/')}>Volver al Inicio</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Inicio
          </Button>
          <Button onClick={() => navigate('/requirements')} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a Requerimientos
          </Button>
        </div>
        {user && ['ADMINISTRADOR', 'ANALISTA', 'SUPERVISOR'].includes(user.role) && (
          <Link to={`/requirements/${requirement.id}/edit`}>
            <Button>Editar Requerimiento</Button>
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="font-mono">
                      {requirement.ticketNumber}
                    </Badge>
                    <Badge variant="outline">
                      {requirement.origenConsulta}
                    </Badge>
                    {requirement.esSoporteIngles && (
                      <Badge variant="secondary">Soporte Inglés</Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">
                    {requirement.tipoSolicitud || requirement.reclamoIncidente || 'Requerimiento GDS'}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <RequirementStatusBadge status={requirement.status} />
                    <RequirementPriorityBadge priority={requirement.priority} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">PNR - TKT - Localizador</h3>
                  <p className="text-muted-foreground font-mono">{requirement.pnrTktLocalizador}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Canal de Consulta</h3>
                  <p className="text-muted-foreground">{requirement.canalConsulta}</p>
                </div>
              </div>

              {requirement.tipoSolicitud && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Tipo de Solicitud</h3>
                    <p className="text-muted-foreground">{requirement.tipoSolicitud}</p>
                  </div>
                </>
              )}

              {requirement.reclamoIncidente && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Reclamo / Incidente</h3>
                    <p className="text-muted-foreground">{requirement.reclamoIncidente}</p>
                  </div>
                </>
              )}

              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Solicitud del Cliente</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{requirement.solicitudCliente}</p>
              </div>

              {requirement.informacionBrindada && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Información Brindada</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{requirement.informacionBrindada}</p>
                  </div>
                </>
              )}

              {requirement.observaciones && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Observaciones</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{requirement.observaciones}</p>
                  </div>
                </>
              )}

              {/* Información de Escalamiento */}
              {!requirement.puedeEntregarInformacion && (
                <>
                  <Separator />
                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      Caso Escalado
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Motivo:</strong> El analista no pudo entregar la información requerida
                      </p>
                      <p>
                        <strong>Escalado a:</strong>{' '}
                        <Badge variant={requirement.escaladoA === 'SUPERVISOR' ? 'default' : 'secondary'}>
                          {requirement.escaladoA === 'SUPERVISOR' ? 'SUPERVISOR' : `OTRA ÁREA: ${requirement.nombreAreaEscalamiento}`}
                        </Badge>
                      </p>
                      <p className="text-muted-foreground italic">
                        Este caso requiere atención de {requirement.escaladoA === 'SUPERVISOR' ? 'un supervisor' : `el área de ${requirement.nombreAreaEscalamiento}`}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Panel de Acción del Supervisor */}
          {user && ['SUPERVISOR', 'ADMINISTRADOR'].includes(user.role) && 
           requirement.status === 'pendiente-supervisor' && (
            <SupervisorActionPanel
              requirement={requirement}
              onAction={handleSupervisorAction}
            />
          )}

          <Card>
            <CardHeader>
              <CardTitle>Historial de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requirement.history.map((entry, index) => (
                  <div key={entry.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      {index < requirement.history.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold">{entry.action}</p>
                          <p className="text-sm text-muted-foreground">por {entry.user}</p>
                          {entry.comment && (
                            <p className="text-sm text-muted-foreground mt-1">{entry.comment}</p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(entry.date).toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Solicitante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Asesor</p>
                  <p className="font-medium">{requirement.nombreAsesor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium break-all">{requirement.correoElectronico}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles del Requerimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Hora de Ingreso</p>
                  <p className="font-medium">{requirement.horaIngresoCorreo}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha del Requerimiento</p>
                  <p className="font-medium">
                    {new Date(requirement.initialDate).toLocaleString('es-AR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Creación</p>
                  <p className="font-medium">
                    {new Date(requirement.createdAt).toLocaleString('es-AR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Última Actualización</p>
                  <p className="font-medium">
                    {new Date(requirement.updatedAt).toLocaleString('es-AR')}
                  </p>
                </div>
              </div>
              {requirement.slaDeadline && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha Límite SLA</p>
                    <p className="font-medium text-warning">
                      {new Date(requirement.slaDeadline).toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>
              )}
              {requirement.assignedTo && (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Asignado a</p>
                    <p className="font-medium">{requirement.assignedTo}</p>
                  </div>
                </div>
              )}
              {requirement.assignedTeam && (
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Equipo Asignado</p>
                    <p className="font-medium">{requirement.assignedTeam}</p>
                  </div>
                </div>
              )}
              {requirement.resolvedAt && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Resolución</p>
                    <p className="font-medium text-success">
                      {new Date(requirement.resolvedAt).toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequirementDetail;
