
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className,
  label,
  showPercentage = false,
  size = 'md',
  color = 'primary'
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };
  
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent'
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--progress-value', `${percentage}%`);
    }
  }, [percentage]);

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium">{percentage}%</span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", sizeClasses[size], className)}>
        <div
          ref={progressRef}
          className={cn("protein-progress-bar-fill", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
