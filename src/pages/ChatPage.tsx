import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ThumbsUp, Heart, Laugh } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Movie } from '@/context/AppContext';
import MovieCard from '@/components/MovieCard';
import TypingDots from '@/components/TypingDots';
import EmojiReactions from '@/components/EmojiReactions';
import api from '@/lib/api';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  movies?: Movie[];
  reactions?: string[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi there! 👋 I'm your movie recommendation bot. Tell me how you're feeling today or what kind of movie you're in the mood for, and I'll suggest some perfect matches!",
      timestamp: new Date(),
      reactions: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      reactions: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setLoading(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simple mood detection from user input
      const inputLower = input.toLowerCase();
      let detectedMood: 'Excited' | 'Calm' | 'Emotional' | 'Happy' | 'Relaxed' = 'Happy';

      if (inputLower.includes('excited') || inputLower.includes('action') || inputLower.includes('adventure')) {
        detectedMood = 'Excited';
      } else if (inputLower.includes('calm') || inputLower.includes('peaceful') || inputLower.includes('quiet')) {
        detectedMood = 'Calm';
      } else if (inputLower.includes('sad') || inputLower.includes('emotional') || inputLower.includes('cry')) {
        detectedMood = 'Emotional';
      } else if (inputLower.includes('happy') || inputLower.includes('comedy') || inputLower.includes('fun')) {
        detectedMood = 'Happy';
      } else if (inputLower.includes('relax') || inputLower.includes('chill') || inputLower.includes('easy')) {
        detectedMood = 'Relaxed';
      }

      const recommendations = await api.getRecommendations(detectedMood);

      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Based on what you said, I think you're in a ${detectedMood.toLowerCase()} mood! Here are some perfect movie recommendations for you:`,
        timestamp: new Date(),
        movies: recommendations,
        reactions: []
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Sorry, I had trouble getting recommendations right now. Could you try again?",
        timestamp: new Date(),
        reactions: []
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const hasReaction = reactions.includes(emoji);
        return {
          ...msg,
          reactions: hasReaction 
            ? reactions.filter(r => r !== emoji)
            : [...reactions, emoji]
        };
      }
      return msg;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="glass-nav border-b border-glass-border p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neon">Movie Bot</h1>
            <p className="text-sm text-muted-foreground">
              Your personal movie recommendation assistant
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-secondary' 
                      : 'bg-gradient-primary'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`glass rounded-2xl p-4 border border-glass-border ${
                    message.type === 'user' 
                      ? 'bg-gradient-secondary/10 ml-12' 
                      : 'bg-gradient-primary/5 mr-12'
                  }`}>
                    <p className="text-foreground leading-relaxed">
                      {message.content}
                    </p>

                    {/* Movie Recommendations */}
                    {message.movies && message.movies.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {message.movies.map((movie, index) => (
                          <div key={movie.id} className="transform scale-90">
                            <MovieCard movie={movie} delay={index * 0.1} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>

                    {/* Reactions for bot messages */}
                    {message.type === 'bot' && (
                      <EmojiReactions
                        messageId={message.id}
                        reactions={message.reactions || []}
                        onReact={addReaction}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex space-x-3 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="glass rounded-2xl p-4 border border-glass-border bg-gradient-primary/5">
                  <TypingDots />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="glass-nav border-t border-glass-border p-4">
        <div className="max-w-4xl mx-auto flex space-x-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me your mood or what you're looking for..."
            className="flex-1 glass border-glass-border bg-transparent focus:border-primary/50"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            variant="hero"
            className="px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}