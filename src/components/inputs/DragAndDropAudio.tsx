import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DeleteForever, CloudUpload } from "@mui/icons-material";

interface AudioPreview {
  url: string
  file: File
}

const DragAndDropAudio = () => {

  const [audioPreview, setAudioPreview] = useState<AudioPreview | null>(null);


  // TODO add types
  const onDrop = useCallback((acceptedFiles: File[]) => {
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

    
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop, 
    accept: { 
      'audio/mpeg': ['.mp3'] // Correctly typed for TypeScript
    }
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
              <CloudUpload />
              <Typography  variant="overline">
                Drag 'n' drop audio preview here, or click to select file.
              </Typography>
            </Stack>

            <Typography variant="overline">
              (only mp3 is allowed)
            </Typography>
          </Stack>
        </Box>
      )}

      {audioPreview && (
        <Stack flexDirection="row" gap={1}>
          <audio controls src={audioPreview.url} style={{ width: '100%' }}>
            Your browser does not support the audio element.
          </audio>

          <Button 
            variant="contained"
            onClick={() => setAudioPreview(null)}
          >
            <DeleteForever />
          </Button>
        </Stack>
      )}
    </>
  )
}

export default DragAndDropAudio;