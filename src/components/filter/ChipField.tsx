import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAlert } from "@/redux/slices/userSlice";
import ChipFieldItem from "./ChipFieldItem";

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
  const initialList = list.filter(item => !selection.includes(item))
  const [currentList, setCurrentList] = useState<string[]>(initialList);
  currentList.sort();
  
  // Utils
  function instrumentHandler(selected: string) {

    // Max 3elements
    if(selection.length > 2) {
      dispatch(setAlert({
        text: `you can select maximum 3 ${title}`,
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
              <ChipFieldItem 
                key={item}
                label={item}
                onClick={() => instrumentHandler(item)}
                onDelete={() => instrumentDelete(item)}
                size="medium"
                color="primary"
              />
            )
          })}
        </Box>
      )}

      <Box>
        {currentList.map(item => {
          return (
            <ChipFieldItem 
              key={item}
              label={item}
              onClick={() => instrumentHandler(item)}
            />
          )
        })}
      </Box>
    </Stack>
  )
}

export default ChipField;