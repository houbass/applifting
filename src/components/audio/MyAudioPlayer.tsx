import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { DeleteForever, PlayArrow, Pause } from "@mui/icons-material";

// Components
import CanvasWaveform from './CanvasWaveform';

interface Props {
  data: number[];
  setAudioPreview?: (value: null) => void
}

const MyAudioPlayer = ({
  data, setAudioPreview
}: Props) => {

  // States
  const [isPlaying, setIsPlaying] = useState(false)


  // Utils
  const onPlayPause = () => {
    // TODO handle play / pause
    console.log('play / pause');
    setIsPlaying(!isPlaying);
  }


  return (
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

      <CanvasWaveform data={data} height={50}/>

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
  )
}

export default MyAudioPlayer;