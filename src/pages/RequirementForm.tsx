import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, CalendarIcon, Clock } from 'lucide-react';
import { RequirementStatus, RequirementPriority, AsesorName, OrigenConsulta, TipoSolicitud, ReclamoIncidente } from '@/types/requirement';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const RequirementForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addRequirement, updateRequirement, getRequirement, addRequirementHistory } = useRequirements();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nombreAsesor: '' as AsesorName | '',
    canalConsulta: 'SISTEMA DE DISTRIBUCIÓN GDS' as const,
    origenConsulta: 'GDS' as OrigenConsulta,
    esSoporteIngles: false,
    horaIngresoCorreo: '',
    pnrTktLocalizador: '',
    correoElectronico: '',
    tipoSolicitud: '' as TipoSolicitud | '',
    reclamoIncidente: '' as ReclamoIncidente | '',
    solicitudCliente: '',
    informacionBrindada: '',
    observaciones: '',
    initialDate: new Date(),
    status: 'nuevo' as RequirementStatus,
    priority: 'media' as RequirementPriority,
    assignedTo: '',
    assignedTeam: '',
    slaDeadline: undefined as Date | undefined,
  });

  useEffect(() => {
    if (isEditing && id) {
      const requirement = getRequirement(id);
      if (requirement) {
        setFormData({
          nombreAsesor: requirement.nombreAsesor,
          canalConsulta: requirement.canalConsulta,
          origenConsulta: requirement.origenConsulta,
          esSoporteIngles: requirement.esSoporteIngles,
          horaIngresoCorreo: requirement.horaIngresoCorreo,
          pnrTktLocalizador: requirement.pnrTktLocalizador,
          correoElectronico: requirement.correoElectronico,
          tipoSolicitud: requirement.tipoSolicitud,
          reclamoIncidente: requirement.reclamoIncidente,
          solicitudCliente: requirement.solicitudCliente,
          informacionBrindada: requirement.informacionBrindada,
          observaciones: requirement.observaciones,
          initialDate: requirement.initialDate,
          status: requirement.status,
          priority: requirement.priority,
          assignedTo: requirement.assignedTo || '',
          assignedTeam: requirement.assignedTeam || '',
          slaDeadline: requirement.slaDeadline,
        });
      }
    }
  }, [id, isEditing, getRequirement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombreAsesor) {
      toast.error('Por favor selecciona el nombre del asesor');
      return;
    }
    if (!formData.horaIngresoCorreo) {
      toast.error('Por favor ingresa la hora de ingreso del correo');
      return;
    }
    if (!formData.pnrTktLocalizador) {
      toast.error('Por favor ingresa el PNR/TKT/Localizador');
      return;
    }
    if (!formData.correoElectronico) {
      toast.error('Por favor ingresa el correo electrónico');
      return;
    }
    if (!formData.solicitudCliente) {
      toast.error('Por favor describe la solicitud del cliente');
      return;
    }

    if (isEditing && id) {
      updateRequirement(id, formData);
      addRequirementHistory(id, 'Requerimiento actualizado', 'Información del requerimiento modificada');
      toast.success('Requerimiento actualizado exitosamente');
    } else {
      addRequirement(formData as any);
      toast.success('Requerimiento creado exitosamente');
    }

    navigate('/requirements');
  };

  const asesores: AsesorName[] = [
    'Jenny Andrea Taborda',
    'Jhoan Restrepo',
    'José Ramos',
    'Julieth Urbina',
    'Luz Lozada',
    'Manuela Maz',
    'Mauricio Rios',
    'Nazly Lugo',
    'Rafael Carmona',
    'Sandra Milena Jaramillo',
    'Sofia Guarin',
    'Valentina Mejía',
    'Viviana Virlen',
  ];

  const tiposSolicitud: TipoSolicitud[] = [
    'Waiver GDS - Sabre',
    'Waiver Comercial',
    'Remisión Voluntaria - Involuntaria',
    'Cesión - Cambio de Nombre Vol - Corrección',
    'Certificado Médico',
    'Cambio de Status (Ticket)',
    'Opcionales - BUNDLES',
    'Retracto (CL/BR/CO)',
    'Política Comercial - Regulación de Emisión',
    'Facturación',
    'Toma de Pagos (WebPay/Portal AG/Otro)',
  ];

  const reclamosIncidentes: ReclamoIncidente[] = [
    'Error en Emisión (Amadeus - Navitaire -Sabre)',
    'Alternativa por Cancelación - Demora - Sobreventa',
    'Proceso o Estado de Devolución (PW/APP/BSP/ARC)',
    'Segmentos Pasivos - Error BUNDLE',
    'Cobro Erróneo ATO - No corresponde',
    'Check-in',
    'Escalamiento Finanzas - Facturación -ATO',
    'Ingreso APP - Error en ATO -Otro',
    'ACM (Dev BSP/ARC/Pago Exceso)',
    'Otro',
    'PNR HX',
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Button onClick={() => navigate('/requirements')} variant="outline" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEditing ? 'Editar Requerimiento' : 'Nuevo Requerimiento GDS'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Canal de Consulta: Sistema de Distribución GDS
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sección 1: Información del Asesor */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Información del Asesor</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombreAsesor">Nombre del Asesor *</Label>
                  <Select
                    value={formData.nombreAsesor}
                    onValueChange={(value) => setFormData({ ...formData, nombreAsesor: value as AsesorName })}
                  >
                    <SelectTrigger id="nombreAsesor">
                      <SelectValue placeholder="Selecciona un asesor" />
                    </SelectTrigger>
                    <SelectContent>
                      {asesores.map((asesor) => (
                        <SelectItem key={asesor} value={asesor}>
                          {asesor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horaIngresoCorreo">Hora de Ingreso del Correo (HH:MM) *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="horaIngresoCorreo"
                      type="time"
                      value={formData.horaIngresoCorreo}
                      onChange={(e) => setFormData({ ...formData, horaIngresoCorreo: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 2: Origen y Canal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Origen de la Consulta</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="origenConsulta">Origen Consulta</Label>
                  <Select
                    value={formData.origenConsulta}
                    onValueChange={(value) => setFormData({ ...formData, origenConsulta: value as OrigenConsulta })}
                  >
                    <SelectTrigger id="origenConsulta">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GDS">GDS</SelectItem>
                      <SelectItem value="AMADEUS">AMADEUS</SelectItem>
                      <SelectItem value="NO CORRESPONDE">NO CORRESPONDE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="esSoporteIngles">¿El Origen Email es Soporte Inglés?</Label>
                  <Select
                    value={formData.esSoporteIngles ? 'Si' : 'No'}
                    onValueChange={(value) => setFormData({ ...formData, esSoporteIngles: value === 'Si' })}
                  >
                    <SelectTrigger id="esSoporteIngles">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Si">Sí</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sección 3: Datos del Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Datos del Cliente</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pnrTktLocalizador">PNR - TKT - Localizador AMADEUS-SABRE *</Label>
                  <Input
                    id="pnrTktLocalizador"
                    value={formData.pnrTktLocalizador}
                    onChange={(e) => setFormData({ ...formData, pnrTktLocalizador: e.target.value })}
                    placeholder="ABC123"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correoElectronico">Correo Electrónico *</Label>
                  <Input
                    id="correoElectronico"
                    type="email"
                    value={formData.correoElectronico}
                    onChange={(e) => setFormData({ ...formData, correoElectronico: e.target.value })}
                    placeholder="cliente@ejemplo.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sección 4: Tipo de Solicitud y Reclamos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Clasificación del Requerimiento</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tipoSolicitud">Tipo de Solicitud</Label>
                  <Select
                    value={formData.tipoSolicitud}
                    onValueChange={(value) => setFormData({ ...formData, tipoSolicitud: value as TipoSolicitud })}
                  >
                    <SelectTrigger id="tipoSolicitud">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposSolicitud.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reclamoIncidente">Reclamos / Incidentes</Label>
                  <Select
                    value={formData.reclamoIncidente}
                    onValueChange={(value) => setFormData({ ...formData, reclamoIncidente: value as ReclamoIncidente })}
                  >
                    <SelectTrigger id="reclamoIncidente">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      {reclamosIncidentes.map((reclamo) => (
                        <SelectItem key={reclamo} value={reclamo}>
                          {reclamo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sección 5: Detalles de la Solicitud */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Detalles de la Solicitud</h3>

              <div className="space-y-2">
                <Label htmlFor="solicitudCliente">Solicitud del Cliente *</Label>
                <Textarea
                  id="solicitudCliente"
                  value={formData.solicitudCliente}
                  onChange={(e) => setFormData({ ...formData, solicitudCliente: e.target.value })}
                  placeholder="Describe la solicitud del cliente en detalle..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="informacionBrindada">Información Brindada</Label>
                <Textarea
                  id="informacionBrindada"
                  value={formData.informacionBrindada}
                  onChange={(e) => setFormData({ ...formData, informacionBrindada: e.target.value })}
                  placeholder="Información o respuesta brindada al cliente..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones y/otros</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  placeholder="Observaciones adicionales..."
                  rows={3}
                />
              </div>
            </div>

            {/* Sección 6: Gestión Interna */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Gestión Interna</h3>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as RequirementStatus })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuevo">Nuevo</SelectItem>
                      <SelectItem value="en-proceso">En Proceso</SelectItem>
                      <SelectItem value="pendiente-informacion">Pendiente Información</SelectItem>
                      <SelectItem value="resuelto">Resuelto</SelectItem>
                      <SelectItem value="cerrado">Cerrado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value as RequirementPriority })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="critica">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedTeam">Equipo Asignado</Label>
                  <Select
                    value={formData.assignedTeam}
                    onValueChange={(value) => setFormData({ ...formData, assignedTeam: value })}
                  >
                    <SelectTrigger id="assignedTeam">
                      <SelectValue placeholder="Selecciona un equipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sin asignar</SelectItem>
                      <SelectItem value="Soporte GDS">Soporte GDS</SelectItem>
                      <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Finanzas">Finanzas</SelectItem>
                      <SelectItem value="Capacitación">Capacitación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Asignado a</Label>
                  <Input
                    id="assignedTo"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    placeholder="Nombre del responsable"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slaDeadline">Fecha Límite SLA</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.slaDeadline && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.slaDeadline ? format(formData.slaDeadline, "PPP", { locale: es }) : "Seleccione una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.slaDeadline}
                        onSelect={(date) => setFormData({ ...formData, slaDeadline: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => navigate('/requirements')}>
                Cancelar
              </Button>
              <Button type="submit" size="lg">
                {isEditing ? 'Actualizar Requerimiento' : 'Crear Requerimiento'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequirementForm;
