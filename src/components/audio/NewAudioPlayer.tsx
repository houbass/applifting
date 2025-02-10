import React, { useEffect, useRef, useState } from "react";
import { Button, Box, Stack, Typography, Slider } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

interface Props {
  url: string
}

const NewAudioPlayer = ({
  url
}: Props) => {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef< NodeJS.Timeout | null >(null)
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Utils
  function playPause() {
    if(isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return
    }
    audioRef.current?.play();
  }

  function handleMetaData(e: React.ChangeEvent<HTMLAudioElement>) {
    setTotalTime(Math.round(e.target.duration))
  }

  function changeTime(e: Event, value: number | number[] ) {
    
    if(audioRef.current?.currentTime) {
      audioRef.current.currentTime = Number(value);
      setCurrentTime(Number(value));
    }
  }

  function processTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60
    const zeroMinutes = minutes < 10 ? "0" : "";
    const zeroSeconds = seconds < 10 ? "0" : "";

    return zeroMinutes + minutes + ":" + zeroSeconds + seconds;
  }

  // Interval
  useEffect(() => {
    timerRef.current = null;
    console.log('sad')

    if(isPlaying) {
      timerRef.current = setInterval(() => {
        if(currentTime >= totalTime && audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
          return
        }
        setCurrentTime((currentTime) => currentTime + 1)
      }, 1000)
    }

    return() => {
      if(timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, currentTime])

  return (
    <Stack flexDirection="row" gap={2} alignItems="center">
      <Button variant="contained" onClick={playPause}>
        {isPlaying 
        ? <Pause />
        : <PlayArrow />
        }
      </Button>

      <Slider 
        aria-label="Time" 
        value={currentTime} 
        min={0} 
        max={totalTime} 
        onChange={changeTime}
      />

      <Box>
        <Typography variant="caption" whiteSpace="nowrap">
          {processTime(currentTime) + " / " + processTime(totalTime)}
        </Typography>
      </Box>
      
      <audio 
        ref={audioRef} 
        onPlay={() => setIsPlaying(true)}
        onLoadedMetadata={handleMetaData}
      >
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Stack>
  )
}

export default NewAudioPlayer;