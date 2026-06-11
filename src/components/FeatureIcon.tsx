import * as LucideIcons from 'lucide-react';

interface FeatureIconProps {
  name: string;
  className?: string;
}

export default function FeatureIcon({ name, className = 'w-6 h-6' }: FeatureIconProps) {
  // Fallback to Music if icon is not found
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Music;
  return <IconComponent className={className} />;
}
