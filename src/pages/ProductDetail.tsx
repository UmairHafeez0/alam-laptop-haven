import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProductCard } from "@/components/ui/ProductCard";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { getProductById, getRelatedProducts } from "@/lib/data";
import { Check, ChevronRight, Shield, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  
  // Get product data
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        
        if (productData) {
          const related = await getRelatedProducts(id, 3);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleWhatsAppClick = () => {
    if (!product) return;
    
    const phoneNumber = "923001234567";
    const message = `Hi, I'm interested in buying this product:\n\n*${product.name}*\n\nPrice: Rs. ${product.price.toLocaleString()}\n\nProduct Link: ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <Container>
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading Product...</h1>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <Container>
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/products">
                <PrimaryButton>Browse Products</PrimaryButton>
              </Link>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <Container>
          {/* Breadcrumbs */}
          <nav className="flex mb-6 items-center text-sm">
            <Link to="/" className="text-muted-foreground hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <Link to="/products" className="text-muted-foreground hover:text-gray-900">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-4 border border-border">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative aspect-square w-20 cursor-pointer overflow-hidden rounded-lg border-2 transition ${
                      selectedImage === index
                        ? "border-primary-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:sticky lg:top-32">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.isNew && (
                  <span className="inline-flex items-center rounded-full bg-primary-500 px-2.5 py-1 text-xs font-medium text-white">
                    New
                  </span>
                )}
                {product.originalPrice && (
                  <span className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-medium text-white">
  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
</span>

                )}
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                  product.status === "In Stock" 
                    ? "bg-green-100 text-green-800" 
                    : product.status === "Out of Stock"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {product.status}
                </span>
              </div>
              
              {/* Title & Price */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{product.brand}</p>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold text-gray-900">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="mb-6 text-gray-700 leading-relaxed">{product.description}</p>
              
              {/* Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="rounded-lg bg-gray-50 p-4">
                  <span className="text-sm font-medium text-gray-500">Processor</span>
                  <p className="mt-1 text-sm text-gray-900">{product.processor}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <span className="text-sm font-medium text-gray-500">RAM</span>
                  <p className="mt-1 text-sm text-gray-900">{product.ram}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <span className="text-sm font-medium text-gray-500">Storage</span>
                  <p className="mt-1 text-sm text-gray-900">{product.storage}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <span className="text-sm font-medium text-gray-500">Display</span>
                  <p className="mt-1 text-sm text-gray-900">{product.display}</p>
                </div>
                {product.graphics && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <span className="text-sm font-medium text-gray-500">Graphics</span>
                    <p className="mt-1 text-sm text-gray-900">{product.graphics}</p>
                  </div>
                )}
                {product.battery && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <span className="text-sm font-medium text-gray-500">Battery</span>
                    <p className="mt-1 text-sm text-gray-900">{product.battery}</p>
                  </div>
                )}
                {product.weight && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <span className="text-sm font-medium text-gray-500">Weight</span>
                    <p className="mt-1 text-sm text-gray-900">{product.weight}</p>
                  </div>
                )}
                {product.ports && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <span className="text-sm font-medium text-gray-500">Ports</span>
                    <p className="mt-1 text-sm text-gray-900">{product.ports}</p>
                  </div>
                )}
                {product.os && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <span className="text-sm font-medium text-gray-500">Operating System</span>
                    <p className="mt-1 text-sm text-gray-900">{product.os}</p>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <PrimaryButton 
                  size="lg" 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.status !== "In Stock"}
                >
                  {product.status === "In Stock" ? "Add to Cart" : product.status}
                </PrimaryButton>
                <PrimaryButton 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
                  onClick={handleWhatsAppClick}
                >
                  Buy on WhatsApp
                </PrimaryButton>
              </div>
              
              {/* Features */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Truck className="h-5 w-5 text-primary-600" />
                  <span>Free delivery across Pakistan on orders over Rs. 30,000</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span>{product.warranty} with nationwide service centers</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Details */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Details</h2>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-12">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Reviews Section */}
          {id && <ReviewsSection productId={id} />}
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
                <Link 
                  to="/products" 
                  className="text-primary-600 font-medium hover:text-primary-700 hover:underline"
                >
                  View all
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;