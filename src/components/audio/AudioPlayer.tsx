
import React, { useState } from "react";
import { Box, Button, Stack, Skeleton } from "@mui/material";
import { DeleteForever, PlayArrow, Pause } from "@mui/icons-material";
import WavesurferPlayer from "@wavesurfer/react";
import WaveSurfer from "wavesurfer.js";

interface Props {
  audioUrl: string
  setAudioPreview?: (value: null) => void
}

const AudioPlayer = ({
  audioUrl, setAudioPreview
}: Props) => {
  
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onReady = (ws: WaveSurfer) => {
    setWavesurfer(ws)
    setIsPlaying(false)
  }

  const onPlayPause = () => {
    if(wavesurfer) {
      wavesurfer.playPause()
    }
  }

  return (
    <>
      <Stack position="relative" alignItems="center" >
        {!wavesurfer && (
          <Box 
            pl="70px" 
            pr={1}
            top={-16} 
            width="100%" 
            position="absolute" 
          >
            <Skeleton height={80} sx={{margin: "0"}}/>
          </Box>
        )}

        <Stack 
          width="100%"
          flexDirection="row" 
          gap={1}  
        >
          <Button 
            variant="contained"
            onClick={onPlayPause}
          >
            
            {isPlaying 
            ? <Pause />
            : <PlayArrow />
            }

          </Button>

          <Box width="100%">
            <WavesurferPlayer
              width="100%"
              height={50}
              url={audioUrl}
              waveColor="#ccc"
              progressColor="#aaa"
              barWidth={2}
              barGap={2}
              onReady={onReady}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              backend="MediaElement"
            />
          </Box>

          {setAudioPreview && (
            <Button 
              variant="contained"
              size="small"
              color="error"
              onClick={() => setAudioPreview(null)}
            >
              <DeleteForever />
            </Button>
          )}

        </Stack>
      </Stack>
    </>
  )
}

export default AudioPlayer;