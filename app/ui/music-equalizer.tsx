export function MusicEqualizer() {
  return (
    <div className="flex items-end space-x-0.5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-green-500 animate-pulse"
          style={{
            height: "12px",
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  );
}
