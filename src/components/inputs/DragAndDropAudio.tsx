import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Box, Stack, Typography } from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import { Message } from "@/components/types";

// Types
import { AudioPreview } from "@/components/types";

// Components
import AudioPlayer from "../audio/AudioPlayer";
import Snackbar from "../alerts/Snackbar";

interface Props {
  audioPreview: AudioPreview | null
  setAudioPreview: (state: AudioPreview | null) => void
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB in bytes

const DragAndDropAudio = ({
  audioPreview,
  setAudioPreview
}: Props) => {

  //const [audioPreview, setAudioPreview] = useState<AudioPreview | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const rejection = fileRejections[0];
    if(rejection) {
      const errorMessage = rejection.errors[0].message;
      setMessage({
        text: errorMessage,
        type: "error"
      });

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

          /*
          // You can still upload the file directly to Firebase
          const storageRef = ref(storage, `audio/${file.name}`);
          uploadBytes(storageRef, file).then(() => {
            console.log('File uploaded successfully');
          });
          */
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }, [])

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
          p={3}
          bgcolor="lightgray"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={120}
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

      <Snackbar 
        message={message} 
        setMessage={setMessage} 
      />
    </>
  )
}

export default DragAndDropAudio;