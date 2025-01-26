
import { useRef, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

// Constants
import { SCROLL_MARGIN_TOP } from "@/constants/globalConstants";

// Types
import { AudioPreview, Message } from "@/components/types";

// Utils
import { scrollIn } from "../../../utils/utils";
import { INSTRUMENTS, STYLES } from "@/constants/globalConstants";

// Components
import ChipField from "@/components/ChipField";
import DragAndDropAudio from "../../../components/inputs/DragAndDropAudio";
import Snackbar from "@/components/alerts/Snackbar";


const CreateProjectForm = () => {

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
  const [message, setMessage] = useState<Message | null>(null);
  
  function validation() {
    if(projectName.length === 0) {
      setMessage({
        text: "Project name is required",
        type: "error"
      })

      projectNameRef.current && scrollIn(projectNameRef?.current);
    } else if (instrumentSelection.length === 0) {
      setMessage({
        text: "Selecet what you looking for",
        type: "error"
      })

      instrumentsRef.current && scrollIn(instrumentsRef.current);
    } else if (styleSelection.length === 0) {
      setMessage({
        text: "Select what genre is your demo",
        type: "error"
      })

      styleRef.current && scrollIn(styleRef.current);
    } else if (!audioPreview) {
      setMessage({
        text: "Add your demo",
        type: "error"
      })

      audioRef.current && scrollIn(audioRef.current); 
    } else {
      console.log("SEND IT TO DATABASE")
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

      <Snackbar 
        message={message} 
        setMessage={setMessage}
      />
    </Stack>
  )
}

export default CreateProjectForm;