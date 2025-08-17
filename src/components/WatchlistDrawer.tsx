import { X, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WatchlistDrawer({ isOpen, onClose }: WatchlistDrawerProps) {
  const { state, removeFromWatchlist } = useApp();

  const handleRemove = (movieId: string) => {
    removeFromWatchlist(movieId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-glass-border glass z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-glass-border">
                <h2 className="text-xl font-bold text-neon">My Watchlist</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2 hover:bg-muted/50"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {state.watchlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💫
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Your watchlist is empty
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Start adding movies you want to watch later!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.watchlist.map((movie, index) => (
                      <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass rounded-lg p-4 border border-glass-border hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-12 h-18 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {movie.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {movie.year} • ⭐ {movie.imdb}/10
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {movie.genres.join(', ')}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(movie.trailerUrl, '_blank')}
                              className="p-1 h-8 w-8 hover:bg-accent/20"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemove(movie.id)}
                              className="p-1 h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.watchlist.length > 0 && (
                <div className="p-6 border-t border-glass-border">
                  <p className="text-sm text-muted-foreground text-center">
                    {state.watchlist.length} movie{state.watchlist.length !== 1 ? 's' : ''} in your watchlist
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}