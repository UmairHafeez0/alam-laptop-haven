import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  X,
  ChevronDown,
  ChevronUp,
  Upload
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
import { ProductDialog } from '@/components/admin/ProductDialog';
import { 
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteProductImage
} from '@/lib/data';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

const AdminProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<Product | null>(null);
  const [sortField, setSortField] = useState<keyof Product>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = () => {
    setDialogMode('add');
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setDialogMode('edit');
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = (product: Product) => {
    setDeleteConfirmProduct(product);
  };

  const handleDelete = async (productId: string) => {
    try {
      const success = await deleteProduct(productId);
      if (success) {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        setDeleteConfirmProduct(null);
        toast.success('Product deleted successfully');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    setImageUploading(true);
    try {
      // For new products, generate a temporary ID
      const productId = editingProduct?.id || `temp-${Date.now()}`;
      const imageUrl = await uploadProductImage(file, productId);
      if (!imageUrl) {
        toast.error('Failed to upload image');
        return null;
      }
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  const handleImageDelete = async (imageUrl: string): Promise<boolean> => {
    try {
      const success = await deleteProductImage(imageUrl);
      if (!success) {
        toast.error('Failed to delete image');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
      return false;
    }
  };

  const handleSaveProduct = async (productData: Product) => {
    try {
      if (dialogMode === 'add') {
        const newProduct = await addProduct(productData);
        if (newProduct) {
          setProducts(prevProducts => [newProduct, ...prevProducts]);
          toast.success('Product added successfully');
        }
      } else {
        const updatedProduct = await updateProduct(productData.id, productData);
        if (updatedProduct) {
          setProducts(prevProducts => 
            prevProducts.map(p => p.id === productData.id ? updatedProduct : p)
          );
          toast.success('Product updated successfully');
        }
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
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

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc' 
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
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
        <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        <PrimaryButton onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </PrimaryButton>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
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
      
      {/* Products Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
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
                  onClick={() => handleSort('brand')}
                >
                  <div className="flex items-center">
                    Brand
                    {sortField === 'brand' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center">
                    Price
                    {sortField === 'price' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('created_at')}
                >
                  <div className="flex items-center">
                    Created
                    {sortField === 'created_at' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    {searchTerm ? (
                      <div>
                        <p className="text-gray-500">No products match your search term</p>
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="text-primary-600 hover:text-primary-800 mt-2"
                        >
                          Clear search
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-500">No products found</p>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.images?.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="h-12 w-16 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                          }}
                        />
                      ) : (
                        <div className="h-12 w-16 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">No image</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>Rs. {product.price?.toLocaleString()}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.status === 'In Stock' 
                            ? 'bg-green-100 text-green-800' 
                            : product.status === 'Out of Stock'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {product.created_at ? formatDate(product.created_at) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(product)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Product Add/Edit Dialog */}
      {isDialogOpen && (
        <ProductDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveProduct}
          product={editingProduct}
          mode={dialogMode}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
          imageUploading={imageUploading}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      {deleteConfirmProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete <span className="font-medium">{deleteConfirmProduct.name}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmProduct(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmProduct.id)}
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

export default AdminProductManagement;