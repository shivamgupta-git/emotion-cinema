import { Movie, Mood } from '../context/AppContext';

// Mock movie database
const mockMovies: Movie[] = [
  // Excited mood movies
  {
    id: '1',
    title: 'Mad Max: Fury Road',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    imdb: 8.1,
    year: 2015,
    trailerUrl: 'https://www.youtube.com/watch?v=hEJnMQG9ev8',
    plot: 'In a post-apocalyptic wasteland, Max joins Furiosa to flee from a tyrant who controls the land\'s water supply.'
  },
  {
    id: '2', 
    title: 'John Wick',
    poster: 'https://images.unsplash.com/photo-1489599328181-9b7dfafbcbce?w=300&h=450&fit=crop',
    genres: ['Action', 'Crime', 'Thriller'],
    imdb: 7.4,
    year: 2014,
    trailerUrl: 'https://www.youtube.com/watch?v=C0BMx-qxsP4',
    plot: 'An ex-hitman comes out of retirement to track down the gangsters that took everything from him.'
  },
  
  // Calm mood movies  
  {
    id: '3',
    title: 'Lost in Translation',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
    genres: ['Drama', 'Romance'],
    imdb: 7.7,
    year: 2003,
    trailerUrl: 'https://www.youtube.com/watch?v=W4jViHpZdHQ',
    plot: 'A faded movie star and a neglected young woman form an unlikely bond in Tokyo.'
  },
  {
    id: '4',
    title: 'Her',
    poster: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=450&fit=crop',
    genres: ['Drama', 'Romance', 'Sci-Fi'],
    imdb: 8.0,
    year: 2013,
    trailerUrl: 'https://www.youtube.com/watch?v=WzV6mXIOVl4',
    plot: 'A sensitive writer develops an unlikely relationship with an operating system designed to meet his needs.'
  },

  // Emotional mood movies
  {
    id: '5',
    title: 'The Pursuit of Happyness',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop',
    genres: ['Biography', 'Drama'],
    imdb: 8.0,
    year: 2006,
    trailerUrl: 'https://www.youtube.com/watch?v=89Kq8SDyvfg',
    plot: 'A struggling salesman takes custody of his son as he\'s poised to begin a life-changing professional career.'
  },
  {
    id: '6',
    title: 'Inside Out',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
    genres: ['Animation', 'Adventure', 'Comedy'],
    imdb: 8.1,
    year: 2015,
    trailerUrl: 'https://www.youtube.com/watch?v=yRUAzGQ3nSY',
    plot: 'After young Riley is uprooted from her Midwest life, her emotions conflict on how best to navigate a new city.'
  },

  // Happy mood movies
  {
    id: '7',
    title: 'The Grand Budapest Hotel',
    poster: 'https://images.unsplash.com/photo-1489599328181-9b7dfafbcbce?w=300&h=450&fit=crop',
    genres: ['Adventure', 'Comedy', 'Crime'],
    imdb: 8.1,
    year: 2014,
    trailerUrl: 'https://www.youtube.com/watch?v=1Fg5iWmQjwk',
    plot: 'A legendary concierge and his protégé become involved in a murder mystery at a famous European hotel.'
  },
  {
    id: '8',
    title: 'Paddington',
    poster: 'https://images.unsplash.com/photo-1489599328181-9b7dfafbcbce?w=300&h=450&fit=crop',
    genres: ['Adventure', 'Comedy', 'Family'],
    imdb: 7.3,
    year: 2014,
    trailerUrl: 'https://www.youtube.com/watch?v=EKhUxGTUoVg',
    plot: 'A young Peruvian bear travels to London in search of a home and finds himself lost at Paddington Station.'
  },

  // Relaxed mood movies
  {
    id: '9',
    title: 'The Secret Life of Walter Mitty',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
    genres: ['Adventure', 'Comedy', 'Drama'],
    imdb: 7.3,
    year: 2013,
    trailerUrl: 'https://www.youtube.com/watch?v=QD6cy4PBQPI',
    plot: 'A daydreamer escapes his anonymous life by disappearing into a world of fantasies filled with heroism and romance.'
  },
  {
    id: '10',
    title: 'A Good Year',
    poster: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=450&fit=crop',
    genres: ['Comedy', 'Drama', 'Romance'],
    imdb: 6.9,
    year: 2006,
    trailerUrl: 'https://www.youtube.com/watch?v=B3Z9GJ0fSvU',
    plot: 'A British investment broker inherits his uncle\'s chateau and vineyard in Provence, where he spent much of his childhood.'
  }
];

// Trending movies for homepage
export const trendingMovies: Movie[] = mockMovies.slice(0, 8);

// Movie trivia facts
export const movieTrivia = [
  "Did you know? The average movie trailer is 2 minutes and 30 seconds long.",
  "Fun fact: The first movie ever made was only 2.11 seconds long!",
  "Movie magic: Most films are shot at 24 frames per second.",
  "Behind the scenes: The term 'blockbuster' comes from long lines 'blocking' city streets.",
  "Cinema history: The first Oscar ceremony lasted only 15 minutes!",
  "Movie milestone: 'Avatar' was the first film to gross over $2 billion worldwide.",
  "Film fact: Alfred Hitchcock never won an Oscar for Best Director.",
  "Industry insight: Netflix produces over 700 original movies and shows annually."
];

// Mood to genre mapping for better recommendations
const moodToGenres: Record<Mood, string[]> = {
  Excited: ['Action', 'Adventure', 'Thriller', 'Sci-Fi'],
  Calm: ['Drama', 'Romance', 'Documentary'],
  Emotional: ['Drama', 'Biography', 'Romance', 'Animation'],
  Happy: ['Comedy', 'Adventure', 'Family', 'Musical'],
  Relaxed: ['Comedy', 'Drama', 'Romance', 'Adventure']
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const api = {
  // Get movie recommendations based on mood
  async getRecommendations(mood: Mood, genre?: string): Promise<Movie[]> {
    // Simulate network delay
    await delay(Math.random() * 500 + 700);
    
    // Simulate error (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Failed to fetch recommendations. Please try again.');
    }

    const preferredGenres = moodToGenres[mood];
    
    // Filter movies based on mood and optional genre
    let filteredMovies = mockMovies.filter(movie => 
      movie.genres.some(g => preferredGenres.includes(g))
    );

    if (genre) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.genres.includes(genre)
      );
    }

    // If no movies match criteria, return a few random ones
    if (filteredMovies.length === 0) {
      filteredMovies = mockMovies.slice(0, 3);
    }

    // Return up to 5 recommendations
    return filteredMovies.slice(0, 5);
  },

  // Search movies by title or genre
  async searchMovies(query: string): Promise<Movie[]> {
    await delay(300);
    
    const lowercaseQuery = query.toLowerCase();
    return mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.genres.some(genre => genre.toLowerCase().includes(lowercaseQuery))
    );
  },

  // Get trending movies
  async getTrendingMovies(): Promise<Movie[]> {
    await delay(500);
    return trendingMovies;
  },

  // Get random movie trivia
  getRandomTrivia(): string {
    return movieTrivia[Math.floor(Math.random() * movieTrivia.length)];
  }
};

export default api;