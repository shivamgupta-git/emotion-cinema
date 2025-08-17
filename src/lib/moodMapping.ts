import { Mood } from '../context/AppContext';

// Quiz option to mood mapping
export const moodMapping: Record<string, Mood> = {
  // Excited options
  '🎉': 'Excited',
  '🎧': 'Excited', 
  '🏙': 'Excited',
  '🍿': 'Excited',
  
  // Calm options
  '📚': 'Calm',
  '☕': 'Calm',
  '🎼': 'Calm',
  '🏔': 'Calm',
  
  // Emotional options
  '🌧': 'Emotional',
  '❤': 'Emotional',
  '🍦': 'Emotional',
  
  // Happy options
  '🍕': 'Happy',
  '🌞': 'Happy', 
  '🏖': 'Happy',
  '📺': 'Happy',
  
  // Relaxed options
  '😴': 'Relaxed',
  '🌾': 'Relaxed',
  '☁': 'Relaxed',
  '❄': 'Relaxed'
};

// Quiz questions with options
export const quizQuestions = [
  {
    id: 1,
    question: "What's your ideal Friday night activity?",
    options: [
      { emoji: '🎉', label: 'Going to a party', value: '🎉' },
      { emoji: '📚', label: 'Reading a good book', value: '📚' },
      { emoji: '🌧', label: 'Staying in during rain', value: '🌧' },
      { emoji: '🍕', label: 'Pizza with friends', value: '🍕' }
    ]
  },
  {
    id: 2,
    question: "What type of music matches your current vibe?",
    options: [
      { emoji: '🎧', label: 'Hip-Hop & Electronic', value: '🎧' },
      { emoji: '🎼', label: 'Classical & Ambient', value: '🎼' },
      { emoji: '❤', label: 'Romantic ballads', value: '❤' },
      { emoji: '🌞', label: 'Upbeat pop songs', value: '🌞' }
    ]
  },
  {
    id: 3,
    question: "Where would you love to spend your vacation?",
    options: [
      { emoji: '🏙', label: 'Bustling city', value: '🏙' },
      { emoji: '🏔', label: 'Peaceful mountains', value: '🏔' },
      { emoji: '🏖', label: 'Sunny beach', value: '🏖' },
      { emoji: '🌾', label: 'Quiet countryside', value: '🌾' }
    ]
  },
  {
    id: 4,
    question: "What's your go-to comfort food?",
    options: [
      { emoji: '🍿', label: 'Movie theater popcorn', value: '🍿' },
      { emoji: '☕', label: 'Hot coffee & pastry', value: '☕' },
      { emoji: '🍦', label: 'Ice cream', value: '🍦' },
      { emoji: '😴', label: 'Warm soup', value: '😴' }
    ]
  },
  {
    id: 5,
    question: "What's your ideal weather?",
    options: [
      { emoji: '🌞', label: 'Bright sunshine', value: '🌞' },
      { emoji: '☁', label: 'Overcast & cool', value: '☁' },
      { emoji: '🌧', label: 'Gentle rain', value: '🌧' },
      { emoji: '❄', label: 'Crisp winter day', value: '❄' }
    ]
  }
];

// Helper function to determine mood from selected options
export function getPredictedMood(selectedOptions: string[]): Mood {
  const moodCounts: Record<Mood, number> = {
    Excited: 0,
    Calm: 0,
    Emotional: 0,
    Happy: 0,
    Relaxed: 0
  };

  // Count occurrences of each mood
  selectedOptions.forEach(option => {
    const mood = moodMapping[option];
    if (mood) {
      moodCounts[mood]++;
    }
  });

  // Find the mood with the highest count
  let topMood: Mood = 'Happy'; // Default fallback
  let maxCount = 0;

  Object.entries(moodCounts).forEach(([mood, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topMood = mood as Mood;
    }
  });

  return topMood;
}

// Mood descriptions for results
export const moodDescriptions: Record<Mood, string> = {
  Excited: "You're feeling energetic and ready for action! Perfect for high-energy adventures and thrilling stories.",
  Calm: "You're in a peaceful state of mind. Great for thoughtful dramas and serene narratives.",
  Emotional: "You're ready to feel deeply. Ideal for touching stories that tug at the heartstrings.",
  Happy: "You're in a cheerful mood! Perfect for feel-good movies and uplifting adventures.",
  Relaxed: "You want to unwind and take it easy. Great for laid-back comedies and gentle stories."
};