import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Search, 
  X,
  Copy,
  Upload,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from 'sonner';
import { 
  getAllImages,
  uploadImage,
  deleteImage 
} from '@/lib/image_data';

interface Image {
  id: string;
  url: string;
  name: string;
  size: number;
  uploadedAt: string;
}

const AdminImageManagement: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirmImage, setDeleteConfirmImage] = useState<Image | null>(null);
  const [sortField, setSortField] = useState<keyof Image>('uploadedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const imageData = await getAllImages();
        setImages(imageData);
        if (imageData.length === 0) {
          toast.info('No images found in storage');
        }
      } catch (error) {
        console.error('Error loading images:', error);
        toast.error(`Failed to load images: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      const uploadedImage = await uploadImage(file);
      if (uploadedImage) {
        setImages(prev => [uploadedImage, ...prev]);
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
      // Reset the file input
      e.target.value = '';
    }
  };

  const handleDeleteConfirm = (image: Image) => {
    setDeleteConfirmImage(image);
  };

  const handleDelete = async (imageId: string) => {
    try {
      const success = await deleteImage(imageId);
      if (success) {
        setImages(prev => prev.filter(img => img.id !== imageId));
        setDeleteConfirmImage(null);
        toast.success('Image deleted successfully');
      } else {
        toast.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('URL copied to clipboard');
  };

  const handleSort = (field: keyof Image) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

const filteredImages = images
  .filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue && bValue && aValue.constructor === Date && bValue.constructor === Date) {
      return sortDirection === 'asc' 
        ? (aValue as Date).getTime() - (bValue as Date).getTime()
        : (bValue as Date).getTime() - (aValue as Date).getTime();
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } 

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Image Management</h2>
        <div className="relative">
  <PrimaryButton>
    <label htmlFor="image-upload" className="cursor-pointer flex items-center space-x-2">
      <Upload className="h-5 w-5" />
      <span>Upload Image</span>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        disabled={uploading}
      />
    </label>
  </PrimaryButton>
  {uploading && (
    <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-md">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
    </div>
  )}
</div>

      </div>
      
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search images..."
            className="pl-10"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Images Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('size')}
                >
                  <div className="flex items-center">
                    Size
                    {sortField === 'size' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('uploadedAt')}
                >
                  <div className="flex items-center">
                    Uploaded
                    {sortField === 'uploadedAt' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredImages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    {searchTerm ? (
                      <div>
                        <p className="text-gray-500">No images match your search term</p>
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="text-primary-600 hover:text-primary-800 mt-2"
                        >
                          Clear search
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-500">No images found</p>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredImages.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <div className="h-12 w-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                        <img 
                          src={image.url} 
                          alt={image.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <ImageIcon className="mr-2 h-4 w-4 text-gray-400" />
                        {image.name}
                      </div>
                    </TableCell>
                    <TableCell>{formatFileSize(image.size)}</TableCell>
                    <TableCell>{formatDate(image.uploadedAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="truncate max-w-xs inline-block">
                          {image.url}
                        </span>
                        <button
                          onClick={() => copyToClipboard(image.url)}
                          className="ml-2 p-1 text-gray-500 hover:text-primary-600"
                          title="Copy URL"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleDeleteConfirm(image)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      {deleteConfirmImage && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <div className="mb-4">
              <img 
                src={deleteConfirmImage.url} 
                alt={deleteConfirmImage.name}
                className="max-h-40 mx-auto mb-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                }}
              />
              <p className="text-center font-medium">{deleteConfirmImage.name}</p>
            </div>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this image? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmImage(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmImage.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminImageManagement;