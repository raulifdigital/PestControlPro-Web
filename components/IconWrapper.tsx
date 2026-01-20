
import React from 'react';
import { Home, ShieldCheck, Building2, Bug, Zap, Droplets, CreditCard, Banknote, HelpCircle } from 'lucide-react';

interface IconWrapperProps {
  name: string;
  className?: string;
  size?: number;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ name, className, size = 24 }) => {
  const icons: Record<string, React.ElementType> = {
    Home,
    ShieldCheck,
    Building2,
    Bug,
    Zap,
    Droplets,
    CreditCard,
    Banknote,
    HelpCircle
  };

  const IconComponent = icons[name] || HelpCircle;
  return <IconComponent className={className} size={size} />;
};

export default IconWrapper;
