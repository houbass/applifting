import React, { useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";

interface Props {
  list: string[]
  selection: string[]
  setSelection: (value: string[]) => void
  label: string
}

const ChipField = ({
  list, selection, setSelection, label
}: Props) => {

  // States
  const [currentList, setCurrentList] = useState<string[]>(list);
  currentList.sort();
  
  // Utils
  function instrumentHandler(selected: string) {
    setSelection([...selection, selected]);
    setCurrentList(
      currentList.filter(item => item !== selected)
    );
  }

  function instrumentDelete(selected: string) {
    setSelection(
      selection.filter(item => item !== selected)
    );
    setCurrentList([...currentList, selected]);
  }

  return(
    <Stack>
      <Typography variant="overline">
        {label}
      </Typography>

      {selection.length > 0 && (
        <Box>
          {selection.map(item => {
            return (
              <Box 
                key={item}
                mb={1} 
                mr={1}
                display="inline-block"
              >
                <Chip 
                  color="primary"
                  label={item}
                  onClick={() => instrumentDelete(item)}
                  onDelete={() => instrumentDelete(item)}
                />
              </Box>
            )
          })}
        </Box>
      )}

      <Box>
        {currentList.map(item => {
          return (
            <Box 
              key={item}
              mb={1} 
              mr={1}
              display="inline-block"
            >
              <Chip 
                color="default"
                label={item}
                onClick={() => instrumentHandler(item)}
              />
            </Box>
          )
        })}
      </Box>
    </Stack>
  )
}

export default ChipField;