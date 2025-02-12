import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Box, Stack, Typography } from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setAlert } from "@/redux/slices/userSlice";
import { MAX_FILE_SIZE } from "@/constants/globalConstants";
import { useTheme } from "@mui/material";

// Types
import { AudioPreview } from "@/components/types";

// Components
import AudioPlayer from "../audio/AudioPlayer";
import AudioVisualization from "../audio/AudioVisualization";
import NewCanvasPlayer from "../audio/NewCanvasPlayer";

interface Props {
  audioPreview: AudioPreview | null
  setAudioPreview: (state: AudioPreview | null) => void
}

const DragAndDropAudio = ({
  audioPreview,
  setAudioPreview
}: Props) => {

  // States
  const dispatch = useDispatch();
  const theme = useTheme();


  // Utils
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const rejection = fileRejections[0];
    if(rejection) {
      const errorMessage = rejection.errors[0].message;
      dispatch(setAlert({
        text: errorMessage,
        type: "error"
      }))
    } else {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        if (reader.result) {
          // Create a preview URL using the file contents
          const audioUrl = URL.createObjectURL(new Blob([reader.result], { type: file.type }));
          setAudioPreview({
            url: audioUrl,
            file: file
          });
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop, 
    accept: { 
      'audio/mpeg': ['.mp3'] // Correctly typed for TypeScript
    },
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <>
      {!audioPreview && (
        <Box 
          {...getRootProps()} 
          p={2}
          bgcolor={theme.palette.action.hover}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            cursor: 'pointer'
          }}
        >
          <Stack textAlign="center">
            <input {...getInputProps()} />
            <Stack flexDirection="row" gap={1}>
              <FileUpload />
              <Typography  variant="overline">
                Drag and drop audio preview here, or click to select file.
              </Typography>
            </Stack>

            <Typography variant="overline">
              (only mp3 with maximum size 20mb is allowed)
            </Typography>
          </Stack>
        </Box>
      )}


      {audioPreview?.url && (
        <AudioPlayer
          audioUrl={audioPreview.url}
          setAudioPreview={setAudioPreview}
        />
      )}


      {audioPreview?.url && (
        <AudioVisualization
          url={audioPreview.url}
        />
      )}

      {audioPreview?.url && (
        <NewCanvasPlayer
          url={audioPreview.url}
        />
      )}


    </>
  )
}

export default DragAndDropAudio;