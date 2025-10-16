import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, PlusCircle, FileText, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type FieldType = 'texto' | 'area-texto' | 'lista' | 'fecha' | 'numero';
type FieldCategory = 'requerimiento' | 'usuario' | 'sistema';

interface CustomField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  category: FieldCategory;
  isRequired: boolean;
  isActive: boolean;
  options?: string[]; // Para campos tipo lista
  createdAt: Date;
}

const FieldManagement = () => {
  const navigate = useNavigate();
  
  const [fields, setFields] = useState<CustomField[]>([
    {
      id: '1',
      name: 'prioridad_comercial',
      label: 'Prioridad Comercial',
      type: 'lista',
      category: 'requerimiento',
      isRequired: false,
      isActive: true,
      options: ['VIP', 'Premium', 'Regular'],
      createdAt: new Date('2025-01-01'),
    },
  ]);

  const [newField, setNewField] = useState({
    name: '',
    label: '',
    type: 'texto' as FieldType,
    category: 'requerimiento' as FieldCategory,
    isRequired: false,
  });

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();

    const field: CustomField = {
      id: Date.now().toString(),
      ...newField,
      isActive: true,
      createdAt: new Date(),
    };

    setFields([...fields, field]);
    setNewField({ name: '', label: '', type: 'texto', category: 'requerimiento', isRequired: false });
    toast.success(`Campo "${field.label}" creado exitosamente`);
  };

  const toggleFieldStatus = (id: string) => {
    setFields(fields.map(f =>
      f.id === id ? { ...f, isActive: !f.isActive } : f
    ));
    const field = fields.find(f => f.id === id);
    toast.success(`Campo ${field!.isActive ? 'desactivado' : 'activado'}`);
  };

  const deleteField = (id: string) => {
    const field = fields.find(f => f.id === id);
    if (confirm(`¿Eliminar el campo "${field?.label}"?`)) {
      setFields(fields.filter(f => f.id !== id));
      toast.success('Campo eliminado');
    }
  };

  const getFieldTypeBadge = (type: FieldType) => {
    const config = {
      'texto': { label: 'Texto', class: 'bg-blue-500/10 text-blue-600' },
      'area-texto': { label: 'Área Texto', class: 'bg-purple-500/10 text-purple-600' },
      'lista': { label: 'Lista', class: 'bg-green-500/10 text-green-600' },
      'fecha': { label: 'Fecha', class: 'bg-orange-500/10 text-orange-600' },
      'numero': { label: 'Número', class: 'bg-pink-500/10 text-pink-600' },
    };
    return config[type];
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <Button onClick={() => navigate('/admin')} variant="outline" className="gap-2 mb-3">
          <ArrowLeft className="h-4 w-4" />
          Volver al Panel
        </Button>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <FileText className="h-8 w-8" />
          Gestión de Campos
        </h1>
        <p className="text-muted-foreground mt-1">
          Crea y administra campos personalizados para el formulario
        </p>
      </div>

      {/* Crear Campo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Crear Nuevo Campo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateField} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nombre del Campo *</Label>
                <Input
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  placeholder="nombre_campo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Etiqueta (Label) *</Label>
                <Input
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  placeholder="Nombre del Campo"
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Tipo de Campo *</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => setNewField({ ...newField, type: value as FieldType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="texto">Texto</SelectItem>
                    <SelectItem value="area-texto">Área de Texto</SelectItem>
                    <SelectItem value="lista">Lista Desplegable</SelectItem>
                    <SelectItem value="fecha">Fecha</SelectItem>
                    <SelectItem value="numero">Número</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Categoría *</Label>
                <Select
                  value={newField.category}
                  onValueChange={(value) => setNewField({ ...newField, category: value as FieldCategory })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="requerimiento">Requerimiento</SelectItem>
                    <SelectItem value="usuario">Usuario</SelectItem>
                    <SelectItem value="sistema">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Campo Requerido
                  <Switch
                    checked={newField.isRequired}
                    onCheckedChange={(checked) => setNewField({ ...newField, isRequired: checked })}
                  />
                </Label>
                <div className="text-sm text-muted-foreground pt-2">
                  {newField.isRequired ? 'Obligatorio' : 'Opcional'}
                </div>
              </div>
            </div>
            <Button type="submit" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Crear Campo
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Campos */}
      <Card>
        <CardHeader>
          <CardTitle>Campos Personalizados ({fields.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fields.map((field) => {
              const typeBadge = getFieldTypeBadge(field.type);
              return (
                <div
                  key={field.id}
                  className={`p-4 rounded-lg border ${
                    field.isActive ? 'bg-card' : 'bg-muted/50 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{field.label}</h3>
                        <code className="text-xs bg-muted px-2 py-1 rounded">{field.name}</code>
                        {field.isRequired && (
                          <Badge variant="destructive" className="text-xs">REQUERIDO</Badge>
                        )}
                        {!field.isActive && (
                          <Badge variant="secondary" className="text-xs">INACTIVO</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={typeBadge.class}>{typeBadge.label}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {field.category}
                        </Badge>
                        {field.options && (
                          <span className="text-xs text-muted-foreground">
                            {field.options.length} opciones
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={field.isActive}
                          onCheckedChange={() => toggleFieldStatus(field.id)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteField(field.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldManagement;

