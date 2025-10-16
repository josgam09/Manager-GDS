import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { Requirement } from '@/types/requirement';
import { toast } from 'sonner';

interface SupervisorActionPanelProps {
  requirement: Requirement;
  onAction: (
    action: 'autorizar_analista' | 'resolver_directo',
    respuesta: string,
    informacionBrindada?: string
  ) => void;
}

const SupervisorActionPanel = ({ requirement, onAction }: SupervisorActionPanelProps) => {
  const [accion, setAccion] = useState<'autorizar_analista' | 'resolver_directo'>('autorizar_analista');
  const [respuestaSupervisor, setRespuestaSupervisor] = useState('');
  const [informacionBrindada, setInformacionBrindada] = useState('');

  const handleSubmit = () => {
    if (!respuestaSupervisor.trim()) {
      toast.error('Por favor escribe una respuesta');
      return;
    }

    if (accion === 'resolver_directo' && !informacionBrindada.trim()) {
      toast.error('Por favor proporciona la información para resolver el caso');
      return;
    }

    if (confirm(`¿Confirmas que deseas ${accion === 'autorizar_analista' ? 'autorizar al analista' : 'resolver el caso directamente'}?`)) {
      onAction(accion, respuestaSupervisor, accion === 'resolver_directo' ? informacionBrindada : undefined);
    }
  };

  // Si el supervisor ya respondió, mostrar el resumen
  if (requirement.accionSupervisor) {
    return (
      <Card className="border-success">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            Acción del Supervisor Completada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Acción Tomada:</Label>
            <Badge variant={requirement.accionSupervisor === 'resolver_directo' ? 'default' : 'secondary'} className="ml-2">
              {requirement.accionSupervisor === 'autorizar_analista' 
                ? 'Autorizado al Analista' 
                : 'Resuelto por Supervisor'}
            </Badge>
          </div>
          
          {requirement.respuestaSupervisor && (
            <div>
              <Label>Respuesta del Supervisor:</Label>
              <p className="mt-2 p-3 bg-muted rounded-lg whitespace-pre-wrap">
                {requirement.respuestaSupervisor}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Panel de Acción del Supervisor
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Este caso fue escalado porque el analista no pudo proporcionar la información requerida
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selección de Acción */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">¿Qué acción deseas tomar?</Label>
          <RadioGroup value={accion} onValueChange={(value: any) => setAccion(value)}>
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer">
              <RadioGroupItem value="autorizar_analista" id="autorizar" />
              <div className="flex-1">
                <Label htmlFor="autorizar" className="cursor-pointer font-medium flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                  Autorizar al Analista para Resolver
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Proporciona instrucciones/autorización al analista para que brinde la información y cierre el caso
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer">
              <RadioGroupItem value="resolver_directo" id="resolver" />
              <div className="flex-1">
                <Label htmlFor="resolver" className="cursor-pointer font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Resolver el Caso Directamente
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Tú proporcionas la información al cliente y cierras el caso
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Respuesta del Supervisor */}
        <div className="space-y-2">
          <Label htmlFor="respuesta">
            {accion === 'autorizar_analista' 
              ? 'Instrucciones/Autorización para el Analista *' 
              : 'Notas del Supervisor *'}
          </Label>
          <Textarea
            id="respuesta"
            value={respuestaSupervisor}
            onChange={(e) => setRespuestaSupervisor(e.target.value)}
            placeholder={
              accion === 'autorizar_analista'
                ? 'Ej: Autorizo el waiver solicitado. El analista puede proceder con código WAIVE123...'
                : 'Ej: He revisado el caso y procedo a resolverlo directamente...'
            }
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {accion === 'autorizar_analista' 
              ? 'Estas instrucciones serán visibles para el analista asignado'
              : 'Estas notas quedarán registradas en el historial del caso'}
          </p>
        </div>

        {/* Campo adicional si resuelve directamente */}
        {accion === 'resolver_directo' && (
          <div className="space-y-2 p-4 bg-success/5 border border-success/20 rounded-lg">
            <Label htmlFor="info-cliente">Información Brindada al Cliente *</Label>
            <Textarea
              id="info-cliente"
              value={informacionBrindada}
              onChange={(e) => setInformacionBrindada(e.target.value)}
              placeholder="Escribe la información/solución que proporcionaste al cliente..."
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Esta información será guardada como la resolución oficial del caso
            </p>
          </div>
        )}

        {/* Botones de Acción */}
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleSubmit}
            className="flex-1 gap-2"
            size="lg"
          >
            {accion === 'autorizar_analista' ? (
              <>
                <UserCheck className="h-5 w-5" />
                Autorizar al Analista
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Resolver y Cerrar Caso
              </>
            )}
          </Button>
        </div>

        {/* Información adicional */}
        <div className="p-3 bg-muted rounded-lg text-xs">
          <p className="font-medium mb-1">ℹ️ Información:</p>
          {accion === 'autorizar_analista' ? (
            <>
              <p>• El caso cambiará a estado "RESPUESTA SUPERVISOR" 🔵</p>
              <p>• El analista recibirá tus instrucciones/autorización</p>
              <p>• El analista podrá proceder y cerrar el caso</p>
            </>
          ) : (
            <>
              <p>• El caso se marcará como "CERRADO" ⚫</p>
              <p>• Tú serás registrado como quien resolvió el caso</p>
              <p>• El caso quedará cerrado definitivamente</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupervisorActionPanel;

