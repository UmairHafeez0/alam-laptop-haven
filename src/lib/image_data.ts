import { Product } from './types';
import { supabase } from './supabase';

// PRODUCT CRUD OPERATIONS
export interface Image {
    id: string;
    url: string;
    name: string;
    size: number;
    uploadedAt: string; // Changed from uploaded_at to match component
    createdBy?: string; // Optional field
  }
  
  // IMAGE MANAGEMENT FUNCTIONS
  
  // Get all images from storage
  // IMAGE MANAGEMENT FUNCTIONS
  
  // Get all images from storage
  // In data.ts - update getAllImages
  export const getAllImages = async (): Promise<Image[]> => {
    try {
      console.log('Fetching images from Supabase...');
      
      const { data: files, error } = await supabase.storage
        .from('alamlaptops')
        .list('products', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });
      
      if (error) {
        console.error('Error fetching images:', error);
        throw error;
      }
      
      if (!files) {
        console.log('No images found');
        return [];
      }
  
      console.log(`Found ${files.length} images`);
  
      return files.map(file => {
        const image: Image = {
          id: file.name,
          url: supabase.storage
            .from('alamlaptops')
            .getPublicUrl(`products/${file.name}`).data.publicUrl,
          name: file.name,
          size: file.metadata?.size || 0,
          uploadedAt: file.created_at || new Date().toISOString(),
          createdBy: file.metadata?.uploadedBy
        };
  
        console.log(`Processed image: ${image.name}, Size: ${image.size}, Uploaded At: ${image.uploadedAt}`);
  
        return image;
      });
    } catch (error) {
      console.error('Error listing images:', error);
      return [];
    }
  };
  
  
  // Update uploadImage
  export const uploadImage = async (file: File, userId?: string): Promise<Image | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;
      
      const { error } = await supabase.storage
        .from('alamlaptops')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
          metadata: {
            uploadedBy: userId || 'anonymous',
            originalName: file.name
          }
        });
  
      if (error) throw error;
  
      return {
        id: fileName,
        url: supabase.storage.from('alamlaptops').getPublicUrl(filePath).data.publicUrl,
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        createdBy: userId || 'user'
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };
  
  // Delete image from storage
  export const deleteImage = async (imageName: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('alamlaptops')
        .remove([`products/${imageName}`]);
  
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  };
  
  // Get image metadata
  export const getImageMetadata = async (imageName: string): Promise<Image | null> => {
    try {
      // First get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('alamlaptops')
        .getPublicUrl(`products/${imageName}`);
  
      // Then get the file metadata from the list API
      const { data: files, error } = await supabase.storage
        .from('alamlaptops')
        .list('images', {
          limit: 1,
          offset: 0,
          search: imageName
        });
  
      if (error) throw error;
      if (!files || files.length === 0) return null;
  
      const file = files[0];
  
      return {
        id: file.name,
        url: publicUrl,
        name: file.name,
        size: file.metadata?.size || 0,
        uploadedAt: file.created_at || new Date().toISOString(),
        createdBy: file.metadata?.uploadedBy
      };
    } catch (error) {
      console.error('Error getting image metadata:', error);
      return null;
    }
  };
  
  