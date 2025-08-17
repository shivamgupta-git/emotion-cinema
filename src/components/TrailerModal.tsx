import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}

export default function TrailerModal({ isOpen, onClose, movie }: TrailerModalProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl glass rounded-2xl border border-glass-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-glass-border">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {movie.title} ({movie.year})
                </h3>
                <p className="text-sm text-muted-foreground">
                  {movie.genres.join(', ')} • ⭐ {movie.imdb}/10
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-muted/50"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Video Content */}
            <div className="aspect-video bg-black">
              <iframe
                src={getYouTubeEmbedUrl(movie.trailerUrl)}
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Movie Info */}
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                {movie.plot}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}