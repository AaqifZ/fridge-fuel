
import React from 'react';
import { Dumbbell } from 'lucide-react';
import Dashboard from '@/components/Dashboard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pt-20 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 mt-6">
          <h1 className="flex items-center justify-center">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl font-bold">
              GainChef
            </span>
            <Dumbbell className="w-8 h-8 text-primary ml-2" />
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto mt-2">
            AI-powered recipes to help you hit your protein goals with what's in your fridge
          </p>
        </div>
        
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
