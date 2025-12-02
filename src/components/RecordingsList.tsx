import { Recording } from '@/hooks/useAudioRecorder';
import { RecordingItem } from './RecordingItem';

interface RecordingsListProps {
  recordings: Recording[];
  onDelete: (id: string) => void;
  onDownload: (recording: Recording) => void;
}

export function RecordingsList({ recordings, onDelete, onDownload }: RecordingsListProps) {
  if (recordings.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No recordings yet</p>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Tap the microphone to start recording
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
        Recordings
      </h2>
      {recordings.map((recording) => (
        <RecordingItem
          key={recording.id}
          recording={recording}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
