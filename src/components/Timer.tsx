interface TimerProps {
  seconds: number;
}

export function Timer({ seconds }: TimerProps) {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-mono text-5xl font-light tracking-wider text-foreground">
      {formatTime(seconds)}
    </div>
  );
}
