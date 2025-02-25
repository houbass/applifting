import React, { useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAlert } from "@/redux/slices/userSlice";

interface Props {
  list: string[]
  selection: string[]
  setSelection: (value: string[]) => void
  label: string
  title: string
}

const ChipField = ({
  list, selection, setSelection, label, title
}: Props) => {

  const dispatch = useDispatch()

  // States
  const [currentList, setCurrentList] = useState<string[]>(list);
  currentList.sort();
  
  // Utils
  function instrumentHandler(selected: string) {

    // Max 3elements
    if(selection.length > 2) {
      dispatch(setAlert({
        text: `you can't select more than 3 ${title}`,
        type: 'error'
      }))
    } else {
      setSelection([...selection, selected]);
      setCurrentList(
        currentList.filter(item => item !== selected)
      );
    }
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