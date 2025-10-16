import { Badge } from '@/components/ui/badge';
import { GDSSystem } from '@/types/requirement';

interface GDSSystemBadgeProps {
  system: GDSSystem;
}

const GDSSystemBadge = ({ system }: GDSSystemBadgeProps) => {
  const systemConfig = {
    sabre: { label: 'Sabre', className: 'bg-red-500/10 text-red-600 hover:bg-red-500/20' },
    amadeus: { label: 'Amadeus', className: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20' },
    travelport: { label: 'Travelport', className: 'bg-green-500/10 text-green-600 hover:bg-green-500/20' },
    sirena: { label: 'Sirena', className: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20' },
    otro: { label: 'Otro', className: 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20' },
  };

  const config = systemConfig[system];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default GDSSystemBadge;

