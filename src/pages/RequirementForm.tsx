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
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { RequirementStatus, RequirementPriority, RequirementType, GDSSystem, RequirementCategory } from '@/types/requirement';
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
    ticketNumber: '',
    title: '',
    requirementType: 'consulta' as RequirementType,
    gdsSystem: 'sabre' as GDSSystem,
    category: 'reservas' as RequirementCategory,
    requesterName: '',
    requesterEmail: '',
    requesterPhone: '',
    organization: '',
    officeId: '',
    pcc: '',
    description: '',
    expectedResult: '',
    affectedPNR: '',
    errorMessage: '',
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
          ticketNumber: requirement.ticketNumber,
          title: requirement.title,
          requirementType: requirement.requirementType,
          gdsSystem: requirement.gdsSystem,
          category: requirement.category,
          requesterName: requirement.requesterName,
          requesterEmail: requirement.requesterEmail,
          requesterPhone: requirement.requesterPhone,
          organization: requirement.organization,
          officeId: requirement.officeId || '',
          pcc: requirement.pcc || '',
          description: requirement.description,
          expectedResult: requirement.expectedResult,
          affectedPNR: requirement.affectedPNR || '',
          errorMessage: requirement.errorMessage || '',
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

    if (!formData.title || !formData.requesterName || !formData.requesterEmail || !formData.description) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    if (isEditing && id) {
      updateRequirement(id, formData);
      addRequirementHistory(id, 'Requerimiento actualizado', 'Información del requerimiento modificada');
      toast.success('Requerimiento actualizado exitosamente');
    } else {
      addRequirement({
        ...formData,
        ticketNumber: formData.ticketNumber || `GDS-${Date.now()}`,
      });
      toast.success('Requerimiento creado exitosamente');
    }

    navigate('/requirements');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button onClick={() => navigate('/requirements')} variant="outline" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEditing ? 'Editar Requerimiento GDS' : 'Nuevo Requerimiento GDS'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información General */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Información General</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ticketNumber">Número de Ticket</Label>
                  <Input
                    id="ticketNumber"
                    value={formData.ticketNumber}
                    onChange={(e) => setFormData({ ...formData, ticketNumber: e.target.value })}
                    placeholder="GDS-2025-001 (autogenerado si se deja vacío)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título del Requerimiento *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Breve descripción del requerimiento"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="requirementType">Tipo de Requerimiento</Label>
                  <Select
                    value={formData.requirementType}
                    onValueChange={(value) => setFormData({ ...formData, requirementType: value as RequirementType })}
                  >
                    <SelectTrigger id="requirementType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta">Consulta</SelectItem>
                      <SelectItem value="incidencia">Incidencia</SelectItem>
                      <SelectItem value="solicitud">Solicitud</SelectItem>
                      <SelectItem value="configuracion">Configuración</SelectItem>
                      <SelectItem value="reportes">Reportes</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gdsSystem">Sistema GDS *</Label>
                  <Select
                    value={formData.gdsSystem}
                    onValueChange={(value) => setFormData({ ...formData, gdsSystem: value as GDSSystem })}
                  >
                    <SelectTrigger id="gdsSystem">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sabre">Sabre</SelectItem>
                      <SelectItem value="amadeus">Amadeus</SelectItem>
                      <SelectItem value="travelport">Travelport</SelectItem>
                      <SelectItem value="sirena">Sirena</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as RequirementCategory })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reservas">Reservas</SelectItem>
                      <SelectItem value="tarifas">Tarifas</SelectItem>
                      <SelectItem value="disponibilidad">Disponibilidad</SelectItem>
                      <SelectItem value="pnr">PNR</SelectItem>
                      <SelectItem value="tickets">Tickets</SelectItem>
                      <SelectItem value="reportes">Reportes</SelectItem>
                      <SelectItem value="accesos">Accesos</SelectItem>
                      <SelectItem value="capacitacion">Capacitación</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Información del Solicitante */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Información del Solicitante</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="requesterName">Nombre del Solicitante *</Label>
                  <Input
                    id="requesterName"
                    value={formData.requesterName}
                    onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                    placeholder="Nombre completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organización/Agencia</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Nombre de la agencia o empresa"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="requesterEmail">Email del Solicitante *</Label>
                  <Input
                    id="requesterEmail"
                    type="email"
                    value={formData.requesterEmail}
                    onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                    placeholder="email@ejemplo.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requesterPhone">Teléfono</Label>
                  <Input
                    id="requesterPhone"
                    type="tel"
                    value={formData.requesterPhone}
                    onChange={(e) => setFormData({ ...formData, requesterPhone: e.target.value })}
                    placeholder="+54 11 1234-5678"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="officeId">Office ID (GDS)</Label>
                  <Input
                    id="officeId"
                    value={formData.officeId}
                    onChange={(e) => setFormData({ ...formData, officeId: e.target.value })}
                    placeholder="BUEXX08AA"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pcc">PCC (Pseudo City Code)</Label>
                  <Input
                    id="pcc"
                    value={formData.pcc}
                    onChange={(e) => setFormData({ ...formData, pcc: e.target.value })}
                    placeholder="4TL8"
                  />
                </div>
              </div>
            </div>

            {/* Detalles del Requerimiento */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Detalles del Requerimiento</h3>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción Detallada *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describa en detalle el requerimiento o incidencia..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedResult">Resultado Esperado / Solución Requerida *</Label>
                <Textarea
                  id="expectedResult"
                  value={formData.expectedResult}
                  onChange={(e) => setFormData({ ...formData, expectedResult: e.target.value })}
                  placeholder="¿Qué resultado o solución espera obtener?"
                  rows={3}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="affectedPNR">PNR Afectado (si aplica)</Label>
                  <Input
                    id="affectedPNR"
                    value={formData.affectedPNR}
                    onChange={(e) => setFormData({ ...formData, affectedPNR: e.target.value })}
                    placeholder="ABC123"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initialDate">Fecha del Requerimiento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.initialDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.initialDate ? format(formData.initialDate, "PPP", { locale: es }) : "Seleccione una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.initialDate}
                        onSelect={(date) => date && setFormData({ ...formData, initialDate: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="errorMessage">Mensaje de Error (si aplica)</Label>
                <Textarea
                  id="errorMessage"
                  value={formData.errorMessage}
                  onChange={(e) => setFormData({ ...formData, errorMessage: e.target.value })}
                  placeholder="Copie aquí el mensaje de error del sistema GDS"
                  rows={3}
                />
              </div>
            </div>

            {/* Estado y Gestión */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Estado y Gestión</h3>

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
                      <SelectValue placeholder="Seleccione un equipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sin asignar</SelectItem>
                      <SelectItem value="Soporte GDS">Soporte GDS</SelectItem>
                      <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Administración">Administración</SelectItem>
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

            <div className="flex gap-4 justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/requirements')}>
                Cancelar
              </Button>
              <Button type="submit">
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

