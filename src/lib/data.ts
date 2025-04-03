import { Product } from './types';
import { supabase } from './supabase';

// PRODUCT CRUD OPERATIONS

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as Product[];
};

// Add a new product
export const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .insert({
      ...product,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding product:', error);
    return null;
  }

  return data as Product;
};

// Update a product
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .update({
      ...product,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  return data as Product;
};

// Delete a product and its images
export const deleteProduct = async (id: string): Promise<boolean> => {
  // First get the product to access its images
  const product = await getProductById(id);
  if (!product) return false;

  // Delete all associated images
  if (product.images && product.images.length > 0) {
    const imagePaths = product.images.map(img => 
      img.split('/storage/v1/object/public/alamlaptops/')[1]
    );
    
    const { error: storageError } = await supabase.storage
      .from('alamlaptops')
      .remove(imagePaths.map(path => `products/${path}`));

    if (storageError) {
      console.error('Error deleting product images:', storageError);
      // Continue with product deletion even if image deletion fails
    }
  }

  // Then delete the product
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
};

// IMAGE HANDLING FUNCTIONS

// Upload product image to Supabase storage
export const uploadProductImage = async (file: File, productId: string): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}-${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('alamlaptops')
    .upload(`products/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('alamlaptops')
    .getPublicUrl(data.path);

  return publicUrl;
};

// Delete product image from Supabase storage
export const deleteProductImage = async (imageUrl: string): Promise<boolean> => {
  // Extract path from URL
  const path = imageUrl.split('/storage/v1/object/public/alamlaptops/')[1];
  
  const { error } = await supabase.storage
    .from('alamlaptops')
    .remove([`products/${path}`]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }

  return true;
};

// PRODUCT QUERIES

// Get featured products
export const getFeaturedProducts = async (limit?: number): Promise<Product[]> => {
  let query = supabase
    .from('products')
    .select('*')
    .eq('isFeatured', true)
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data as Product[];
};

// Get new products
export const getNewProducts = async (limit?: number): Promise<Product[]> => {
  let query = supabase
    .from('products')
    .select('*')
    .eq('isNew', true)
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching new products:', error);
    return [];
  }

  return data as Product[];
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }

  return data as Product;
};

// Get product by slug
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }

  return data as Product;
};

// Get related products
export const getRelatedProducts = async (
  productId: string,
  limit = 4
): Promise<Product[]> => {
  const currentProduct = await getProductById(productId);
  if (!currentProduct) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .neq('id', productId)
    .or(`category.eq.${currentProduct.category},brand.eq.${currentProduct.brand}`)
    .limit(limit);

  if (error) {
    console.error('Error fetching related products:', error);
    return [];
  }

  return data as Product[];
};

// Filter products
export const filterProducts = async (
  filters: Record<string, string[]>
): Promise<Product[]> => {
  let query = supabase.from('products').select('*');

  if (filters.brand && filters.brand.length > 0) {
    query = query.in('brand', filters.brand);
  }

  if (filters.category && filters.category.length > 0) {
    query = query.in('category', filters.category);
  }

  if (filters.price && filters.price.length > 0) {
    const priceConditions = filters.price.map((range) => {
      if (range === 'under-150000') return 'price.lt.150000';
      if (range === '150000-200000') return 'price.gte.150000,price.lt.200000';
      if (range === '200000-250000') return 'price.gte.200000,price.lt.250000';
      if (range === 'above-250000') return 'price.gte.250000';
      return '';
    }).filter(Boolean);

    query = query.or(priceConditions.join(','));
  }

  if (filters.processor && filters.processor.length > 0) {
    const processorConditions = filters.processor.map((procType) => {
      if (procType === 'intel-i7') return 'processor.ilike.%i7%';
      if (procType === 'intel-i5') return 'processor.ilike.%i5%';
      if (procType === 'amd-ryzen') return 'processor.ilike.%Ryzen%';
      if (procType === 'apple-m1') return 'processor.ilike.%M1%';
      return '';
    }).filter(Boolean);

    query = query.or(processorConditions.join(','));
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error filtering products:', error);
    return [];
  }

  return data as Product[];
};


// Get image by ID

// FILTER CATEGORIES (static data)
export const getFilterCategories = () => {
  return [
    {
      id: "brand",
      name: "Brand",
      options: [
        { id: "dell", name: "Dell" },
        { id: "apple", name: "Apple" },
        { id: "lenovo", name: "Lenovo" },
        { id: "hp", name: "HP" },
        { id: "asus", name: "ASUS" },
        { id: "microsoft", name: "Microsoft" },
        { id: "acer", name: "Acer" },
        { id: "razer", name: "Razer" },
        { id: "lg", name: "LG" },
        { id: "alienware", name: "Alienware" },
        { id: "msi", name: "MSI" }
      ]
    },
    {
      id: "category",
      name: "Category",
      options: [
        { id: "ultrabook", name: "Ultrabooks" },
        { id: "gaming", name: "Gaming" },
        { id: "business", name: "Business" },
      ],
    },
    {
      id: "price",
      name: "Price Range",
      options: [
        { id: "under-150000", name: "Under Rs. 150,000" },
        { id: "150000-200000", name: "Rs. 150,000 - Rs. 200,000" },
        { id: "200000-250000", name: "Rs. 200,000 - Rs. 250,000" },
        { id: "above-250000", name: "Above Rs. 250,000" },
      ],
    },
    {
      id: "processor",
      name: "Processor",
      options: [
        { id: "intel-i7", name: "Intel Core i7" },
        { id: "intel-i5", name: "Intel Core i5" },
        { id: "amd-ryzen", name: "AMD Ryzen" },
        { id: "apple-m1", name: "Apple M1" },
      ],
    },
  ];
};