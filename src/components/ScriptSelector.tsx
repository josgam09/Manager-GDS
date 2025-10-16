import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Sparkles, Check, Pencil } from 'lucide-react';
import { ResponseScript } from '@/data/responseScripts';

interface ScriptSelectorProps {
  scripts: ResponseScript[];
  onSelectScript: (content: string) => void;
  disabled?: boolean;
}

const ScriptSelector = ({ scripts, onSelectScript, disabled }: ScriptSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState<ResponseScript | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (scripts.length === 0 || disabled) {
    return null;
  }

  const handleScriptClick = (script: ResponseScript) => {
    setSelectedScript(script);
    setEditedContent(script.content);
    setIsDialogOpen(true);
  };

  const handleApplyScript = () => {
    setIsDialogOpen(false);
    setShowConfirmDialog(true);
  };

  const handleConfirmApply = () => {
    onSelectScript(editedContent);
    setShowConfirmDialog(false);
    setSelectedScript(null);
    setEditedContent('');
  };

  return (
    <>
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Scripts de Respuesta Sugeridos ({scripts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {scripts.map((script) => (
              <Button
                key={script.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 hover:bg-primary/10"
                onClick={() => handleScriptClick(script)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4" />
                    <span className="font-semibold">{script.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {script.content.substring(0, 80)}...
                  </p>
                  {script.tags && script.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {script.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog para editar el script */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              {selectedScript?.title}
            </DialogTitle>
            <DialogDescription>
              Revisa y personaliza el script antes de aplicarlo. Puedes modificar el texto según las necesidades del caso.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedScript?.tags && (
              <div className="flex gap-2">
                {selectedScript.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Edita el contenido del script:
              </label>
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={15}
                className="font-mono text-sm"
                placeholder="Escribe o edita la información brindada..."
              />
              <p className="text-xs text-muted-foreground">
                💡 Tip: Reemplaza los valores entre corchetes [  ] con la información específica del caso
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleApplyScript}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              Aplicar Script
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog de confirmación */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-warning" />
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Asegúrate que la información esté correcta antes de aplicar el script.
              <br /><br />
              <strong>Verifica que:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Has reemplazado todos los valores entre corchetes [ ]</li>
                <li>La información es específica para este caso</li>
                <li>El texto está completo y sin errores</li>
                <li>El tono es profesional y apropiado</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Revisar de nuevo
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmApply}>
              Confirmar y aplicar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ScriptSelector;

