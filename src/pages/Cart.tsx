
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Container className="py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
              <Link 
                to="/products" 
                className="flex items-center text-alam-600 hover:text-alam-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Continue Shopping
              </Link>
            </div>


          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
