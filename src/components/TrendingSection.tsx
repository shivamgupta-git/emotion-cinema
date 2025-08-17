import { useState, useEffect } from 'react';
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Movie } from '@/context/AppContext';
import MovieCard from './MovieCard';
import api from '@/lib/api';

export default function TrendingSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trendingMovies = await api.getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, movies.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, movies.length - 2)) % Math.max(1, movies.length - 2));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <TrendingUp className="h-6 w-6 text-neon" />
          <h2 className="text-2xl md:text-3xl font-bold text-neon">
            Trending Now
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl p-4 border border-glass-border animate-pulse">
              <div className="aspect-[2/3] bg-muted rounded-xl mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-6 w-6 text-neon" />
          <h2 className="text-2xl md:text-3xl font-bold text-neon">
            Trending Now
          </h2>
        </div>

        {/* Navigation Arrows - Desktop Only */}
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

      {/* Mobile Grid */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        {movies.slice(0, 6).map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Dots Indicator - Mobile */}
      <div className="md:hidden flex justify-center space-x-2 mt-6">
        {Array.from({ length: Math.ceil(movies.length / 2) }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === Math.floor(currentIndex / 2)
                ? 'bg-primary w-4'
                : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}