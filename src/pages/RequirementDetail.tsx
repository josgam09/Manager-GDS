import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import RequirementStatusBadge from '@/components/RequirementStatusBadge';
import RequirementPriorityBadge from '@/components/RequirementPriorityBadge';
import SupervisorActionPanel from '@/components/SupervisorActionPanel';
import { ArrowLeft, Mail, Phone, User, Calendar, Clock, Server, Building2, Home, AlertTriangle, CheckCircle2, MessageSquareText, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const RequirementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getRequirement, updateRequirement } = useRequirements();
  const [respuestaAgencia, setRespuestaAgencia] = useState('');
  const [showAgencyResponseForm, setShowAgencyResponseForm] = useState(false);

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
      updates.status = 'respuesta-supervisor';
      updates.assignedTo = requirement.nombreAsesor;
    } else {
      updates.status = 'cerrado';
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

  const handleAgencyResponse = () => {
    if (!requirement || !user || !respuestaAgencia.trim()) {
      toast.error('Por favor, ingresa la respuesta de la agencia');
      return;
    }

    const newInteraction = {
      id: Date.now().toString(),
      fecha: new Date(),
      consulta: requirement.consultaAgencia || 'Consulta realizada a la agencia',
      respuesta: respuestaAgencia.trim(),
      usuario: user.name,
    };

    const updates = {
      respuestaAgencia: respuestaAgencia.trim(),
      historialInteraccionAgencia: [
        ...(requirement.historialInteraccionAgencia || []),
        newInteraction,
      ],
      status: 'respuesta-agencia',
      updatedAt: new Date(),
      history: [
        ...requirement.history,
        {
          id: Date.now().toString(),
          date: new Date(),
          action: 'Respuesta de agencia recibida',
          user: user.name,
          comment: `Respuesta: ${respuestaAgencia.trim()}`,
        },
      ],
    };

    updateRequirement(requirement.id, updates);
    setRespuestaAgencia('');
    setShowAgencyResponseForm(false);
    
    toast.success('Respuesta de agencia registrada. Ahora puedes evaluar si tienes la información para resolver el caso.');
  };

  const handleRestartCaseManagement = () => {
    if (!requirement || !user) return;

    const updates = {
      casoOpcion: 'SI_CERRAR_CASO', // Reiniciar a la opción de cerrar caso
      status: 'nuevo', // Volver a estado nuevo para nueva evaluación
      updatedAt: new Date(),
      history: [
        ...requirement.history,
        {
          id: Date.now().toString(),
          date: new Date(),
          action: 'Flujo de gestión reiniciado - Nueva evaluación',
          user: user.name,
          comment: 'El caso ha sido reiniciado para nueva evaluación después de recibir respuesta de agencia',
        },
      ],
    };

    updateRequirement(requirement.id, updates);
    
    toast.success('Flujo de gestión reiniciado. Ahora puedes evaluar nuevamente si tienes la información para resolver el caso.');
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
                    {requirement.tipoSolicitud || 'Requerimiento GDS'}
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
                  <h3 className="font-semibold mb-2">País</h3>
                  <p className="text-muted-foreground">{requirement.pais}</p>
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

              {requirement.motivo && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Motivo</h3>
                    <p className="text-muted-foreground">{requirement.motivo}</p>
                  </div>
                </>
              )}

              {requirement.subMotivo && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Sub Motivo</h3>
                    <p className="text-muted-foreground">{requirement.subMotivo}</p>
                  </div>
                </>
              )}

              {requirement.asuntoCorreoElectronico && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Asunto del Correo</h3>
                    <p className="text-muted-foreground">{requirement.asuntoCorreoElectronico}</p>
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

              {/* Sección de Interacción con Agencia */}
              {requirement.casoOpcion === 'NO_INTERACTUAR_AGENCIA' && (
                <>
                  <Separator />
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border-2 border-orange-500/50">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-orange-700 dark:text-orange-400">
                      <MessageSquareText className="h-5 w-5" />
                      Interacción con Agencia
                    </h3>
                    
                    {/* Estado actual */}
                    {requirement.respuestaAgencia ? (
                      <div className="mb-4 p-3 bg-white dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                        <p className="text-sm font-semibold mb-2">📥 Respuesta de la agencia:</p>
                        <p className="whitespace-pre-wrap text-sm">{requirement.respuestaAgencia}</p>
                      </div>
                    ) : (
                      <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                        <p className="text-sm font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
                          ⏳ Pendiente de respuesta de la agencia
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Una vez que recibas la respuesta, podrás evaluar si tienes la información necesaria para resolver el caso.
                        </p>
                      </div>
                    )}

                    {/* Botón para actualizar respuesta */}
                    {!requirement.respuestaAgencia && user && ['ANALISTA', 'SUPERVISOR', 'ADMINISTRADOR'].includes(user.role) && (
                      <div className="space-y-3">
                        {!showAgencyResponseForm ? (
                          <Button 
                            onClick={() => setShowAgencyResponseForm(true)} 
                            className="gap-2"
                          >
                            <Send className="h-4 w-4" />
                            Actualizar: Respuesta de Agencia Recibida
                          </Button>
                        ) : (
                          <div className="space-y-3">
                            <Label htmlFor="respuestaAgencia">Respuesta de la Agencia *</Label>
                            <Textarea
                              id="respuestaAgencia"
                              value={respuestaAgencia}
                              onChange={(e) => setRespuestaAgencia(e.target.value)}
                              placeholder="Ingresa la respuesta recibida de la agencia..."
                              rows={4}
                            />
                            <div className="flex gap-2">
                              <Button onClick={handleAgencyResponse} disabled={!respuestaAgencia.trim()} className="gap-2">
                                <Send className="h-4 w-4" />
                                Registrar Respuesta
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setShowAgencyResponseForm(false);
                                  setRespuestaAgencia('');
                                }}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Botón para reiniciar gestión después de recibir respuesta */}
                    {requirement.respuestaAgencia && user && ['ANALISTA', 'SUPERVISOR', 'ADMINISTRADOR'].includes(user.role) && (
                      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                        <p className="text-sm font-semibold mb-2 text-green-700 dark:text-green-400">
                          ✅ Respuesta recibida - ¿Puedes resolver el caso ahora?
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Con la información de la agencia, evalúa si puedes proporcionar la solución al cliente.
                        </p>
                        <Button 
                          onClick={handleRestartCaseManagement}
                          className="gap-2 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Reiniciar Evaluación de Caso
                        </Button>
                      </div>
                    )}

                    {/* Historial de Interacciones */}
                    {requirement.historialInteraccionAgencia && requirement.historialInteraccionAgencia.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold mb-2">📋 Historial de Interacciones ({requirement.historialInteraccionAgencia.length}):</p>
                        <div className="space-y-2">
                          {requirement.historialInteraccionAgencia.map((interaction, index) => (
                            <div key={interaction.id} className="p-2 bg-gray-50 dark:bg-gray-900/30 rounded text-xs">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-semibold">Interacción #{index + 1}</span>
                                <span className="text-muted-foreground">
                                  {new Date(interaction.fecha).toLocaleString('es-AR')}
                                </span>
                              </div>
                              <div className="space-y-1">
                                <div>
                                  <span className="font-medium">Consulta:</span>
                                  <p className="text-muted-foreground">{interaction.consulta}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Respuesta:</span>
                                  <p className="text-muted-foreground">{interaction.respuesta}</p>
                                </div>
                                <div className="text-muted-foreground">
                                  Registrado por: {interaction.usuario}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Badge variant="outline" className="bg-orange-100 dark:bg-orange-900/30">
                      {requirement.respuestaAgencia ? '✅ Respuesta recibida' : '⏳ Esperando respuesta'}
                    </Badge>
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

              {/* Respuesta del Supervisor (si existe) */}
              {requirement.respuestaSupervisor && (
                <>
                  <Separator />
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-2 border-blue-500/50">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                      <CheckCircle2 className="h-5 w-5" />
                      Respuesta del Supervisor
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-white dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                        <p className="text-sm font-semibold mb-2">
                          {requirement.accionSupervisor === 'autorizar_analista' 
                            ? '✅ Autorización e Instrucciones:' 
                            : '✅ Resolución del Supervisor:'}
                        </p>
                        <p className="whitespace-pre-wrap text-sm">{requirement.respuestaSupervisor}</p>
                      </div>
                      
                      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30">
                        {requirement.accionSupervisor === 'autorizar_analista' 
                          ? '👨‍💼 Autorizado para proceder' 
                          : '✅ Resuelto por Supervisor'}
                      </Badge>
                      
                      {requirement.accionSupervisor === 'autorizar_analista' && (
                        <p className="text-xs text-muted-foreground italic">
                          💡 Puedes proceder siguiendo las instrucciones del supervisor y cerrar el caso cuando termines.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Información de Escalamiento */}
              {requirement.casoOpcion === 'NO_ESCALAR_CASO' && (
                <>
                  <Separator />
                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      Caso Escalado
                    </h3>
                    <div className="space-y-3 text-sm">
                      <p>
                        <strong>Motivo:</strong> El analista no pudo entregar la información requerida
                      </p>
                      <p>
                        <strong>Escalado a:</strong>{' '}
                        <Badge variant={requirement.escaladoA === 'SUPERVISOR' ? 'default' : 'secondary'}>
                          {requirement.escaladoA === 'SUPERVISOR' ? 'SUPERVISOR' : `OTRA ÁREA: ${requirement.areaEscalamiento}`}
                        </Badge>
                      </p>
                      
                      {/* Análisis del Analista (si escala a supervisor) */}
                      {requirement.escaladoA === 'SUPERVISOR' && requirement.analisisAnalista && (
                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <p className="font-semibold mb-2 flex items-center gap-2">
                            📝 Análisis del Analista:
                          </p>
                          <p className="whitespace-pre-wrap text-foreground">{requirement.analisisAnalista}</p>
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            Analista: {requirement.nombreAsesor}
                          </p>
                        </div>
                      )}
                      
                      <p className="text-muted-foreground italic">
                        Este caso requiere atención de {requirement.escaladoA === 'SUPERVISOR' ? 'un supervisor' : `el área de ${requirement.areaEscalamiento}`}
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
