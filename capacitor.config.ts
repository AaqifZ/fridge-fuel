
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0fbde713b3fa40d89e84a6eb67bcbed6',
  appName: 'fridge-fuel',
  webDir: 'dist',
  server: {
    url: 'https://0fbde713-b3fa-40d8-9e84-a6eb67bcbed6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      fullScreen: true,
      includeBase64: true
    }
  }
};

export default config;
