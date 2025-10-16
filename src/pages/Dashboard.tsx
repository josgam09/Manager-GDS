import { useRequirements } from '@/contexts/RequirementContext';
import StatCard from '@/components/StatCard';
import RequirementStatusBadge from '@/components/RequirementStatusBadge';
import RequirementPriorityBadge from '@/components/RequirementPriorityBadge';
import GDSSystemBadge from '@/components/GDSSystemBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, TrendingUp, Plus, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { requirements } = useRequirements();

  const stats = {
    total: requirements.length,
    nuevo: requirements.filter(r => r.status === 'nuevo').length,
    enProceso: requirements.filter(r => r.status === 'en-proceso').length,
    resuelto: requirements.filter(r => r.status === 'resuelto').length,
    critica: requirements.filter(r => r.priority === 'critica').length,
  };

  // Estadísticas por sistema GDS
  const gdsSystems = {
    sabre: requirements.filter(r => r.gdsSystem === 'sabre').length,
    amadeus: requirements.filter(r => r.gdsSystem === 'amadeus').length,
    travelport: requirements.filter(r => r.gdsSystem === 'travelport').length,
    sirena: requirements.filter(r => r.gdsSystem === 'sirena').length,
  };

  const recentRequirements = requirements.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard - Manager GDS</h1>
          <p className="text-muted-foreground mt-1">
            Gestión centralizada de requerimientos GDS
          </p>
        </div>
        <Link to="/requirements/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Nuevo Requerimiento
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Requerimientos"
          value={stats.total}
          icon={TrendingUp}
          trend="+8% vs mes anterior"
          trendUp={true}
          color="primary"
        />
        <StatCard
          title="Nuevos"
          value={stats.nuevo}
          icon={AlertCircle}
          color="primary"
        />
        <StatCard
          title="En Proceso"
          value={stats.enProceso}
          icon={Clock}
          color="warning"
        />
        <StatCard
          title="Resueltos"
          value={stats.resuelto}
          icon={CheckCircle}
          color="success"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Requerimientos por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm">Nuevos</span>
                </div>
                <span className="font-semibold">{stats.nuevo}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-sm">En Proceso</span>
                </div>
                <span className="font-semibold">{stats.enProceso}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm">Pendiente Info</span>
                </div>
                <span className="font-semibold">
                  {requirements.filter(r => r.status === 'pendiente-informacion').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-sm">Resueltos</span>
                </div>
                <span className="font-semibold">{stats.resuelto}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                  <span className="text-sm">Cerrados</span>
                </div>
                <span className="font-semibold">
                  {requirements.filter(r => r.status === 'cerrado').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Sistemas GDS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Sabre</span>
                </div>
                <span className="font-semibold">{gdsSystems.sabre}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Amadeus</span>
                </div>
                <span className="font-semibold">{gdsSystems.amadeus}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Travelport</span>
                </div>
                <span className="font-semibold">{gdsSystems.travelport}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Sirena</span>
                </div>
                <span className="font-semibold">{gdsSystems.sirena}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Requerimientos Recientes</CardTitle>
          <Link to="/requirements">
            <Button variant="outline" size="sm">Ver Todos</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequirements.map((requirement) => (
              <Link
                key={requirement.id}
                to={`/requirements/${requirement.id}`}
                className="block p-4 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {requirement.ticketNumber}
                      </span>
                      <h3 className="font-semibold truncate">{requirement.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {requirement.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <RequirementStatusBadge status={requirement.status} />
                      <RequirementPriorityBadge priority={requirement.priority} />
                      <GDSSystemBadge system={requirement.gdsSystem} />
                      <span className="text-xs text-muted-foreground">
                        {requirement.organization}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(requirement.initialDate).toLocaleDateString('es-AR')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
