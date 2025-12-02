import { useRef, useState } from 'react';
import { Play, Pause, Download, Trash2 } from 'lucide-react';
import { Recording } from '@/hooks/useAudioRecorder';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RecordingItemProps {
  recording: Recording;
  onDelete: (id: string) => void;
  onDownload: (recording: Recording) => void;
}

export function RecordingItem({ recording, onDelete, onDownload }: RecordingItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="rounded-lg bg-card overflow-hidden transition-colors hover:bg-accent/50">
      <div className="group flex items-center gap-4 p-4">
        <audio ref={audioRef} src={recording.url} onEnded={handleEnded} />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-10 w-10 shrink-0 rounded-full bg-secondary hover:bg-secondary/80"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-foreground" />
          ) : (
            <Play className="h-4 w-4 text-foreground ml-0.5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            Recording
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDate(recording.timestamp)} • {formatTime(recording.duration)}
          </p>
        </div>

        <div className={cn(
          'flex gap-1 transition-opacity',
          'opacity-0 group-hover:opacity-100'
        )}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDownload(recording)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(recording.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Section */}
      {recording.summary && (
        <div className="px-4 pb-4 pt-0">
          <div className="rounded-md bg-secondary/50 p-3 border-l-2 border-primary">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Summary
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {recording.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
