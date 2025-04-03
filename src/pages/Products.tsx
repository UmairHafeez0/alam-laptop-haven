import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductFilters, MobileFilters } from "@/components/products/ProductFilters";
import { filterProducts, getFilterCategories } from "@/lib/data";
import { ArrowDown01, ArrowDown10, ArrowUpDown, ListFilter } from "lucide-react";
import {Product} from "@/lib/types"
// Sorting options
const sortOptions = [
  { value: "price-low", label: "Price: Low to High", icon: ArrowDown01 },
  { value: "price-high", label: "Price: High to Low", icon: ArrowDown10 },
  { value: "name", label: "Name", icon: ArrowUpDown },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]); // Initialize as empty array
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const filterCategories = getFilterCategories();
  
  // Load products initially and when filters/sort change
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const filteredProducts = await filterProducts(activeFilters);
        
        // Sort products
        let sortedProducts = [...filteredProducts];
        
        if (sortBy === "price-low") {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
          sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === "name") {
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [activeFilters, sortBy]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 lg:pt-28">
        <Container>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold sm:text-4xl text-gray-900">
              Explore Our Laptops
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Find the perfect laptop for your needs from our premium selection.
            </p>
          </div>
          
          {/* Filters and Sort Mobile UI */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <ListFilter className="h-4 w-4" />
              Filters
            </button>
            
            <div className="flex items-center">
              <label htmlFor="mobile-sort" className="text-sm font-medium text-gray-700 mr-2">
                Sort:
              </label>
              <select
                id="mobile-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm rounded-md border-gray-300 py-1.5"
              >
                <option value="featured">Featured</option>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 pt-6">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <ProductFilters
                categories={filterCategories}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
              />
            </div>
            
            {/* Product Grid */}
            <div className="lg:col-span-3">
              {/* Desktop Sort */}
              <div className="hidden md:flex items-center justify-end mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:border-alam-500 focus:outline-none focus:ring-alam-500"
                  >
                    <option value="featured">Featured</option>
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Products */}
              {isLoading ? (
                <div className="text-center py-12">
                  <p>Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
      
      {/* Mobile Filters Dialog */}
      <MobileFilters
        categories={filterCategories}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default Products;