import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Film, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import WatchlistDrawer from './WatchlistDrawer';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const location = useLocation();
  const { state } = useApp();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/chat', label: 'Chatbot' }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <Film className="h-8 w-8 text-neon transition-all duration-300 group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MoodFlix
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-all duration-300 hover:text-neon ${
                    isActive(link.href)
                      ? 'text-neon'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Watchlist Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWatchlist(true)}
                className="relative glass border-glass-border hover:border-primary/50 transition-all duration-300"
              >
                <Heart className="h-4 w-4 mr-2" />
                Watchlist
                {state.watchlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {state.watchlist.length}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowWatchlist(true)}
                className="relative"
              >
                <Heart className="h-4 w-4" />
                {state.watchlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {state.watchlist.length}
                  </span>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 glass rounded-lg mt-2 border border-glass-border">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-neon bg-primary/10'
                        : 'text-muted-foreground hover:text-neon hover:bg-muted/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <WatchlistDrawer 
        isOpen={showWatchlist} 
        onClose={() => setShowWatchlist(false)} 
      />
    </>
  );
}