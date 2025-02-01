import React, { useRef, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAlert } from "@/redux/slices/userSlice";

// Hooks
import useAudioFileUpload from "@/hooks/upload/useAudioFileUpload";

// Constants
import { SCROLL_MARGIN_TOP } from "@/constants/globalConstants";

// Types
import { AudioPreview } from "@/components/types";

// Utils
import { scrollIn } from "../../utils/utils";
import { INSTRUMENTS, STYLES } from "@/constants/globalConstants";

// Components
import ChipField from "@/components/ChipField";
import DragAndDropAudio from "../inputs/DragAndDropAudio";
import Snackbar from "@/components/alerts/Snackbar";

const CreateProjectForm = () => {

  // Hooks
  const dispatch = useDispatch();
  const { handleUpload, isUploading, progress } = useAudioFileUpload();

  console.log('--- handleUpload ---')
  console.log(isUploading)
  console.log(progress)


  // Refs
  const projectNameRef = useRef<HTMLInputElement>(null);
  const instrumentsRef = useRef<HTMLInputElement>(null);
  const styleRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLInputElement>(null);
  
  // States
  const [projectName, setProjectName] = useState("");
  const [instrumentSelection, setInstrumentSelection] = useState<string[]>([]);
  const [styleSelection, setStyleSelection] = useState<string[]>([]);
  const [audioPreview, setAudioPreview] = useState<AudioPreview | null>(null);
  
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
      console.log("SEND IT TO DATABASE")

      if(audioPreview) {
        handleUpload(audioPreview.file)
      }
      
    }
  }

  return (
    <Stack gap={1} pt={6}>
      <Box 
        ref={projectNameRef}
        mb={1} 
        width="100%"
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP
        }}
      >
        <TextField 
          fullWidth
          id="outlined-basic" 
          label="Project Name" 
          variant="outlined" 
          onChange={(e) => setProjectName(e.target.value)}
        />
      </Box>
    
      <Box 
        ref={instrumentsRef}
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP
        }}
      >
        <ChipField
          list={INSTRUMENTS} 
          selection={instrumentSelection}
          setSelection={setInstrumentSelection}
          label="What Are You Looking For?"
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
          setSelection={setStyleSelection}
          label="Select Genre"
        />
      </Box>

      <Box 
        ref={audioRef}
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP
        }}
      >
        <DragAndDropAudio 
          audioPreview={audioPreview}
          setAudioPreview={setAudioPreview}
        />
      </Box>

      <Button 
        variant="contained" 
        onClick={validation}
      >
        Submit
      </Button>

      <Snackbar />
    </Stack>
  )
}

export default CreateProjectForm;