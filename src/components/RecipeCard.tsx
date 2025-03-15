import React from 'react';
import { Clock, Dumbbell, ChefHat } from 'lucide-react';
import { Recipe } from '@/hooks/useRecipes';
import Button from '@/components/Button';

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onViewRecipe }) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg animate-scale-in">
      <div className="aspect-video relative">
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
          <h3 className="text-white font-semibold text-xl">{recipe.name}</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{recipe.protein}g protein</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{recipe.time} min</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
            <span 
              key={index} 
              className="text-xs bg-muted px-2 py-1 rounded-full"
            >
              {ingredient}
            </span>
          ))}
          {recipe.ingredients.length > 4 && (
            <span className="text-xs bg-muted px-2 py-1 rounded-full">
              +{recipe.ingredients.length - 4} more
            </span>
          )}
        </div>
        
        <Button 
          onClick={() => onViewRecipe(recipe)} 
          className="w-full"
          variant="outline"
          icon={<ChefHat className="w-4 h-4" />}
        >
          View Recipe
        </Button>
      </div>
    </div>
  );
};

export default RecipeCard;
