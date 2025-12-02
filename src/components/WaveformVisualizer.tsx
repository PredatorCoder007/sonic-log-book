import { cn } from '@/lib/utils';

interface WaveformVisualizerProps {
  isActive: boolean;
}

export function WaveformVisualizer({ isActive }: WaveformVisualizerProps) {
  const bars = 12;

  return (
    <div className="flex h-16 items-center justify-center gap-1">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-1 rounded-full bg-primary transition-all duration-300',
            isActive ? 'waveform-bar' : 'h-2'
          )}
          style={{
            height: isActive ? `${Math.random() * 40 + 20}px` : '8px',
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}
