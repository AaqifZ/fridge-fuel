
import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw, Trash2, Refrigerator } from 'lucide-react';
import Button from '@/components/Button';
import { toast } from 'sonner';

interface RefrigeratorAnalysisProps {
  onAnalysisComplete: (ingredients: string[]) => void;
}

const RefrigeratorAnalysis: React.FC<RefrigeratorAnalysisProps> = ({ onAnalysisComplete }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const mockIngredients = [
    'Chicken breast',
    'Eggs',
    'Greek yogurt',
    'Cottage cheese',
    'Salmon',
    'Spinach',
    'Bell peppers',
    'Quinoa',
    'Sweet potatoes',
    'Almonds'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const analyzeImage = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call for ingredient detection
    setTimeout(() => {
      onAnalysisComplete(mockIngredients);
      setIsAnalyzing(false);
      toast.success('Refrigerator analyzed successfully!');
    }, 2000);
  };
  
  const retakePhoto = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 md:p-8 w-full max-w-lg mx-auto animate-scale-in">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <Refrigerator className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Refrigerator Analysis</h2>
      </div>
      
      <div className="space-y-4">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="sr-only"
        />
        
        {!image ? (
          <div 
            onClick={triggerFileInput}
            className="relative w-full aspect-video bg-muted rounded-lg flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-300"
          >
            <Camera className="w-10 h-10 text-primary/50 mb-2" />
            <p className="text-center text-sm text-muted-foreground">
              Take a photo of your refrigerator<br />or click to upload an image
            </p>
          </div>
        ) : (
          <div className="relative w-full rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt="Refrigerator" 
              className="w-full aspect-video object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-end space-x-2">
              <Button 
                size="sm"
                variant="outline"
                className="bg-background/80 backdrop-blur-sm"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={retakePhoto}
              >
                Retake
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex flex-col space-y-2">
          <Button
            onClick={triggerFileInput}
            className="w-full"
            variant="outline"
            icon={<Upload className="w-4 h-4" />}
            disabled={isAnalyzing}
          >
            {image ? 'Choose Different Image' : 'Upload Image'}
          </Button>
          
          <Button
            onClick={analyzeImage}
            className="w-full"
            isLoading={isAnalyzing}
            disabled={!image || isAnalyzing}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
          </Button>
        </div>
        
        {isAnalyzing && (
          <div className="text-center text-sm text-muted-foreground mt-2">
            Our AI is identifying ingredients in your refrigerator...
          </div>
        )}
      </div>
    </div>
  );
};

export default RefrigeratorAnalysis;
