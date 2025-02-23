import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, TextField, Modal, Typography, CircularProgress  } from "@mui/material";
import CircularProgressWithLabel from "../progress/CircularProgressWithLabel";
import { useDispatch } from "react-redux";
import { setAlert } from "@/redux/slices/userSlice";
import { useTheme } from "@mui/material";

// Hooks
import useAudioFileUpload from "@/hooks/upload/useAudioFileUpload";
import useRedirect from "@/hooks/redirects/useRedirect";

// Constants
import { SCROLL_MARGIN_TOP } from "@/constants/globalConstants";

// Types
import { FormData } from "@/components/types";

// Utils
import { scrollIn } from "../../utils/utils";
import { INSTRUMENTS, STYLES } from "@/constants/globalConstants";

// Components
import ChipField from "@/components/ChipField";
import DragAndDropAudio from "../inputs/DragAndDropAudio";

const defaultFormData = {
  projectName: '',
  instrumentSelection: [],
  styleSelection: [],
  audioPreview: null,
  description: '',
}

const CreateProjectForm = () => {

  // Hooks
  const dispatch = useDispatch();
  const { goToDashboard } = useRedirect();
  const theme = useTheme();
  const { handleUpload, isUploading, progress, message } = useAudioFileUpload();

  // Refs
  const projectNameRef = useRef<HTMLInputElement>(null);
  const instrumentsRef = useRef<HTMLInputElement>(null);
  const styleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLInputElement>(null);
  
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData); 
  const { projectName, instrumentSelection, styleSelection, audioPreview, description } = formData;

  // Modal turnOn
  useEffect(() => {
    if(isUploading) {
      setIsModalOpen(true)
    }
  }, [isUploading])

  // Utils
  function validation() {
    if(projectName.length === 0 && projectNameRef.current) {
      dispatch(setAlert({
        text: "Project name is required",
        type: "error"
      }))

      scrollIn(projectNameRef.current);
    } else if (instrumentSelection.length === 0 && instrumentsRef.current) {
      dispatch(setAlert({
        text: "Selecet what you looking for",
        type: "error"
      }))

      scrollIn(instrumentsRef.current);
    } else if (description.length === 0 && descriptionRef.current) {
      dispatch(setAlert({
        text: "Describe your project",
        type: "error"
      }))

      scrollIn(descriptionRef.current);
    } else if (styleSelection.length === 0 && styleRef.current) {
      dispatch(setAlert({
        text: "Select what genre is your demo",
        type: "error"
      }))

      scrollIn(styleRef.current);
    } else if (!audioPreview && audioRef.current) {
      dispatch(setAlert({
        text: "Add your demo",
        type: "error"
      }))

      scrollIn(audioRef.current); 
    } else {
      if(audioPreview && audioPreview.waveform) {
        handleUpload(formData)
      }
    }
  }

  function onModalClose() {
    setIsModalOpen(false);
    setFormData(defaultFormData);
    goToDashboard();
  }

  return (
    <Stack gap={2} pt={6}>
      <Stack 
        ref={projectNameRef}
        mb={1} 
        width="100%"
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP
        }}
      >
        <Typography variant="overline">
          Project Name
        </Typography>

        <TextField 
          fullWidth
          id="outlined-basic"  
          placeholder="Name your project"
          variant="outlined" 
          value={projectName}
          onChange={(e) => setFormData({ ...formData , projectName: e.target.value })}
        />
      </Stack>
    
      <Box 
        ref={instrumentsRef}
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP
        }}
      >
        <ChipField
          list={INSTRUMENTS} 
          selection={instrumentSelection}
          setSelection={(arr) => setFormData({ ...formData , instrumentSelection: arr })}
          label="select What you looking for"
        />
      </Box>

      <Box 
        ref={styleRef}
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP
        }}
      >
        <ChipField 
          list={STYLES} 
          selection={styleSelection}
          setSelection={(arr) => setFormData({ ...formData , styleSelection: arr })}
          label="Select Genre"
        />
      </Box>

      <Stack
        ref={descriptionRef}
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP
        }}
      >
        <Typography variant="overline">
          description
        </Typography>

        <TextField
          id="outlined-multiline-static"
          placeholder="Describe your project, (what exactly you are looking and what are your expectations)."
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setFormData({ ...formData , description: e.target.value })}
        />
      </Stack>

      <Stack 
        ref={audioRef}
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP
        }}
      >
        <Typography variant="overline">
          Upload your demo
        </Typography>

        <DragAndDropAudio 
          audioPreview={audioPreview}
          setAudioPreview={(data) => setFormData({ ...formData , audioPreview: data })}
        />
      </Stack>

      <Box mt={1} >
        <Button 
          fullWidth
          variant="contained" 
          onClick={validation}  
        >
          Submit
        </Button>
      </Box>

      <Modal open={isModalOpen}>
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Stack 
            alignItems="center"
            justifyContent="center"
            bgcolor={theme.palette.background.paper} 
            width={400} 
            minHeight={300}
            borderRadius={10}
            gap={2}
          >
            {isUploading && (
              <Box>
                {progress === 0 || progress === 100 
                ? <CircularProgress />
                : <CircularProgressWithLabel value={progress} />
                }
              </Box>
            )}

            <Box minHeight={50} textAlign="center">
              <Typography variant="overline">
                {message}
              </Typography>
            </Box>

            {!isUploading && (
              <Box>
                <Button 
                  variant="contained" 
                  onClick={onModalClose}
                >
                  close
                </Button>
              </Box>
            )}

          </Stack>
        </Stack> 
      </Modal>
    </Stack>
  )
}

export default CreateProjectForm;