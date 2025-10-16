import { Badge } from '@/components/ui/badge';
import { RequirementPriority } from '@/types/requirement';

interface RequirementPriorityBadgeProps {
  priority: RequirementPriority;
}

const RequirementPriorityBadge = ({ priority }: RequirementPriorityBadgeProps) => {
  const priorityConfig = {
    baja: { label: 'Baja', className: 'bg-muted text-muted-foreground hover:bg-muted' },
    media: { label: 'Media', className: 'bg-primary/10 text-primary hover:bg-primary/20' },
    alta: { label: 'Alta', className: 'bg-warning/10 text-warning hover:bg-warning/20' },
    critica: { label: 'Crítica', className: 'bg-destructive/10 text-destructive hover:bg-destructive/20' },
  };

  const config = priorityConfig[priority];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default RequirementPriorityBadge;

