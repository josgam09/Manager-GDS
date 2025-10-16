import { Badge } from '@/components/ui/badge';
import { RequirementStatus } from '@/types/requirement';

interface RequirementStatusBadgeProps {
  status: RequirementStatus;
}

const RequirementStatusBadge = ({ status }: RequirementStatusBadgeProps) => {
  const statusConfig = {
    nuevo: { label: 'Nuevo', className: 'bg-primary/10 text-primary hover:bg-primary/20' },
    'en-proceso': { label: 'En Proceso', className: 'bg-warning/10 text-warning hover:bg-warning/20' },
    'pendiente-informacion': { label: 'Pendiente Info', className: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20' },
    'pendiente-supervisor': { label: 'Pendiente Supervisor', className: 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20' },
    'pendiente-otra-area': { label: 'Pendiente Otra Área', className: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20' },
    resuelto: { label: 'Resuelto', className: 'bg-success/10 text-success hover:bg-success/20' },
    cerrado: { label: 'Cerrado', className: 'bg-muted text-muted-foreground hover:bg-muted' },
  };

  const config = statusConfig[status];

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};

export default RequirementStatusBadge;

