
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Beef, Fish, Leaf, Carrot } from 'lucide-react';

interface DietaryPreferenceStepProps {
  userDetails: {
    dietaryPreference?: 'classic' | 'pescatarian' | 'vegetarian' | 'vegan';
  };
  updateUserDetails: (details: Partial<DietaryPreferenceStepProps['userDetails']>) => void;
}

const DietaryPreferenceStep: React.FC<DietaryPreferenceStepProps> = ({ 
  userDetails, 
  updateUserDetails 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Your Dietary Preference</h2>
        <p className="text-muted-foreground mt-1">
          This helps us tailor your protein recommendations to your eating style
        </p>
      </div>
      
      <RadioGroup
        className="space-y-3"
        value={userDetails.dietaryPreference || 'classic'}
        onValueChange={(value: 'classic' | 'pescatarian' | 'vegetarian' | 'vegan') => 
          updateUserDetails({ dietaryPreference: value })
        }
      >
        <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => updateUserDetails({ dietaryPreference: 'classic' })}>
          <RadioGroupItem value="classic" id="classic" className="mr-2" />
          <div className="flex-shrink-0 rounded-full bg-orange-100 p-1.5 mr-3">
            <Beef className="h-5 w-5 text-orange-500" />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor="classic" className="font-medium cursor-pointer">Classic</Label>
            <p className="text-sm text-muted-foreground">Includes all animal proteins and plant-based options</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => updateUserDetails({ dietaryPreference: 'pescatarian' })}>
          <RadioGroupItem value="pescatarian" id="pescatarian" className="mr-2" />
          <div className="flex-shrink-0 rounded-full bg-blue-100 p-1.5 mr-3">
            <Fish className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor="pescatarian" className="font-medium cursor-pointer">Pescatarian</Label>
            <p className="text-sm text-muted-foreground">Fish, seafood, and plant-based proteins</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => updateUserDetails({ dietaryPreference: 'vegetarian' })}>
          <RadioGroupItem value="vegetarian" id="vegetarian" className="mr-2" />
          <div className="flex-shrink-0 rounded-full bg-green-100 p-1.5 mr-3">
            <Leaf className="h-5 w-5 text-green-500" />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor="vegetarian" className="font-medium cursor-pointer">Vegetarian</Label>
            <p className="text-sm text-muted-foreground">Plant proteins with eggs and dairy products</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => updateUserDetails({ dietaryPreference: 'vegan' })}>
          <RadioGroupItem value="vegan" id="vegan" className="mr-2" />
          <div className="flex-shrink-0 rounded-full bg-green-100 p-1.5 mr-3">
            <Carrot className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor="vegan" className="font-medium cursor-pointer">Vegan</Label>
            <p className="text-sm text-muted-foreground">Exclusively plant-based protein sources</p>
          </div>
        </div>
      </RadioGroup>
      
      <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm">
        <p className="font-medium mb-1">Your choice affects protein recommendations:</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>• We'll adjust meal suggestions to match your preference</li>
          <li>• You'll still reach your protein goals with delicious options</li>
          <li>• You can change this preference later in settings</li>
        </ul>
      </div>
    </div>
  );
};

export default DietaryPreferenceStep;
