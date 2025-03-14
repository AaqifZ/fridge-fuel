
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Dumbbell, Calculator, CircleCheck } from 'lucide-react';
import Button from './Button';
import { useProteinCalculator } from '@/hooks/useProteinCalculator';

interface FormData {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'maintenance' | 'cutting' | 'bulking';
}

const ProteinCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    weight: 70,
    height: 175,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintenance'
  });
  
  const [isCalculating, setIsCalculating] = useState(false);
  const { calculateProteinNeeds, setProteinTarget } = useProteinCalculator();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weight' || name === 'height' || name === 'age' ? Number(value) : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    setTimeout(() => {
      try {
        const proteinTarget = calculateProteinNeeds(
          formData.weight,
          formData.height,
          formData.age,
          formData.gender,
          formData.activityLevel,
          formData.goal
        );
        
        setProteinTarget(proteinTarget);
        toast.success(`Your daily protein target is ${proteinTarget}g`, {
          icon: <CircleCheck className="w-4 h-4 text-secondary" />
        });
      } catch (error) {
        toast.error('Failed to calculate protein needs');
      } finally {
        setIsCalculating(false);
      }
    }, 1000);
  };
  
  return (
    <div className="glass-card rounded-xl p-6 md:p-8 w-full max-w-md mx-auto animate-scale-in">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <Dumbbell className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Protein Calculator</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="weight" className="text-sm font-medium">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="30"
              max="200"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="height" className="text-sm font-medium">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="100"
              max="250"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="age" className="text-sm font-medium">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="16"
            max="100"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="gender" className="text-sm font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="activityLevel" className="text-sm font-medium">
            Activity Level
          </label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="sedentary">Sedentary (office job, little exercise)</option>
            <option value="light">Light Activity (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderate Activity (moderate exercise 3-5 days/week)</option>
            <option value="active">Very Active (hard exercise 6-7 days/week)</option>
            <option value="very-active">Extremely Active (training 2x/day)</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="goal" className="text-sm font-medium">
            Fitness Goal
          </label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="maintenance">Maintenance</option>
            <option value="cutting">Fat Loss</option>
            <option value="bulking">Muscle Gain</option>
          </select>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-6" 
          isLoading={isCalculating}
          icon={<Calculator className="w-4 h-4" />}
        >
          Calculate Protein Needs
        </Button>
      </form>
    </div>
  );
};

export default ProteinCalculator;
