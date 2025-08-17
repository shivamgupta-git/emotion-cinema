import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Play, MessageCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import TrendingSection from '@/components/TrendingSection';
import api from '@/lib/api';
import heroCinema from '@/assets/hero-cinema.jpg';

export default function Landing() {
  const [trivia, setTrivia] = useState<string>('');

  useEffect(() => {
    setTrivia(api.getRandomTrivia());
  }, []);

  // Floating shapes for background animation
  const floatingShapes = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute rounded-full bg-gradient-primary opacity-10 ${
        i % 2 === 0 ? 'floating' : 'floating-delayed'
      }`}
      style={{
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.5,
      }}
    />
  ));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-background" />
        <img 
          src={heroCinema} 
          alt="Cinematic movie theater background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        {floatingShapes}
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Mood-Based
              </span>
              <br />
              <span className="text-neon">Movie Recommender</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Tell us your mood, we'll suggest the perfect movie!
              <br />
              <span className="text-emerald-neon">Discover your next favorite film</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/quiz">
                <Button
                  variant="hero"
                  size="xl"
                  className="group transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Take the Quiz
                </Button>
              </Link>

              <Link to="/chat">
                <Button
                  variant="glass"
                  size="xl"
                  className="group transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Try Chatbot
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neon mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple ways to discover your perfect movie match
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Take the Quiz',
                description: 'Answer fun questions about your current mood and preferences',
                gradient: 'bg-gradient-primary',
                link: '/quiz'
              },
              {
                icon: MessageCircle,
                title: 'Chat with AI',
                description: 'Have a conversation with our smart movie recommendation bot',
                gradient: 'bg-gradient-secondary',
                link: '/chat'
              },
              {
                icon: TrendingUp,
                title: 'Discover Trending',
                description: 'Explore what\'s popular and highly rated right now',
                gradient: 'bg-gradient-to-br from-accent to-secondary',
                link: '#trending'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Link to={feature.link}>
                  <div className="group glass rounded-2xl p-8 border border-glass-border hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-neon/20 cursor-pointer h-full">
                    <div className={`w-16 h-16 rounded-2xl ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-neon transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section id="trending" className="px-4 sm:px-6 lg:px-8 py-16">
        <TrendingSection />
      </section>

      {/* Movie Trivia */}
      {trivia && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6 border border-glass-border text-center">
              <h3 className="text-lg font-semibold text-neon mb-2">
                🎬 Movie Trivia
              </h3>
              <p className="text-muted-foreground">
                {trivia}
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}