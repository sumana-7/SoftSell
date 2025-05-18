import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Search } from 'lucide-react';
import type { NavbarProps } from '@/types';

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-softsell-darkPurple shadow-lg border-b border-softsell-purple/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-white">
            <span className="text-softsell-purple">Soft</span>Sell
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-white/80 hover:text-softsell-purple transition-colors">How It Works</a>
          <a href="#why-choose-us" className="text-white/80 hover:text-softsell-purple transition-colors">Why Choose Us</a>
          <a href="#testimonials" className="text-white/80 hover:text-softsell-purple transition-colors">Testimonials</a>
          <a href="#contact" className="text-white/80 hover:text-softsell-purple transition-colors">Contact</a>
        </nav>

        {/* Search and Get Started */}
        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Search software..."
              className="px-4 py-2 pr-10 bg-softsell-charcoal/50 border border-softsell-purple/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-softsell-purple/50 focus:border-softsell-purple"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-softsell-purple transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
          <Button className="bg-softsell-purple hover:bg-softsell-lightPurple text-white">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-softsell-purple"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-softsell-darkPurple border-t border-softsell-purple/20">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <form onSubmit={handleSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search software..."
                className="w-full px-4 py-2 pr-10 bg-softsell-charcoal/50 border border-softsell-purple/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-softsell-purple/50 focus:border-softsell-purple"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-softsell-purple transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
            <a 
              href="#how-it-works" 
              className="text-white/80 hover:text-softsell-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#why-choose-us" 
              className="text-white/80 hover:text-softsell-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Why Choose Us
            </a>
            <a 
              href="#testimonials" 
              className="text-white/80 hover:text-softsell-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="text-white/80 hover:text-softsell-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button className="w-full bg-softsell-purple hover:bg-softsell-lightPurple text-white">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
