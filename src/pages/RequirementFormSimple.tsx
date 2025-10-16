import { useState, useEffect } from 'react';
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
import ScriptSelector from '@/components/ScriptSelector';
import { getApplicableScripts, ResponseScript } from '@/data/responseScripts';

const RequirementFormSimple = () => {
  const navigate = useNavigate();
  const { addRequirement } = useRequirements();

  const [nombreAsesor, setNombreAsesor] = useState('');
  const [origenConsulta, setOrigenConsulta] = useState('SABRE');
  const [esSoporteIngles, setEsSoporteIngles] = useState('No');
  const [horaIngresoCorreo, setHoraIngresoCorreo] = useState('');
  const [pnrTktLocalizador, setPnrTktLocalizador] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [tipoSolicitud, setTipoSolicitud] = useState('');
  const [reclamoIncidente, setReclamoIncidente] = useState('');
  const [solicitudCliente, setSolicitudCliente] = useState('');
  const [puedeEntregarInformacion, setPuedeEntregarInformacion] = useState('Si');
  const [escaladoA, setEscaladoA] = useState('');
  const [nombreAreaEscalamiento, setNombreAreaEscalamiento] = useState('');
  const [analisisAnalista, setAnalisisAnalista] = useState('');
  const [informacionBrindada, setInformacionBrindada] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [availableScripts, setAvailableScripts] = useState<ResponseScript[]>([]);

  // Actualizar scripts disponibles cuando cambian tipo de solicitud o reclamo
  useEffect(() => {
    let scripts: ResponseScript[] = [];
    
    if (tipoSolicitud) {
      scripts = [...scripts, ...getApplicableScripts('tipoSolicitud', tipoSolicitud)];
    }
    
    if (reclamoIncidente) {
      scripts = [...scripts, ...getApplicableScripts('reclamoIncidente', reclamoIncidente)];
    }
    
    setAvailableScripts(scripts);
  }, [tipoSolicitud, reclamoIncidente]);

  const handleApplyScript = (scriptContent: string) => {
    setInformacionBrindada(scriptContent);
    toast.success('Script aplicado. Revisa y ajusta según necesites.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombreAsesor || !horaIngresoCorreo || !pnrTktLocalizador || !correoElectronico || !solicitudCliente) {
      toast.error('Por favor complete todos los campos obligatorios');
      return;
    }

    // Validar si puede entregar información
    if (puedeEntregarInformacion === 'Si') {
      if (!informacionBrindada.trim()) {
        toast.error('Por favor proporciona la información brindada al cliente antes de crear y cerrar el caso');
        return;
      }
    }

    // Validar escalamiento
    if (puedeEntregarInformacion === 'No') {
      if (!escaladoA) {
        toast.error('Por favor selecciona a quién escalar el caso');
        return;
      }
      if (escaladoA === 'SUPERVISOR' && !analisisAnalista.trim()) {
        toast.error('Por favor proporciona tu análisis y motivo del escalamiento al supervisor');
        return;
      }
      if (escaladoA === 'OTRA_AREA' && !nombreAreaEscalamiento) {
        toast.error('Por favor indica el nombre del área a escalar');
        return;
      }
    }

    // Determinar el estado según si puede entregar información
    let estadoInicial: any = 'nuevo';
    
    if (puedeEntregarInformacion === 'Si') {
      // Si puede entregar información, crear y cerrar directamente
      estadoInicial = 'cerrado';
    } else if (puedeEntregarInformacion === 'No') {
      // Si no puede, escalar según selección
      if (escaladoA === 'SUPERVISOR') {
        estadoInicial = 'pendiente-supervisor';
      } else if (escaladoA === 'OTRA_AREA') {
        estadoInicial = 'pendiente-otra-area';
      }
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
      puedeEntregarInformacion: puedeEntregarInformacion === 'Si',
      escaladoA: escaladoA as any,
      nombreAreaEscalamiento: nombreAreaEscalamiento || undefined,
      analisisAnalista: analisisAnalista || undefined,
      informacionBrindada,
      observaciones,
      initialDate: new Date(),
      status: estadoInicial,
      priority: 'media' as const,
      assignedTo: '',
      assignedTeam: escaladoA === 'OTRA_AREA' ? nombreAreaEscalamiento : '',
      resolvedAt: estadoInicial === 'cerrado' ? new Date() : undefined,
    };

    addRequirement(newRequirement as any);
    
    if (estadoInicial === 'cerrado') {
      toast.success('✅ Requerimiento creado y cerrado exitosamente');
    } else {
      toast.success('Requerimiento creado exitosamente');
    }
    
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
                      <SelectItem value="AMADEUS">AMADEUS</SelectItem>
                      <SelectItem value="NO CORRESPONDE">NO CORRESPONDE</SelectItem>
                      <SelectItem value="SABRE">SABRE</SelectItem>
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
                      <SelectItem value="Cambio de Status (Ticket)">Cambio de Status (Ticket)</SelectItem>
                      <SelectItem value="Certificado Médico">Certificado Médico</SelectItem>
                      <SelectItem value="Cesión - Cambio de Nombre Vol - Corrección">Cesión - Cambio de Nombre Vol - Corrección</SelectItem>
                      <SelectItem value="Facturación">Facturación</SelectItem>
                      <SelectItem value="Opcionales - BUNDLES">Opcionales - BUNDLES</SelectItem>
                      <SelectItem value="Política Comercial - Regulación de Emisión">Política Comercial - Regulación de Emisión</SelectItem>
                      <SelectItem value="Remisión Voluntaria - Involuntaria">Remisión Voluntaria - Involuntaria</SelectItem>
                      <SelectItem value="Retracto (CL/BR/CO)">Retracto (CL/BR/CO)</SelectItem>
                      <SelectItem value="Toma de Pagos (WebPay/Portal AG/Otro)">Toma de Pagos (WebPay/Portal AG/Otro)</SelectItem>
                      <SelectItem value="Waiver Comercial">Waiver Comercial</SelectItem>
                      <SelectItem value="Waiver GDS - Sabre">Waiver GDS - Sabre</SelectItem>
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
                      <SelectItem value="ACM (Dev BSP/ARC/Pago Exceso)">ACM (Dev BSP/ARC/Pago Exceso)</SelectItem>
                      <SelectItem value="Alternativa por Cancelación - Demora - Sobreventa">Alternativa por Cancelación - Demora - Sobreventa</SelectItem>
                      <SelectItem value="Check-in">Check-in</SelectItem>
                      <SelectItem value="Cobro Erróneo ATO - No corresponde">Cobro Erróneo ATO - No corresponde</SelectItem>
                      <SelectItem value="Error en Emisión (Amadeus - Navitaire -Sabre)">Error en Emisión (Amadeus - Navitaire -Sabre)</SelectItem>
                      <SelectItem value="Escalamiento Finanzas - Facturación -ATO">Escalamiento Finanzas - Facturación -ATO</SelectItem>
                      <SelectItem value="Ingreso APP - Error en ATO -Otro">Ingreso APP - Error en ATO -Otro</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                      <SelectItem value="PNR HX">PNR HX</SelectItem>
                      <SelectItem value="Proceso o Estado de Devolución (PW/APP/BSP/ARC)">Proceso o Estado de Devolución (PW/APP/BSP/ARC)</SelectItem>
                      <SelectItem value="Segmentos Pasivos - Error BUNDLE">Segmentos Pasivos - Error BUNDLE</SelectItem>
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
            </div>

            {/* Sección 6: Control de Escalamiento */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">6. Control de Información</h3>
              
              <div className="space-y-4 p-4 border rounded-lg bg-accent/50">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">¿Puedo Entregar Información Requerida? *</Label>
                  <Select value={puedeEntregarInformacion} onValueChange={setPuedeEntregarInformacion}>
                    <SelectTrigger className="w-full md:w-1/2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Si">Sí</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Opciones de Escalamiento - Solo si NO puede entregar información */}
                {puedeEntregarInformacion === 'No' && (
                  <div className="space-y-4 p-4 border-2 border-warning rounded-lg bg-warning/5">
                    <div className="flex items-start gap-2">
                      <span className="text-warning text-2xl">⚠️</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-warning mb-2">Escalamiento Requerido</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Si no puedes entregar la información, debes escalar el caso a un supervisor o a otra área especializada.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Escalar a: *</Label>
                      <Select value={escaladoA} onValueChange={setEscaladoA}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona opción de escalamiento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SUPERVISOR">SUPERVISOR</SelectItem>
                          <SelectItem value="OTRA_AREA">OTRA ÁREA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Campo de Análisis del Analista - Solo si escaladoA es SUPERVISOR */}
                    {escaladoA === 'SUPERVISOR' && (
                      <div className="space-y-2 p-4 border-2 border-blue-200 rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                        <Label className="text-base font-semibold flex items-center gap-2">
                          📝 Análisis y Motivo del Escalamiento *
                        </Label>
                        <Textarea
                          value={analisisAnalista}
                          onChange={(e) => setAnalisisAnalista(e.target.value)}
                          placeholder="Proporciona un análisis detallado del caso y explica por qué necesitas escalar al supervisor:&#10;&#10;• Resumen de la solicitud del cliente&#10;• Qué has verificado hasta el momento&#10;• Por qué no puedes resolver (falta autorización, excede tu nivel, política especial, etc.)&#10;• Qué decisión o información necesitas del supervisor&#10;&#10;Ejemplo: 'Cliente solicita waiver por emergencia médica. He verificado el certificado médico adjunto que es válido. Requiero autorización de supervisor para procesar waiver especial ya que excede el límite de 7 días establecido en la política.'"
                          rows={8}
                          className="resize-none text-sm"
                          required
                        />
                        <div className="flex items-start gap-2 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-md text-xs">
                          <div className="mt-0.5">💡</div>
                          <div className="flex-1">
                            <p className="font-semibold mb-1">Sé específico y claro:</p>
                            <p>El supervisor usará esta información para evaluar y tomar una decisión. Incluye todos los detalles relevantes que ayuden a resolver el caso rápidamente.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Campo para nombre del área - Solo si escaladoA es OTRA_AREA */}
                    {escaladoA === 'OTRA_AREA' && (
                      <div className="space-y-2">
                        <Label>Nombre del Área a Escalar: *</Label>
                        <Input
                          value={nombreAreaEscalamiento}
                          onChange={(e) => setNombreAreaEscalamiento(e.target.value)}
                          placeholder="Ej: Finanzas, Comercial, Desarrollo, etc."
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Especifica el nombre del área o departamento que debe atender este caso
                        </p>
                      </div>
                    )}

                    <div className="p-3 bg-primary/5 rounded-md border border-primary/20">
                      <p className="text-sm">
                        <strong>Estado resultante:</strong>{' '}
                        {escaladoA === 'SUPERVISOR' && (
                          <span className="text-orange-600 font-semibold">PENDIENTE SUPERVISOR</span>
                        )}
                        {escaladoA === 'OTRA_AREA' && nombreAreaEscalamiento && (
                          <span className="text-purple-600 font-semibold">
                            PENDIENTE OTRA ÁREA ({nombreAreaEscalamiento})
                          </span>
                        )}
                        {!escaladoA && (
                          <span className="text-muted-foreground">Selecciona una opción de escalamiento</span>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sección 7: Información Brindada (Solo si puede entregarla) */}
            {puedeEntregarInformacion === 'Si' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">7. Información Brindada</h3>

              <div className="space-y-2">
                <Label>Información Brindada</Label>
                
                {/* Selector de Scripts */}
                {availableScripts.length > 0 && (
                  <div className="mb-4">
                    <ScriptSelector
                      scripts={availableScripts}
                      onSelectScript={handleApplyScript}
                      disabled={!tipoSolicitud && !reclamoIncidente}
                    />
                  </div>
                )}
                
                <Textarea
                  value={informacionBrindada}
                  onChange={(e) => setInformacionBrindada(e.target.value)}
                  placeholder="Información o respuesta brindada... Usa los scripts sugeridos arriba o escribe tu propia respuesta."
                  rows={8}
                />
                <p className="text-xs text-muted-foreground">
                  💡 Puedes usar los scripts sugeridos arriba según el tipo de solicitud o reclamo seleccionado
                </p>
              </div>
            </div>
            )}

            {/* Sección 8: Observaciones */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">{puedeEntregarInformacion === 'Si' ? '8' : '7'}. Observaciones Adicionales</h3>

              <div className="space-y-2">
                <Label>Observaciones</Label>
                <Textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Observaciones adicionales, notas internas, etc."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => navigate('/requirements')}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                size="lg"
                className={puedeEntregarInformacion === 'Si' ? 'bg-success hover:bg-success/90' : ''}
              >
                {puedeEntregarInformacion === 'Si' ? (
                  <>
                    ✅ Crear y Cerrar Caso
                  </>
                ) : (
                  'Crear Requerimiento'
                )}
              </Button>
            </div>
            
            {/* Información del botón */}
            {puedeEntregarInformacion === 'Si' && (
              <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-sm">
                <p className="font-semibold text-success mb-1">ℹ️ Crear y Cerrar Automáticamente</p>
                <p className="text-xs text-muted-foreground">
                  Al hacer click, el requerimiento se creará con estado <strong>CERRADO</strong> ya que proporcionaste la información necesaria al cliente.
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequirementFormSimple;

