import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import RequirementStatusBadge from '@/components/RequirementStatusBadge';
import RequirementPriorityBadge from '@/components/RequirementPriorityBadge';
import GDSSystemBadge from '@/components/GDSSystemBadge';
import { ArrowLeft, Mail, Phone, User, Calendar, Clock, Server, Building2, AlertTriangle } from 'lucide-react';

const RequirementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRequirement } = useRequirements();

  const requirement = id ? getRequirement(id) : undefined;

  if (!requirement) {
    return (
      <div className="space-y-6">
        <Button onClick={() => navigate('/requirements')} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-muted-foreground">Requerimiento no encontrado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const requirementTypeLabels = {
    consulta: 'Consulta',
    incidencia: 'Incidencia',
    solicitud: 'Solicitud',
    configuracion: 'Configuración',
    reportes: 'Reportes',
    otro: 'Otro',
  };

  const categoryLabels = {
    reservas: 'Reservas',
    tarifas: 'Tarifas',
    disponibilidad: 'Disponibilidad',
    pnr: 'PNR',
    tickets: 'Tickets',
    reportes: 'Reportes',
    accesos: 'Accesos',
    capacitacion: 'Capacitación',
    otro: 'Otro',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate('/requirements')} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a Requerimientos
        </Button>
        <Link to={`/requirements/${requirement.id}/edit`}>
          <Button>Editar Requerimiento</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {requirement.ticketNumber}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{requirement.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <RequirementStatusBadge status={requirement.status} />
                    <RequirementPriorityBadge priority={requirement.priority} />
                    <GDSSystemBadge system={requirement.gdsSystem} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Tipo de Requerimiento</h3>
                  <p className="text-muted-foreground">{requirementTypeLabels[requirement.requirementType]}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Categoría</h3>
                  <p className="text-muted-foreground">{categoryLabels[requirement.category]}</p>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Sistema GDS</h3>
                  <p className="text-muted-foreground">{requirement.gdsSystem.toUpperCase()}</p>
                </div>
                {requirement.affectedPNR && (
                  <div>
                    <h3 className="font-semibold mb-2">PNR Afectado</h3>
                    <p className="text-muted-foreground font-mono">{requirement.affectedPNR}</p>
                  </div>
                )}
              </div>
              {(requirement.officeId || requirement.pcc) && (
                <>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    {requirement.officeId && (
                      <div>
                        <h3 className="font-semibold mb-2">Office ID</h3>
                        <p className="text-muted-foreground font-mono">{requirement.officeId}</p>
                      </div>
                    )}
                    {requirement.pcc && (
                      <div>
                        <h3 className="font-semibold mb-2">PCC</h3>
                        <p className="text-muted-foreground font-mono">{requirement.pcc}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Descripción del Requerimiento</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{requirement.description}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Resultado Esperado</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{requirement.expectedResult}</p>
              </div>
              {requirement.errorMessage && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      Mensaje de Error
                    </h3>
                    <div className="bg-destructive/10 p-4 rounded-md">
                      <pre className="text-sm text-destructive font-mono whitespace-pre-wrap">
                        {requirement.errorMessage}
                      </pre>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

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
                  <p className="text-sm text-muted-foreground">Nombre</p>
                  <p className="font-medium">{requirement.requesterName}</p>
                </div>
              </div>
              {requirement.organization && (
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Organización</p>
                    <p className="font-medium">{requirement.organization}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium break-all">{requirement.requesterEmail}</p>
                </div>
              </div>
              {requirement.requesterPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium">{requirement.requesterPhone}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles del Requerimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <p className="text-sm text-muted-foreground">Fecha de Creación en Sistema</p>
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
                  <AlertTriangle className="h-5 w-5 text-warning" />
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

