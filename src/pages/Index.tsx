import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { RecordButton } from '@/components/RecordButton';
import { WaveformVisualizer } from '@/components/WaveformVisualizer';
import { Timer } from '@/components/Timer';
import { RecordingsList } from '@/components/RecordingsList';
import { AlertCircle } from 'lucide-react';

const Index = () => {
  const {
    isRecording,
    recordings,
    duration,
    error,
    startRecording,
    stopRecording,
    deleteRecording,
    downloadRecording,
  } = useAudioRecorder();

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-6 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-foreground">Voice Recorder</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isRecording ? 'Recording...' : 'Tap to record'}
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="mb-8 flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Recording Interface */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <WaveformVisualizer isActive={isRecording} />
          <Timer seconds={duration} />
          <RecordButton isRecording={isRecording} onToggle={handleToggleRecording} />
        </div>

        {/* Recordings List */}
        <RecordingsList
          recordings={recordings}
          onDelete={deleteRecording}
          onDownload={downloadRecording}
        />
      </div>
    </main>
  );
};

export default Index;
