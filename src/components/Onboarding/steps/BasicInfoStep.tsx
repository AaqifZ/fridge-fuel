
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicInfoStepProps {
  userDetails: {
    weight?: number;
    height?: number;
    age?: number;
    gender?: 'male' | 'female';
  };
  updateUserDetails: (details: Partial<typeof userDetails>) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ userDetails, updateUserDetails }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Basic Information</h2>
        <p className="text-muted-foreground mt-1">
          This helps us calculate your protein needs accurately
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={userDetails.weight || ''}
              onChange={(e) => updateUserDetails({ weight: parseFloat(e.target.value) || undefined })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="175"
              value={userDetails.height || ''}
              onChange={(e) => updateUserDetails({ height: parseFloat(e.target.value) || undefined })}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="30"
              value={userDetails.age || ''}
              onChange={(e) => updateUserDetails({ age: parseFloat(e.target.value) || undefined })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={userDetails.gender}
              onValueChange={(value) => updateUserDetails({ gender: value as 'male' | 'female' })}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
