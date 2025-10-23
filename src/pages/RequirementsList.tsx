import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Download, Home } from 'lucide-react';
import { toast } from 'sonner';

const RequirementsList = () => {
  const { requirements } = useRequirements();
  const [search, setSearch] = useState('');

  // Función simple para filtrar
  const filteredRequirements = requirements.filter((requirement) => {
    if (!search) return true;
    const searchTerm = search.toLowerCase();
    return (
      (requirement.ticketNumber && requirement.ticketNumber.toLowerCase().includes(searchTerm)) ||
      (requirement.nombreAsesor && requirement.nombreAsesor.toLowerCase().includes(searchTerm)) ||
      (requirement.solicitudCliente && requirement.solicitudCliente.toLowerCase().includes(searchTerm)) ||
      (requirement.pnrTktLocalizador && requirement.pnrTktLocalizador.toLowerCase().includes(searchTerm))
    );
  });

  const exportToCSV = () => {
    if (!filteredRequirements || filteredRequirements.length === 0) {
      toast.error('No hay datos para exportar');
      return;
    }

    const headers = [
      'Ticket', 'Asesor', 'Origen', 'Estado', 'Prioridad', 'Fecha', 'Descripción'
    ];
    
    const rows = filteredRequirements.map(req => [
      req.ticketNumber || '',
      req.nombreAsesor || '',
      req.origenConsulta || '',
      req.status || '',
      req.priority || '',
      req.initialDate ? new Date(req.initialDate).toLocaleDateString('es-AR') : '',
      req.solicitudCliente || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `requerimientos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Archivo CSV descargado exitosamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex gap-2 mb-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Inicio
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Requerimientos GDS</h1>
          <p className="text-muted-foreground mt-1">
            Administra y da seguimiento a todos los requerimientos
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
          <Link to="/requirements/new">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Nuevo Requerimiento
            </Button>
          </Link>
        </div>
      </div>

      {/* Información de debug */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium">Total Requerimientos:</p>
              <p className="text-2xl font-bold">{requirements.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Filtrados:</p>
              <p className="text-2xl font-bold">{filteredRequirements.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Tipo de datos:</p>
              <p className="text-sm">{Array.isArray(requirements) ? 'Array' : typeof requirements}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Búsqueda simple */}
      <Card>
        <CardHeader>
          <CardTitle>Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ticket, asesor, PNR..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de requerimientos */}
      <Card>
        <CardHeader>
          <CardTitle>Requerimientos ({filteredRequirements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredRequirements.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {requirements.length === 0 
                    ? 'No hay requerimientos disponibles' 
                    : 'No se encontraron requerimientos con la búsqueda aplicada'
                  }
                </p>
                {requirements.length === 0 && (
                  <Link to="/requirements/new">
                    <Button className="mt-4">Crear Primer Requerimiento</Button>
                  </Link>
                )}
              </div>
            ) : (
              filteredRequirements.map((requirement) => (
                <Link
                  key={requirement.id}
                  to={`/requirements/${requirement.id}`}
                  className="block p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                          {requirement.ticketNumber || 'Sin ticket'}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {requirement.origenConsulta || 'Sin origen'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {requirement.status || 'Sin estado'}
                        </Badge>
                        <Badge 
                          variant={requirement.priority === 'critica' ? 'destructive' : 'outline'} 
                          className="text-xs"
                        >
                          {requirement.priority || 'Sin prioridad'}
                        </Badge>
                        {requirement.esSoporteIngles && (
                          <Badge variant="secondary" className="text-xs">EN</Badge>
                        )}
                      </div>
                      <h3 className="font-semibold mb-1">
                        {requirement.tipoSolicitud || 'Requerimiento GDS'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {requirement.solicitudCliente || 'Sin descripción'}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="text-muted-foreground">
                          PNR: {requirement.pnrTktLocalizador || 'N/A'}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          Asesor: {requirement.nombreAsesor || 'N/A'}
                        </span>
                        {requirement.pais && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">
                              País: {requirement.pais}
                            </span>
                          </>
                        )}
                        {requirement.motivo && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">
                              Motivo: {requirement.motivo}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                      <div>
                        {requirement.initialDate 
                          ? new Date(requirement.initialDate).toLocaleDateString('es-AR')
                          : 'Sin fecha'
                        }
                      </div>
                      <div className="text-xs mt-1">
                        {requirement.horaIngresoCorreo || 'Sin hora'}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequirementsList;