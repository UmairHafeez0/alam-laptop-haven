import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/lib/types';

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product | null;
  mode: 'add' | 'edit';
  onImageUpload: (file: File) => Promise<string | null>;
  onImageDelete: (imageUrl: string) => Promise<boolean>;
  imageUploading: boolean;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  mode,
  onImageUpload,
  onImageDelete,
  imageUploading
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      slug: '',
      brand: '',
      category: '',
      image: '',
      images: [''],
      price: 0,
      originalPrice: undefined,
      status: 'In Stock',
      processor: '',
      ram: '',
      storage: '',
      display: '',
      graphics: '',
      battery: '',
      weight: '',
      ports: '',
      os: '',
      warranty: '',
      isNew: false,
      isFeatured: false,
      description: '',
      features: [''],
    }
  );

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        image: product.image || (product.images && product.images.length > 0 ? product.images[0] : '')
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price' || name === 'originalPrice') {
      setFormData(prev => ({ ...prev, [name]: value ? Number(value) : undefined }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...(formData.images || [''])];
    newImages[index] = value;
    setFormData(prev => ({ 
      ...prev, 
      images: newImages,
      // Update main image if changing the first image
      image: index === 0 ? value : prev.image
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({ 
      ...prev, 
      images: [...(prev.images || []), ''] 
    }));
  };

  const removeImageField = async (index: number) => {
    const imageToRemove = formData.images?.[index] || '';
    const isUrl = imageToRemove.startsWith('http');
    
    if (isUrl) {
      const success = await onImageDelete(imageToRemove);
      if (!success) return;
    }
    
    const newImages = [...(formData.images || [''])];
    newImages.splice(index, 1);
    
    setFormData(prev => ({ 
      ...prev, 
      images: newImages,
      // Update main image if removing the first image
      image: index === 0 ? (newImages.length > 0 ? newImages[0] : '') : prev.image
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [''])];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({ 
      ...prev, 
      features: [...(prev.features || []), ''] 
    }));
  };

  const removeFeatureField = (index: number) => {
    const newFeatures = [...(formData.features || [''])];
    newFeatures.splice(index, 1);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    const images = formData.images || [];
    const mainImage = formData.image || (images.length > 0 ? images[0] : '');
    
    const productData = {
      ...formData,
      image: mainImage,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
    } as Product;
    
    onSave(productData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {mode === 'add' ? 'Add New Product' : 'Edit Product'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug (auto-generated if empty)
              </label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand *
              </label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Select Category</option>
                <option value="ultrabook">Ultrabook</option>
                <option value="gaming">Gaming</option>
                <option value="business">Business</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (Rs.) *
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Original Price (Rs.)
              </label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                value={formData.originalPrice || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status || 'In Stock'}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="processor" className="block text-sm font-medium text-gray-700 mb-1">
                Processor
              </label>
              <Input
                id="processor"
                name="processor"
                value={formData.processor || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-1">
                RAM
              </label>
              <Input
                id="ram"
                name="ram"
                value={formData.ram || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-1">
                Storage
              </label>
              <Input
                id="storage"
                name="storage"
                value={formData.storage || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="display" className="block text-sm font-medium text-gray-700 mb-1">
                Display
              </label>
              <Input
                id="display"
                name="display"
                value={formData.display || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="graphics" className="block text-sm font-medium text-gray-700 mb-1">
                Graphics
              </label>
              <Input
                id="graphics"
                name="graphics"
                value={formData.graphics || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="battery" className="block text-sm font-medium text-gray-700 mb-1">
                Battery
              </label>
              <Input
                id="battery"
                name="battery"
                value={formData.battery || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight
              </label>
              <Input
                id="weight"
                name="weight"
                value={formData.weight || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="ports" className="block text-sm font-medium text-gray-700 mb-1">
                Ports
              </label>
              <Input
                id="ports"
                name="ports"
                value={formData.ports || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="os" className="block text-sm font-medium text-gray-700 mb-1">
                Operating System
              </label>
              <Input
                id="os"
                name="os"
                value={formData.os || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="warranty" className="block text-sm font-medium text-gray-700 mb-1">
                Warranty
              </label>
              <Input
                id="warranty"
                name="warranty"
                value={formData.warranty || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="isNew"
                  name="isNew"
                  type="checkbox"
                  checked={formData.isNew || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-alam-600 focus:ring-alam-500"
                />
                <label htmlFor="isNew" className="ml-2 block text-sm text-gray-900">
                  Mark as New
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="isFeatured"
                  name="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-alam-600 focus:ring-alam-500"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                  Featured Product
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <div className="flex space-x-2">
                <label className="flex items-center text-sm text-alam-600 hover:text-alam-800 cursor-pointer">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload Image
                  <input 
                    type="file" 
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const imageUrl = await onImageUpload(file);
                        if (imageUrl) {
                          const newImages = [...(formData.images || []), imageUrl];
                          setFormData(prev => ({ 
                            ...prev, 
                            images: newImages,
                            image: prev.image || imageUrl
                          }));
                        }
                      }
                    }}
                    disabled={imageUploading}
                  />
                </label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="flex items-center text-sm text-alam-600 hover:text-alam-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add URL
                </button>
              </div>
            </div>
            
            {imageUploading && (
              <div className="mb-2 text-sm text-gray-500">Uploading image...</div>
            )}
            
            {(formData.images || []).map((image, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Enter image URL"
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                  disabled={imageUploading}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Features
              </label>
              <button
                type="button"
                onClick={addFeatureField}
                className="flex items-center text-sm text-alam-600 hover:text-alam-800"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </button>
            </div>
            
            {(formData.features || []).map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Enter product feature"
                  className="flex-1"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeFeatureField(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-alam-600 rounded-md hover:bg-alam-700"
            >
              {mode === 'add' ? 'Add Product' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};