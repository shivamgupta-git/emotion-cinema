export default function TypingDots() {
  return (
    <div className="flex space-x-1 items-center">
      <span className="text-muted-foreground text-sm mr-2">Bot is typing</span>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-typing-dots opacity-30"
            style={{
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}