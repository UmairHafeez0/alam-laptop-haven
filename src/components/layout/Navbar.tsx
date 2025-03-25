
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { Laptop, Search, ShoppingCart, Menu, X } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger, 
} from '@/components/ui/popover';

const NavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white md:bg-transparent'
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-alam-500 rounded-md">
            <Laptop className="h-6 w-6 text-alam-600" />
            <span className="text-xl font-semibold text-gray-900">Alam Laptop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-md text-base transition-colors font-medium outline-none focus-visible:ring-2 focus-visible:ring-alam-500',
                  pathname === link.path
                    ? 'text-alam-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search Popover for Desktop */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  aria-label="Search"
                  className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search laptops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 outline-none border-0 focus:ring-0"
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    className="p-2 bg-alam-600 text-white rounded-r-md hover:bg-alam-700 transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </form>
              </PopoverContent>
            </Popover>
            
            <Link
              to="/cart"
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-alam-600 text-[10px] font-medium text-white">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open Menu"
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-full sm:max-w-sm p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Search */}
                <div className="p-4 border-b">
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search laptops..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 rounded-l-md border-y border-l border-gray-300 focus:outline-none focus:ring-1 focus:ring-alam-500"
                    />
                    <button 
                      type="submit" 
                      className="p-2 bg-alam-600 text-white rounded-r-md hover:bg-alam-700 transition-colors border border-alam-600"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </form>
                </div>
                
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-1 p-4">
                  {NavLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        'px-4 py-3 rounded-md text-lg transition-colors',
                        pathname === link.path
                          ? 'bg-alam-50 text-alam-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                
                {/* Mobile Cart Link */}
                <div className="mt-auto p-4 border-t">
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 px-4 py-3 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart (0)</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
