import { Mic, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordButtonProps {
  isRecording: boolean;
  onToggle: () => void;
}

export function RecordButton({ isRecording, onToggle }: RecordButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300',
        isRecording
          ? 'bg-primary recording-pulse'
          : 'bg-primary hover:bg-primary/90 hover:scale-105'
      )}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
    >
      {isRecording ? (
        <Square className="h-8 w-8 fill-primary-foreground text-primary-foreground" />
      ) : (
        <Mic className="h-10 w-10 text-primary-foreground" />
      )}
    </button>
  );
}
