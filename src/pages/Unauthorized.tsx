import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-destructive/5 to-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl">Acceso No Autorizado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              No tienes permisos para acceder a esta sección.
            </p>
            {user && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Tu rol actual:</strong> {user.role}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Esta página requiere permisos de nivel superior.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate('/')} className="w-full gap-2">
              <Home className="h-4 w-4" />
              Ir al Dashboard
            </Button>
            <Button onClick={() => navigate(-1)} variant="outline" className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver Atrás
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;







