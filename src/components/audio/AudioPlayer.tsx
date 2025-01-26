import WavesurferPlayer from '@wavesurfer/react';
import { useState } from 'react';
import { CircularProgress, Box, Button, Stack } from '@mui/material';
import { DeleteForever, PlayArrow, Pause } from '@mui/icons-material';

interface Props {
  audioUrl: string
  setAudioPreview: (value: null) => void
}

const AudioPlayer = ({
  audioUrl, setAudioPreview
}: Props) => {
  
  const [wavesurfer, setWavesurfer] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onReady = (ws: any) => {
    setWavesurfer(ws)
    setIsPlaying(false)
  }

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }

  return (
    <>
      <Stack position="relative" alignItems="center">
        {!wavesurfer && (
          <Box position="absolute">
            <CircularProgress />
          </Box>
        )}

        <Stack 
          width="100%"
          flexDirection="row" 
          gap={2}  
          visibility={
            wavesurfer
            ? "visible"
            : "hidden"
          }
        >
          <Button 
            variant="text"
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
              waveColor='#ccc'
              progressColor='#aaa'
              barWidth={2}
              barGap={2}
              onReady={onReady}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </Box>

          <Button 
            variant="contained"
            onClick={() => setAudioPreview(null)}
          >
            <DeleteForever />
          </Button>

        </Stack>
      </Stack>
    </>
  )
}

export default AudioPlayer;