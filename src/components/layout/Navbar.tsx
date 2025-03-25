
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { Laptop, Search, ShoppingCart, Menu, X } from 'lucide-react';

const NavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

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

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
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
            <button
              aria-label="Search"
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
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

          {/* Mobile Menu Button */}
          <button
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <Container className="flex flex-col h-full py-16">
          <nav className="flex flex-col gap-2 py-8">
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

          <div className="flex items-center gap-4 py-4 mt-auto border-t">
            <button
              aria-label="Search"
              className="flex items-center gap-2 px-4 py-3 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
            <Link
              to="/cart"
              className="flex items-center gap-2 px-4 py-3 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart (0)</span>
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
