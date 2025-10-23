import React from 'react';
import { Link } from 'react-router-dom';
import { useRequirements } from '@/contexts/RequirementContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RequirementsTable from '@/components/RequirementsTable';
import { Plus, Home, List } from 'lucide-react';

const RequirementsList = () => {
  const { requirements } = useRequirements();

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lista de Requerimientos</h1>
          <p className="text-muted-foreground">
            Gestión completa de todos los requerimientos del sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/requirements/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Requerimiento
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabla de requerimientos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="h-5 w-5" />
            Todos los Requerimientos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RequirementsTable 
            requirements={requirements}
            title="Lista de Requerimientos"
            showFilters={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RequirementsList;