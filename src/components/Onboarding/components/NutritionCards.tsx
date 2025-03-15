
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CircularProgress from './CircularProgress';

interface NutritionCardsProps {
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
  onProteinAdjust: (value: number) => void;
  onCarbsAdjust: (value: number) => void;
  onFatsAdjust: (value: number) => void;
}

const NutritionCards: React.FC<NutritionCardsProps> = ({
  calories,
  carbs,
  protein,
  fats,
  onProteinAdjust,
  onCarbsAdjust,
  onFatsAdjust
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Card className="border-0 shadow-none bg-white">
        <CardContent className="p-2">
          <CircularProgress 
            label="Calories" 
            value={calories} 
            unit="" 
            color="hsl(var(--primary))" 
            percentage={70}
          />
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-none bg-white">
        <CardContent className="p-2">
          <CircularProgress 
            label="Carbs" 
            value={carbs} 
            unit="g" 
            color="hsl(var(--secondary))" 
            percentage={60}
            onAdjust={onCarbsAdjust}
          />
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-none bg-white">
        <CardContent className="p-2">
          <CircularProgress 
            label="Protein" 
            value={protein} 
            unit="g" 
            color="hsl(var(--accent))" 
            percentage={75}
            onAdjust={onProteinAdjust}
          />
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-none bg-white">
        <CardContent className="p-2">
          <CircularProgress 
            label="Fats" 
            value={fats} 
            unit="g" 
            color="hsl(var(--muted-foreground))" 
            percentage={50}
            onAdjust={onFatsAdjust}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionCards;
