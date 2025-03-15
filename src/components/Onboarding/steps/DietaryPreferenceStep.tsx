
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Beef, Fish, Leaf, Carrot, Ban, CheckCircle2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

interface DietaryPreferenceStepProps {
  userDetails: {
    dietaryPreference?: 'classic' | 'pescatarian' | 'vegetarian' | 'vegan';
    glutenFree?: boolean;
    dairyFree?: boolean;
  };
  updateUserDetails: (details: Partial<DietaryPreferenceStepProps['userDetails']>) => void;
}

const DietaryPreferenceStep: React.FC<DietaryPreferenceStepProps> = ({ 
  userDetails, 
  updateUserDetails 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Your Dietary Preference</h2>
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
            <Label htmlFor="classic" className="font-medium cursor-pointer">Classic <span className="text-sm font-normal text-muted-foreground">(78% choose this)</span></Label>
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
      
      {/* Additional dietary restrictions */}
      <div className="mt-6 border-t pt-5">
        <h3 className="font-medium mb-3">Additional dietary restrictions</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-full bg-red-100 p-1.5 mr-3">
                <Ban className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="font-medium">Gluten-free</p>
                <p className="text-sm text-muted-foreground">Avoid all gluten-containing ingredients</p>
              </div>
            </div>
            <Switch 
              checked={userDetails.glutenFree || false}
              onCheckedChange={(checked) => updateUserDetails({ glutenFree: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-full bg-blue-100 p-1.5 mr-3">
                <Ban className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Dairy-free</p>
                <p className="text-sm text-muted-foreground">Avoid all milk-based ingredients</p>
              </div>
            </div>
            <Switch 
              checked={userDetails.dairyFree || false}
              onCheckedChange={(checked) => updateUserDetails({ dairyFree: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietaryPreferenceStep;
