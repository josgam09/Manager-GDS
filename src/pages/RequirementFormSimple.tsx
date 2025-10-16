import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const RequirementFormSimple = () => {
  const navigate = useNavigate();
  const { addRequirement } = useRequirements();

  const [nombreAsesor, setNombreAsesor] = useState('');
  const [origenConsulta, setOrigenConsulta] = useState('GDS');
  const [esSoporteIngles, setEsSoporteIngles] = useState('No');
  const [horaIngresoCorreo, setHoraIngresoCorreo] = useState('');
  const [pnrTktLocalizador, setPnrTktLocalizador] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [tipoSolicitud, setTipoSolicitud] = useState('');
  const [reclamoIncidente, setReclamoIncidente] = useState('');
  const [solicitudCliente, setSolicitudCliente] = useState('');
  const [informacionBrindada, setInformacionBrindada] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombreAsesor || !horaIngresoCorreo || !pnrTktLocalizador || !correoElectronico || !solicitudCliente) {
      toast.error('Por favor complete todos los campos obligatorios');
      return;
    }

    const newRequirement = {
      nombreAsesor: nombreAsesor as any,
      canalConsulta: 'SISTEMA DE DISTRIBUCIÓN GDS' as const,
      origenConsulta: origenConsulta as any,
      esSoporteIngles: esSoporteIngles === 'Si',
      horaIngresoCorreo,
      pnrTktLocalizador,
      correoElectronico,
      tipoSolicitud: tipoSolicitud as any,
      reclamoIncidente: reclamoIncidente as any,
      solicitudCliente,
      informacionBrindada,
      observaciones,
      initialDate: new Date(),
      status: 'nuevo' as const,
      priority: 'media' as const,
      assignedTo: '',
      assignedTeam: '',
    };

    addRequirement(newRequirement as any);
    toast.success('Requerimiento creado exitosamente');
    navigate('/requirements');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Button onClick={() => navigate('/requirements')} variant="outline" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nuevo Requerimiento GDS</CardTitle>
          <p className="text-sm text-muted-foreground">Canal: Sistema de Distribución GDS</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información del Asesor */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">1. Información del Asesor</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nombre del Asesor *</Label>
                  <Select value={nombreAsesor} onValueChange={setNombreAsesor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un asesor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jenny Andrea Taborda">Jenny Andrea Taborda</SelectItem>
                      <SelectItem value="Jhoan Restrepo">Jhoan Restrepo</SelectItem>
                      <SelectItem value="José Ramos">José Ramos</SelectItem>
                      <SelectItem value="Julieth Urbina">Julieth Urbina</SelectItem>
                      <SelectItem value="Luz Lozada">Luz Lozada</SelectItem>
                      <SelectItem value="Manuela Maz">Manuela Maz</SelectItem>
                      <SelectItem value="Mauricio Rios">Mauricio Rios</SelectItem>
                      <SelectItem value="Nazly Lugo">Nazly Lugo</SelectItem>
                      <SelectItem value="Rafael Carmona">Rafael Carmona</SelectItem>
                      <SelectItem value="Sandra Milena Jaramillo">Sandra Milena Jaramillo</SelectItem>
                      <SelectItem value="Sofia Guarin">Sofia Guarin</SelectItem>
                      <SelectItem value="Valentina Mejía">Valentina Mejía</SelectItem>
                      <SelectItem value="Viviana Virlen">Viviana Virlen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Hora de Ingreso del Correo (HH:MM) *</Label>
                  <Input
                    type="time"
                    value={horaIngresoCorreo}
                    onChange={(e) => setHoraIngresoCorreo(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Origen */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">2. Origen de la Consulta</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Origen Consulta</Label>
                  <Select value={origenConsulta} onValueChange={setOrigenConsulta}>
                    <SelectTrigger>
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
                  <Label>¿Soporte Inglés?</Label>
                  <Select value={esSoporteIngles} onValueChange={setEsSoporteIngles}>
                    <SelectTrigger>
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

            {/* Datos del Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">3. Datos del Cliente</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>PNR - TKT - Localizador *</Label>
                  <Input
                    value={pnrTktLocalizador}
                    onChange={(e) => setPnrTktLocalizador(e.target.value)}
                    placeholder="ABC123"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Correo Electrónico *</Label>
                  <Input
                    type="email"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    placeholder="cliente@ejemplo.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Clasificación */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">4. Tipo de Solicitud/Reclamo</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tipo de Solicitud</Label>
                  <Select value={tipoSolicitud} onValueChange={setTipoSolicitud}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Waiver GDS - Sabre">Waiver GDS - Sabre</SelectItem>
                      <SelectItem value="Waiver Comercial">Waiver Comercial</SelectItem>
                      <SelectItem value="Remisión Voluntaria - Involuntaria">Remisión Voluntaria - Involuntaria</SelectItem>
                      <SelectItem value="Cesión - Cambio de Nombre Vol - Corrección">Cesión - Cambio de Nombre Vol - Corrección</SelectItem>
                      <SelectItem value="Certificado Médico">Certificado Médico</SelectItem>
                      <SelectItem value="Cambio de Status (Ticket)">Cambio de Status (Ticket)</SelectItem>
                      <SelectItem value="Opcionales - BUNDLES">Opcionales - BUNDLES</SelectItem>
                      <SelectItem value="Retracto (CL/BR/CO)">Retracto (CL/BR/CO)</SelectItem>
                      <SelectItem value="Política Comercial - Regulación de Emisión">Política Comercial - Regulación de Emisión</SelectItem>
                      <SelectItem value="Facturación">Facturación</SelectItem>
                      <SelectItem value="Toma de Pagos (WebPay/Portal AG/Otro)">Toma de Pagos (WebPay/Portal AG/Otro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Reclamos / Incidentes</Label>
                  <Select value={reclamoIncidente} onValueChange={setReclamoIncidente}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Error en Emisión (Amadeus - Navitaire -Sabre)">Error en Emisión</SelectItem>
                      <SelectItem value="Alternativa por Cancelación - Demora - Sobreventa">Alternativa por Cancelación</SelectItem>
                      <SelectItem value="Proceso o Estado de Devolución (PW/APP/BSP/ARC)">Proceso de Devolución</SelectItem>
                      <SelectItem value="Segmentos Pasivos - Error BUNDLE">Segmentos Pasivos</SelectItem>
                      <SelectItem value="Cobro Erróneo ATO - No corresponde">Cobro Erróneo ATO</SelectItem>
                      <SelectItem value="Check-in">Check-in</SelectItem>
                      <SelectItem value="Escalamiento Finanzas - Facturación -ATO">Escalamiento Finanzas</SelectItem>
                      <SelectItem value="Ingreso APP - Error en ATO -Otro">Ingreso APP</SelectItem>
                      <SelectItem value="ACM (Dev BSP/ARC/Pago Exceso)">ACM</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                      <SelectItem value="PNR HX">PNR HX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Detalles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">5. Detalles de la Solicitud</h3>

              <div className="space-y-2">
                <Label>Solicitud del Cliente *</Label>
                <Textarea
                  value={solicitudCliente}
                  onChange={(e) => setSolicitudCliente(e.target.value)}
                  placeholder="Describe la solicitud del cliente..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Información Brindada</Label>
                <Textarea
                  value={informacionBrindada}
                  onChange={(e) => setInformacionBrindada(e.target.value)}
                  placeholder="Información o respuesta brindada..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Observaciones</Label>
                <Textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Observaciones adicionales..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => navigate('/requirements')}>
                Cancelar
              </Button>
              <Button type="submit" size="lg">
                Crear Requerimiento
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequirementFormSimple;

