import React, { useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Box, Stack, Typography } from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import { setAlert } from "@/redux/slices/userSlice";
import { MAX_FILE_SIZE } from "@/constants/globalConstants";

// Types
import { AudioPreview } from "@/components/types";

// Hooks
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import useGetAudioWaveform from "@/hooks/audioProcess/useGetAudioWaveform";
import { useTranslations } from "next-intl";

// Components
import AudioPlayer from "../audio/AudioPlayer";

interface Props {
  audioPreview: AudioPreview | null;
  setAudioPreview: (state: AudioPreview | null) => void;
}

const DragAndDropAudio = ({ audioPreview, setAudioPreview }: Props) => {
  // Hooks
  const t = useTranslations("createCollab");
  const dispatch = useDispatch();
  const theme = useTheme();

  // get audio waveform data for canvas
  const url = audioPreview?.url;
  const waveformData = useGetAudioWaveform(url);

  // Update audioPreview with waveform data
  useEffect(() => {
    if (waveformData && audioPreview) {
      setAudioPreview({
        ...audioPreview,
        waveform: waveformData,
      });
    }
  }, [waveformData]);

  // Utils
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const rejection = fileRejections[0];
    if (rejection) {
      const errorMessage = rejection.errors[0].message;
      dispatch(
        setAlert({
          text: errorMessage,
          type: "error",
        })
      );
    } else {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = () => {
        if (reader.result) {
          // Create a preview URL using the file contents
          const audioUrl = URL.createObjectURL(
            new Blob([reader.result], { type: file.type })
          );
          const audio = new Audio(audioUrl);
          audio.onloadedmetadata = () => {
            setAudioPreview({
              url: audioUrl,
              file: file,
              duration: audio.duration,
            });
          };
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"], // Correctly typed for TypeScript
    },
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  });

  const onDelete = () => {
    setAudioPreview(null);
  };

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
            cursor: "pointer",
          }}
        >
          <Stack textAlign="center">
            <input {...getInputProps()} />
            <Stack flexDirection="row" gap={1}>
              <FileUpload />
              <Typography variant="overline">
                {t("Drag and drop audio")}
              </Typography>
            </Stack>

            <Typography variant="overline">{t("only mp3")}</Typography>
          </Stack>
        </Box>
      )}

      {waveformData && url && (
        <AudioPlayer
          url={url}
          waveformData={waveformData}
          duration={audioPreview.duration}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default DragAndDropAudio;
