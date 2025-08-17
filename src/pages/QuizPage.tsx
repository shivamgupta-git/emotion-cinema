import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions, getPredictedMood, moodDescriptions } from '@/lib/moodMapping';
import { useApp } from '@/context/AppContext';
import MovieCarousel from '@/components/MovieCarousel';
import api from '@/lib/api';
import { Movie } from '@/context/AppContext';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const { setMood, setLoading: setGlobalLoading } = useApp();

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      await handleSubmit();
    } else {
      setCurrentQuestion(current => current + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(current => Math.max(0, current - 1));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setGlobalLoading(true);

    try {
      // Get predicted mood
      const predictedMood = getPredictedMood(selectedAnswers);
      setMood(predictedMood);

      // Fetch recommendations
      const movieRecommendations = await api.getRecommendations(predictedMood);
      setRecommendations(movieRecommendations);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setRecommendations([]);
  };

  const currentMood = showResults ? getPredictedMood(selectedAnswers) : null;

  if (showResults && currentMood) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mb-6">
              <span className="text-6xl mb-4 block">
                {currentMood === 'Excited' && '🚀'}
                {currentMood === 'Calm' && '🧘'}
                {currentMood === 'Emotional' && '💭'}
                {currentMood === 'Happy' && '😊'}
                {currentMood === 'Relaxed' && '🌿'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-neon mb-4">
                You're feeling {currentMood}!
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {moodDescriptions[currentMood]}
              </p>
            </div>

            <Button
              onClick={handleRetake}
              variant="glass"
              className="transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </motion.div>

          {/* Movie Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MovieCarousel 
              movies={recommendations} 
              title="Your Perfect Movie Matches"
              loading={loading}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neon mb-4">
            Movie Mood Quiz
          </h1>
          <p className="text-muted-foreground">
            Answer a few questions to discover movies that match your current mood
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-medium text-neon">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-muted/30">
            <div 
              className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-8 border border-glass-border mb-8"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizQuestions[currentQuestion].options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-105 ${
                    selectedAnswers[currentQuestion] === option.value
                      ? 'border-primary bg-primary/10 neon-primary'
                      : 'border-glass-border glass hover:border-primary/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{option.emoji}</span>
                    <span className="font-medium text-foreground group-hover:text-neon transition-colors">
                      {option.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="glass border-glass-border hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion] || loading}
            variant="hero"
            className="transition-all duration-300"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                {isLastQuestion ? 'Get Results' : 'Next'}
                {!isLastQuestion && <ArrowRight className="h-4 w-4 ml-2" />}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}