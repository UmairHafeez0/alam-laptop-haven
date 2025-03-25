
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Container } from "@/components/ui/Container";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-alam-50/50 to-white pt-24 lg:pt-28">
      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in opacity-0">
            <span className="inline-block rounded-full bg-alam-100 px-4 py-1.5 text-sm font-medium text-alam-800 mb-6">
              The Premium Laptop Experience
            </span>
          </div>
          
          <h1 className="animate-fade-in opacity-0 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 text-balance">
            Find Your Perfect Laptop in Pakistan
          </h1>
          
          <p className="animate-fade-in opacity-0 mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Discover our premium collection of laptops for business, gaming, and everyday use.
            Quality assured with nationwide delivery and exceptional service.
          </p>
          
          <div className="animate-fade-in opacity-0 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <PrimaryButton size="lg" className="w-full sm:w-auto">
                Explore Laptops
              </PrimaryButton>
            </Link>
            <Link to="/contact">
              <PrimaryButton variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Us
              </PrimaryButton>
            </Link>
          </div>
        </div>
        
        <div className="animate-fade-in opacity-0 mt-16 flex justify-center">
          <div className="relative w-full max-w-3xl aspect-[16/9] animate-float">
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80" 
              alt="Premium laptop" 
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute -right-6 -bottom-6 -z-10 h-full w-full rounded-xl bg-alam-500/10"></div>
          </div>
        </div>
      </Container>
      
      {/* Background Decorations */}
      <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] opacity-20 blur-3xl bg-alam-200 rounded-full transform translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute left-0 bottom-0 -z-10 h-[400px] w-[400px] opacity-20 blur-3xl bg-alam-300 rounded-full transform -translate-x-1/2 translate-y-1/4"></div>
    </div>
  );
}
