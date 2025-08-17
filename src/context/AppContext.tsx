import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface Movie {
  id: string;
  title: string;
  poster: string;
  genres: string[];
  imdb: number;
  year: number;
  trailerUrl: string;
  plot: string;
}

export type Mood = 'Excited' | 'Calm' | 'Emotional' | 'Happy' | 'Relaxed';

interface AppState {
  watchlist: Movie[];
  currentMood: Mood | null;
  isLoading: boolean;
  error: string | null;
  theme: 'dark' | 'light';
}

type AppAction =
  | { type: 'ADD_TO_WATCHLIST'; movie: Movie }
  | { type: 'REMOVE_FROM_WATCHLIST'; movieId: string }
  | { type: 'SET_MOOD'; mood: Mood }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'TOGGLE_THEME' }
  | { type: 'LOAD_PERSISTED_DATA'; data: Partial<AppState> };

const initialState: AppState = {
  watchlist: [],
  currentMood: null,
  isLoading: false,
  error: null,
  theme: 'dark'
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      const isAlreadyInWatchlist = state.watchlist.some(
        movie => movie.id === action.movie.id
      );
      if (isAlreadyInWatchlist) return state;
      
      return {
        ...state,
        watchlist: [...state.watchlist, action.movie]
      };

    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.id !== action.movieId)
      };

    case 'SET_MOOD':
      return {
        ...state,
        currentMood: action.mood
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.loading
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      };

    case 'LOAD_PERSISTED_DATA':
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  setMood: (mood: Mood) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleTheme: () => void;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('movieWatchlist');
    const savedTheme = localStorage.getItem('movieTheme');
    
    if (savedWatchlist || savedTheme) {
      dispatch({
        type: 'LOAD_PERSISTED_DATA',
        data: {
          watchlist: savedWatchlist ? JSON.parse(savedWatchlist) : [],
          theme: (savedTheme as 'dark' | 'light') || 'dark'
        }
      });
    }
  }, []);

  // Persist watchlist changes
  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  // Persist theme changes
  useEffect(() => {
    localStorage.setItem('movieTheme', state.theme);
    document.documentElement.classList.toggle('light', state.theme === 'light');
  }, [state.theme]);

  // Helper functions
  const addToWatchlist = (movie: Movie) => {
    dispatch({ type: 'ADD_TO_WATCHLIST', movie });
  };

  const removeFromWatchlist = (movieId: string) => {
    dispatch({ type: 'REMOVE_FROM_WATCHLIST', movieId });
  };

  const isInWatchlist = (movieId: string) => {
    return state.watchlist.some(movie => movie.id === movieId);
  };

  const setMood = (mood: Mood) => {
    dispatch({ type: 'SET_MOOD', mood });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', error });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        setMood,
        setLoading,
        setError,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}