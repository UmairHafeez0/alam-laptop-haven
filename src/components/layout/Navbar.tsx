
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { Laptop, Search, ShoppingCart, Menu, X } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger, 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const NavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchFocused, setMobileSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
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
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'
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
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Search"
                  className="rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
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
                  <Button 
                    type="submit" 
                    variant="ghost"
                    className="p-2 bg-alam-600 text-white rounded-r-md hover:bg-alam-700 transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
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
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open Menu"
                className="rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-full sm:max-w-sm p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Close Button */}
                <div className="absolute right-4 top-4">
                  <SheetClose asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      aria-label="Close" 
                      className="rounded-full hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Mobile Logo */}
                <div className="pt-4 pl-4 pb-5">
                  <Link to="/" className="flex items-center gap-2">
                    <Laptop className="h-6 w-6 text-alam-600" />
                    <span className="text-xl font-semibold text-gray-900">Alam Laptop</span>
                  </Link>
                </div>
                
                {/* Mobile Search */}
                <div className="px-4 pb-4">
                  <form 
                    onSubmit={(e) => {
                      handleSearch(e);
                      // Close the sheet after search submission
                      document.querySelector('.sheet-close-button')?.dispatchEvent(
                        new MouseEvent('click', { bubbles: true })
                      );
                    }} 
                    className={cn(
                      "flex items-center w-full transition-all duration-200 overflow-hidden",
                      "bg-gray-50 border rounded-md focus-within:border-alam-500 focus-within:ring-1 focus-within:ring-alam-500"
                    )}
                  >
                    <input
                      ref={mobileSearchInputRef}
                      type="text"
                      placeholder="Search laptops..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setMobileSearchFocused(true)}
                      onBlur={() => setMobileSearchFocused(false)}
                      className="w-full px-4 py-2.5 bg-transparent border-none outline-none text-gray-900"
                    />
                    <Button 
                      type="submit" 
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "p-2 text-gray-500 rounded-r-md transition-colors",
                        mobileSearchFocused ? "text-alam-600" : ""
                      )}
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
                
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-1 px-4">
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
