import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/context/AppContext';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { useState } from 'react';

interface MovieCarouselProps {
  movies: Movie[];
  title: string;
  loading?: boolean;
}

export default function MovieCarousel({ movies, title, loading = false }: MovieCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, movies.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, movies.length - 2)) % Math.max(1, movies.length - 2));
  };

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-neon mb-8 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl p-4 border border-glass-border animate-pulse">
              <div className="aspect-[2/3] bg-muted rounded-xl mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="flex space-x-2 mt-4">
                  <div className="h-8 bg-muted rounded flex-1" />
                  <div className="h-8 bg-muted rounded flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="glass rounded-2xl p-8 border border-glass-border max-w-md mx-auto">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No movies found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your preferences or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-neon">
          {title}
        </h2>

        {movies.length > 3 && (
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="glass border-glass-border hover:border-primary/50 p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="glass border-glass-border hover:border-primary/50 p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </motion.div>

      {/* Desktop Carousel */}
      <div className="hidden md:block relative overflow-hidden">
        <motion.div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="w-1/3 flex-shrink-0 px-3"
            >
              <MovieCard movie={movie} delay={index * 0.1} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile/Tablet Grid */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Dots Indicator */}
      {movies.length > 3 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: Math.max(1, movies.length - 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-primary w-4'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}