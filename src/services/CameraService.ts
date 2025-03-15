
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface CameraPhoto {
  base64String: string;
  format: string;
}

export class CameraService {
  public async takePicture(): Promise<CameraPhoto> {
    try {
      // Take a photo using the device's camera
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      
      return {
        base64String: image.base64String || '',
        format: image.format
      };
    } catch (error) {
      console.error('Error taking photo:', error);
      throw error;
    }
  }

  public async getGalleryPhoto(): Promise<CameraPhoto> {
    try {
      // Get a photo from the gallery
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });
      
      return {
        base64String: image.base64String || '',
        format: image.format
      };
    } catch (error) {
      console.error('Error selecting photo from gallery:', error);
      throw error;
    }
  }
}

// Create a singleton instance to be used throughout the app
export const cameraService = new CameraService();
