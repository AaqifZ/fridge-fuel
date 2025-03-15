
import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';

interface CircularProgressProps { 
  label: string; 
  value: number; 
  unit: string; 
  color?: string; 
  percentage?: number;
  onAdjust?: (newValue: number) => void;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  label, 
  value, 
  unit, 
  color = "hsl(var(--primary))", 
  percentage = 75,
  onAdjust
}) => {
  const size = 80;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  
  useEffect(() => {
    setEditValue(value);
  }, [value]);
  
  const handleEdit = () => {
    if (!onAdjust) return;
    
    if (isEditing) {
      onAdjust(editValue);
    }
    setIsEditing(!isEditing);
  };
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setEditValue(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm font-medium mb-1">
        {label}
      </p>
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          {isEditing && onAdjust ? (
            <input
              type="number"
              value={editValue}
              onChange={handleValueChange}
              className="w-12 text-center bg-transparent border-b border-primary text-sm font-semibold"
              autoFocus
              onBlur={() => {
                onAdjust(editValue);
                setIsEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onAdjust(editValue);
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <span className="text-sm font-semibold">{value}{unit}</span>
          )}
        </div>
        {onAdjust && (
          <div className="absolute bottom-0 right-0">
            <Pencil 
              size={14} 
              className="text-muted-foreground hover:text-primary cursor-pointer" 
              onClick={handleEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
