
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChefHat, Clock, Cpu, Dumbbell, Flame, Check, ArrowLeft } from 'lucide-react';
import RecipeCard from '@/components/RecipeCard';
import Button from '@/components/Button';
import { useRecipes, Recipe } from '@/hooks/useRecipes';
import { useProteinCalculator } from '@/hooks/useProteinCalculator';
import { toast } from 'sonner';

const Recipes: React.FC = () => {
  const navigate = useNavigate();
  const { recipes, availableIngredients, generateRecipes, isLoading } = useRecipes();
  const { addConsumedProtein } = useProteinCalculator();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    if (availableIngredients.length === 0) {
      // No ingredients analyzed yet, redirect to analysis page
      navigate('/analyze');
    } else if (recipes.length === 0 && !isLoading) {
      // Generate recipes on initial load if we have ingredients but no recipes
      generateRecipes();
    }
  }, [availableIngredients, recipes, isLoading, navigate, generateRecipes]);
  
  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDialogOpen(true);
  };
  
  const handleLogProtein = () => {
    if (selectedRecipe) {
      addConsumedProtein(selectedRecipe.protein);
      toast.success(`Added ${selectedRecipe.protein}g of protein to your daily total`);
      setDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pt-20 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 mt-6">
          <h1 className="text-3xl font-bold">Protein-Optimized Recipes</h1>
          <p className="text-muted-foreground mt-2">
            High-protein recipes customized for your available ingredients
          </p>
        </div>
        
        {availableIngredients.length > 0 && (
          <div className="mb-6">
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">Available Ingredients</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {availableIngredients.map((ingredient, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-muted text-xs rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex">
                <Button 
                  onClick={() => navigate('/analyze')}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  icon={<ArrowLeft className="w-3 h-3 mr-1" />}
                >
                  Change Ingredients
                </Button>
                <Button 
                  onClick={generateRecipes}
                  isLoading={isLoading}
                  variant="outline"
                  size="sm"
                  className="ml-auto text-xs"
                >
                  Regenerate Recipes
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <ChefHat className="w-12 h-12 text-primary animate-pulse" />
              <div className="absolute top-0 right-0 p-1 rounded-full bg-secondary text-secondary-foreground">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">Creating protein-optimized recipes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onViewRecipe={handleViewRecipe} 
              />
            ))}
          </div>
        )}
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedRecipe && (
              <div className="space-y-6">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img 
                    src={selectedRecipe.image} 
                    alt={selectedRecipe.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
                  <p className="text-muted-foreground mt-1">{selectedRecipe.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="w-4 h-4 text-primary" />
                    <span>{selectedRecipe.protein}g protein</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>{selectedRecipe.calories} calories</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedRecipe.time} min</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                  <ul className="space-y-1.5">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-secondary mt-0.5" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="pl-6 relative">
                        <span className="absolute left-0 top-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs">
                          {index + 1}
                        </span>
                        <p>{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={handleLogProtein}
                  >
                    Log {selectedRecipe.protein}g Protein
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Recipes;
