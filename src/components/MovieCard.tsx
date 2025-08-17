import { useState } from 'react';
import { Play, Heart, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Movie } from '@/context/AppContext';
import { motion } from 'framer-motion';
import TrailerModal from './TrailerModal';

interface MovieCardProps {
  movie: Movie;
  delay?: number;
}

export default function MovieCard({ movie, delay = 0 }: MovieCardProps) {
  const [showTrailer, setShowTrailer] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useApp();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: 'easeOut' }}
        className="group glass rounded-2xl p-4 border border-glass-border hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-neon/20"
      >
        {/* Movie Poster */}
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                onClick={() => setShowTrailer(true)}
                size="sm"
                className="w-full bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm border-0 neon-primary"
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Trailer
              </Button>
            </div>
          </div>

          {/* IMDB Rating Badge */}
          <div className="absolute top-3 right-3 glass rounded-full px-2 py-1 border border-glass-border">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium text-foreground">
                {movie.imdb}
              </span>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-foreground group-hover:text-neon transition-colors duration-300 line-clamp-1">
              {movie.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {movie.year} • {movie.genres.slice(0, 2).join(', ')}
            </p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {movie.plot}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTrailer(true)}
              className="flex-1 glass border-glass-border hover:border-accent/50 hover:text-accent transition-all duration-300"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Trailer
            </Button>
            
            <Button
              variant={inWatchlist ? "default" : "outline"}
              size="sm"
              onClick={handleWatchlistClick}
              className={`flex-1 transition-all duration-300 ${
                inWatchlist 
                  ? 'bg-secondary hover:bg-secondary/80 text-secondary-foreground neon-secondary' 
                  : 'glass border-glass-border hover:border-secondary/50 hover:text-secondary'
              }`}
            >
              <Heart className={`h-4 w-4 mr-2 ${inWatchlist ? 'fill-current' : ''}`} />
              {inWatchlist ? 'Added' : 'Watchlist'}
            </Button>
          </div>
        </div>
      </motion.div>

      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        movie={movie}
      />
    </>
  );
}