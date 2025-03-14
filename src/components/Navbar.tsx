
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Home, ChefHat, Camera } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { path: '/calculator', icon: <Dumbbell className="w-5 h-5" />, label: 'Protein Calculator' },
    { path: '/analyze', icon: <Camera className="w-5 h-5" />, label: 'Analyze Fridge' },
    { path: '/recipes', icon: <ChefHat className="w-5 h-5" />, label: 'Recipes' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-2 glass-card border-t md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-around md:justify-between">
          <div className="hidden md:flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              GainChef
            </span>
          </div>
          
          <div className="flex items-center justify-around w-full md:w-auto md:justify-end md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ease-in-out
                  ${location.pathname === item.path 
                    ? 'text-primary' 
                    : 'text-foreground/60 hover:text-foreground'}`}
              >
                <div className="relative">
                  {item.icon}
                  {location.pathname === item.path && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full md:w-full md:h-0.5" />
                  )}
                </div>
                <span className="text-xs mt-1 md:hidden">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
