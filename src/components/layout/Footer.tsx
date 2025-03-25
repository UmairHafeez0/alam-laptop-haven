
import { Container } from "@/components/ui/Container";
import { Link } from "react-router-dom";
import { Laptop } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Laptop className="h-6 w-6 text-alam-600" />
                <span className="text-xl font-semibold text-gray-900">Alam Laptop</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Providing top-quality laptops and exceptional service to Pakistani customers since 2010.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/products?category=business" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    Business Laptops
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=gaming" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    Gaming Laptops
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=ultrabook" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    Ultrabooks
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=accessories" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">
                  123 Tech Street, Islamabad, Pakistan
                </li>
                <li>
                  <a href="tel:+92512345678" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    +92 51 234 5678
                  </a>
                </li>
                <li>
                  <a href="mailto:info@alamlaptop.pk" className="text-muted-foreground hover:text-gray-900 transition-colors">
                    info@alamlaptop.pk
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Alam Laptop. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-gray-900 transition-colors">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
