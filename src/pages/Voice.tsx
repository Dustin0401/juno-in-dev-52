import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Mic, MicOff, Play, Pause, Volume2, TrendingUp, TrendingDown, Zap, Brain, MessageCircle, Waves, Gauge, VolumeX, FileText, MicIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
interface VoiceSession {
  id: string;
  title: string;
  duration: string;
  timestamp: string;
  topic: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}
const mockSessions: VoiceSession[] = [{
  id: '1',
  title: 'BTC Market Analysis',
  duration: '3:42',
  timestamp: '2 hours ago',
  topic: 'Bitcoin',
  sentiment: 'bullish'
}, {
  id: '2',
  title: 'ETH Layer 2 Discussion',
  duration: '5:18',
  timestamp: '1 day ago',
  topic: 'Ethereum',
  sentiment: 'neutral'
}, {
  id: '3',
  title: 'SOL DeFi Ecosystem',
  duration: '4:05',
  timestamp: '2 days ago',
  topic: 'Solana',
  sentiment: 'bearish'
}];
export default function Voice() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        setAudioLevel(Math.random() * 100); // Simulate audio level
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setRecordingTime(0);
      setAudioLevel(0);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Zap className="w-4 h-4 text-yellow-500" />;
    }
  };
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'bearish':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 flex justify-center p-6">
        {/* Main Voice Interface */}
        <div className="max-w-2xl w-full space-y-6">
          {/* Voice Control - Direct on Canvas */}
          <div className="text-center space-y-6 py-8">
            <div className="mb-6">
              <h1 className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground mb-2">
                <Brain className="w-6 h-6 text-primary" />
                Juno AI Voice Assistant
              </h1>
              <p className="text-muted text-lg">
                Ask about any cryptocurrency, market trends, or trading strategies
              </p>
            </div>

            {/* Voice Visualizer */}
            <div className="relative">
              <div className={cn("w-32 h-32 mx-auto rounded-full border-4 transition-all duration-300 flex items-center justify-center", isRecording ? "border-primary bg-primary/10 shadow-lg shadow-primary/20" : "border-line bg-surface/50")}>
                {isRecording ? <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <div key={i} className="w-1 bg-primary rounded-full animate-pulse" style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }} />)}
                  </div> : <Mic className="w-8 h-8 text-muted" />}
              </div>
              
              {/* Audio Level Ring */}
              {isRecording && <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping" style={{
              scale: 1 + audioLevel / 200,
              opacity: 0.6 - audioLevel / 200
            }} />}
            </div>

            {/* Recording Controls */}
            <div className="space-y-4">
              {isRecording && <div className="space-y-2">
                  <div className="text-sm text-muted">Recording: {formatTime(recordingTime)}</div>
                  <Progress value={audioLevel} className="w-48 mx-auto h-2" />
                </div>}

              <Button size="lg" variant={isRecording ? "destructive" : "hero"} onClick={() => setIsRecording(!isRecording)} className="w-48 h-12">
                {isRecording ? <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop Recording
                  </> : <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Voice Chat
                  </>}
              </Button>
            </div>

            {/* Quick Prompts */}
            <div className="pt-4">
              <p className="text-sm text-muted mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["What's BTC doing today?", "Should I buy ETH now?", "Analyze SOL trends", "Market sentiment overview"].map(prompt => <Badge key={prompt} variant="secondary" className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">
                    "{prompt}"
                  </Badge>)}
              </div>
            </div>

            {/* Voice Settings Icons */}
            <div className="pt-6">
              <div className="flex items-center justify-center gap-8">
                {/* Speech Speed */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-surface/50 border border-line flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
                    <Gauge className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">Speed</span>
                </div>

                {/* Voice Volume */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-surface/50 border border-line flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
                    <Volume2 className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">Volume</span>
                </div>

                {/* Auto-transcription */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-surface/50 border border-line flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
                    <FileText className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">Transcription</span>
                </div>

                {/* Voice Activation */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-surface/50 border border-line flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
                    <MicIcon className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">Activation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}