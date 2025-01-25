
import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

// Components
import ChipField from "@/components/ChipField";
import DragAndDropAudio from "../inputs/DragAndDropAudio";

const CreateProjectForm = () => {
  const instruments = [
    "anything", "bass", "brass", "drums", "guitar", "keys", "percussion", "piano", 
    "strings", "synth", "vocal", "woodwinds"
  ];

  const styles = [
    "house", "hip hop", "cinematic", "techno", "trap", "edm", "pop", "tech house", "rnb",
    "deep house", "downtempo", "soul", "dubstep", "drum and bass", "progressive house",
    "ambient", "experimental", "trance", "future bass", "lo-fi hip hop", "synthwave", 
    "funk", "uk garage", "disco", "electro", "future house", "rock", "chillout", "psy trance",
    "bass music", "boom bap", "jazz", "idm", "drumstep", "synth-pop", "drill"
  ];
  
  const [instrumentSelection, setInstrumentSelection] = useState<string[]>([]);
  const [styleSelection, setStyleSelection] = useState<string[]>([]);
  
  console.log("--- instrumentSelection ---")
  console.log(instrumentSelection)

  console.log("--- styleSelection ---")
  console.log(styleSelection)

  return (
    <Stack gap={1}>
      <Box mb={1} width="100%">
        <TextField 
          fullWidth
          id="outlined-basic" 
          label="Project Name" 
          variant="outlined" 
        />
      </Box>
    
      <ChipField 
        list={instruments} 
        selection={instrumentSelection}
        setSelection={setInstrumentSelection}
        label="What Are You Looking For?"
      />

      <ChipField 
        list={styles} 
        selection={styleSelection}
        setSelection={setStyleSelection}
        label="What Genre is it?"
      />

      <DragAndDropAudio />

      <Button 
        variant="contained" 
        onClick={() => console.log("SUBMIT")}
      >
        Submit
      </Button>
    </Stack>
  )
}

export default CreateProjectForm;