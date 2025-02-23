import React, { useEffect, useRef, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { DeleteForever, PlayArrow, Pause } from "@mui/icons-material";

// Components
import CanvasWaveform from './CanvasWaveform';

interface Props {
  url: string;
  waveformData: number[];
  duration: number;
  onDelete?: () => void
}

const AudioPlayer = ({
  url, waveformData, duration, onDelete
}: Props) => {

  // States
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef< NodeJS.Timeout | null >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Interval
  // TODO make it as animation handler directly in Canvas
  useEffect(() => {
    timerRef.current = null;
    if(isPlaying) {
      timerRef.current = setInterval(() => {
        if(currentTime >= duration && audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
          return
        }

        const thisTime = audioRef.current?.currentTime || 0
        setCurrentTime(thisTime)
      }, 100)
    }

    return() => {
      if(timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, currentTime])

  // Utils
  function playPause() {
    if(!audioRef.current) return

    if(isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return
    }

    if(currentTime >= duration) {
      setCurrentTime(0);
      audioRef.current?.play();
      return
    }

    audioRef.current.currentTime = currentTime;
    audioRef.current?.play();
  }

  function changeTime(value: number ) {
    if(audioRef.current?.currentTime) {
      audioRef.current.currentTime = Number(value);
      setCurrentTime(Number(value));
    } else {
      setCurrentTime(Number(value));
    }
  }

  return (
    <Stack 
      width="100%"
      flexDirection="row" 
      gap={1}  
    >
      <Button 
        variant="contained"
        onClick={playPause}
      >
        
        {isPlaying 
        ? <Pause />
        : <PlayArrow />
        }
      </Button>

      <CanvasWaveform 
        data={waveformData} 
        currentTime={currentTime}
        duration={duration}
        changeTime={changeTime}
        height={50}
      />

      {onDelete && (
        <Button 
          variant="contained"
          size="small"
          color="error"
          onClick={() => onDelete()}
        >
          <DeleteForever />
        </Button>
      )}

      <audio 
        ref={audioRef} 
        onPlay={() => setIsPlaying(true)}
      >
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Stack>
  )
}

export default AudioPlayer;