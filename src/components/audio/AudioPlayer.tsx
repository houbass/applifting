import React, { useEffect, useRef, useState } from "react";
import { Button, Stack } from "@mui/material";
import { DeleteForever, PlayArrow, Pause } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPlayingId,
  setCurrentPlayingId,
} from "@/redux/slices/dashboardSlice";

// Components
import CanvasWaveform from "./CanvasWaveform";

interface Props {
  url: string;
  waveformData: number[];
  duration: number;
  onDelete?: () => void;
  id?: string;
}

const AudioPlayer = ({ url, waveformData, duration, onDelete, id }: Props) => {
  const dispatch = useDispatch();

  // States
  const currentPlayingId = useSelector(selectCurrentPlayingId);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Interval for track timeline
  useEffect(() => {
    timerRef.current = null;
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (currentTime >= duration && audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
          return;
        }

        const thisTime = audioRef.current?.currentTime || 0;
        setCurrentTime(thisTime);
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentTime]);

  // Play only one track at once when on dashboard
  useEffect(() => {
    if (id && isPlaying && currentPlayingId !== id) {
      playPause();
    }
  }, [currentPlayingId]);

  // Utils
  function playPause() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (currentTime >= duration) {
      setCurrentTime(0);
      audioRef.current?.play();
      return;
    }

    audioRef.current.currentTime = currentTime;
    audioRef.current?.play();
  }

  function changeTime(value: number) {
    if (audioRef.current?.currentTime) {
      audioRef.current.currentTime = Number(value);
      setCurrentTime(Number(value));
    } else {
      setCurrentTime(Number(value));
    }
  }

  function onPlay() {
    setIsPlaying(true);

    if (id) {
      dispatch(setCurrentPlayingId(id));
    }
  }

  return (
    <Stack width="100%" flexDirection="row" gap={1}>
      <Button variant="contained" onClick={playPause}>
        {isPlaying ? <Pause /> : <PlayArrow />}
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

      <audio ref={audioRef} onPlay={onPlay}>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Stack>
  );
};

export default AudioPlayer;
