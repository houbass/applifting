
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useHomeRedirect from '@/hooks/useHomeRedirect';


const CreateProject = () => {

  const lookingFor = ["anything", "bass", "guitar", "vocal", "other"];
  
  const [instruments, setInstruments] = useState<string[]>(lookingFor);
  const [instrumentSelection, setInstrumentSelection] = useState<string[]>([]);
  
  
  function instrumentHandler(selection: string) {
    setInstrumentSelection([...instrumentSelection, selection]);
    setInstruments(
      instruments.filter(item => item !== selection)
    );
  }

  function instrumentDelete(selection: string) {
    setInstrumentSelection(
      instrumentSelection.filter(item => item !== selection)
    );
    setInstruments([...instruments, selection]);
  }

  console.log(instrumentSelection)

  useHomeRedirect();

  return (
    <Stack alignItems="center">
      <Typography>
        CREATE COLLAB PROJECT
      </Typography>
      <Box width="100%" maxWidth={600}>
        <Stack gap={1}>
          <TextField 
            id="outlined-basic" 
            label="Project Name" 
            variant="outlined" 
          />

          {instrumentSelection.length > 0 && (
            <Box>
              {instrumentSelection.map(instrument => {
                return (
                  <Chip 
                    key={instrument}
                    label={instrument}
                    onDelete={() => instrumentDelete(instrument)}
                  />
                )
              })}
            </Box>
          )}

          <Box>
            {instruments.map(instrument => {
              return (
                <Chip 
                  key={instrument}
                  label={instrument}
                  onClick={() => instrumentHandler(instrument)}
                />
              )
            })}
          </Box>

          <Button 
            variant="contained" 
            onClick={() => console.log("SUBMIT")}
          >
            Submit
          </Button>

        </Stack>
      </Box>
    </Stack>
  )
}

export default CreateProject;