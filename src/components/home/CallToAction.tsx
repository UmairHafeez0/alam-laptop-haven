
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Container } from "@/components/ui/Container";
import { Link } from "react-router-dom";

export function CallToAction() {
  return (
    <section className="py-20 bg-alam-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] opacity-10 blur-3xl bg-white rounded-full transform translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute left-0 bottom-0 -z-10 h-[400px] w-[400px] opacity-10 blur-3xl bg-white rounded-full transform -translate-x-1/2 translate-y-1/4"></div>
      
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl text-white text-balance">
            Ready to Find Your Perfect Laptop?
          </h2>
          <p className="mt-6 text-lg text-alam-100 text-balance leading-relaxed">
            Browse our extensive collection of laptops or get in touch with our expert team for personalized recommendations.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <PrimaryButton 
                className="bg-white text-alam-600 hover:bg-alam-50 active:bg-alam-100"
                size="lg"
              >
                Explore Products
              </PrimaryButton>
            </Link>
            <Link to="/contact">
              <PrimaryButton 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 active:bg-white/20"
                size="lg"
              >
                Contact Us
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
