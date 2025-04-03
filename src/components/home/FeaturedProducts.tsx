import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/lib/data";
import {Product} from "@/lib/types"
import { useEffect, useState } from "react";

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const products = await getFeaturedProducts(4);
        setFeaturedProducts(products);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
        setError("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container>Loading featured products...</Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <Container>{error}</Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 text-balance">
              Featured Laptops
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl text-balance">
              Explore our most popular laptops with exceptional performance, design, and value.
            </p>
          </div>
          
          <Link to="/products">
            <PrimaryButton variant="outline">
              View All Products
            </PrimaryButton>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animate">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}