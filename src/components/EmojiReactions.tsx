import { motion } from 'framer-motion';

interface EmojiReactionsProps {
  messageId: string;
  reactions: string[];
  onReact: (messageId: string, emoji: string) => void;
}

const availableReactions = ['👍', '❤️', '😂'];

export default function EmojiReactions({ messageId, reactions, onReact }: EmojiReactionsProps) {
  return (
    <div className="flex space-x-2 mt-3 pt-2 border-t border-glass-border/50">
      {availableReactions.map((emoji) => {
        const isActive = reactions.includes(emoji);
        
        return (
          <motion.button
            key={emoji}
            onClick={() => onReact(messageId, emoji)}
            className={`p-1 rounded-full transition-all duration-200 hover:scale-110 ${
              isActive 
                ? 'bg-primary/20 shadow-sm' 
                : 'hover:bg-muted/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">{emoji}</span>
          </motion.button>
        );
      })}
    </div>
  );
}