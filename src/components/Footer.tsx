import { Heart, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-nav mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Main text */}
          <div className="flex items-center space-x-2 text-center md:text-left">
            <span className="text-muted-foreground">Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="text-muted-foreground">for Movie Lovers</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-emerald-neon font-medium">Team XYZ</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-neon transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-neon transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-neon transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-glass-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 MoodFlix. All rights reserved. Discover movies that match your mood.
          </p>
        </div>
      </div>
    </footer>
  );
}