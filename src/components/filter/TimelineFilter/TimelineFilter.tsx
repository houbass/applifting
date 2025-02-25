import React, { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import FilterDialog from "./FilterDialog";
import ChipFieldItem from "../ChipFieldItem";

const btnStyle = {
  fontSize: "10px",
  padding: '5px 10px',
}

const TimelineFilter = () => {

  // States
  const [open, setOpen] = useState(false);
  const [instrumentSelection, setInstrumentSelection] = useState<string[]>([]); 
  const [styleSelection, setStyleSelection] = useState<string[]>([]); 
  
  const arr = useMemo(() => {
    return instrumentSelection.concat(styleSelection)
  }, [instrumentSelection, styleSelection])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onDelete(item: string) {
    const isInstument = instrumentSelection.includes(item);

    if(isInstument) {
      setInstrumentSelection(instrumentSelection.filter(ins => ins !== item));
    } else {
      setStyleSelection(styleSelection.filter(style => style !== item));
    }
  }

  return (
    <Box 
      my={1}
    >
      <Box
        mb={1} 
        mr={1}
        display="inline-block"
      >
        <Button 
          variant="outlined"
          color="info"
          sx={btnStyle}
          onClick={handleClickOpen}
        >
          filter by instruments & styles
        </Button>
      </Box>

      <FilterDialog
        open={open}
        onClose={handleClose}
        instrumentSelection={instrumentSelection}
        setInstrumentSelection={setInstrumentSelection}
        styleSelection={styleSelection}
        setStyleSelection={setStyleSelection}
      />

      {arr.map(item => (
        <ChipFieldItem 
          key={item + 'yoman'}
          label={item}
          onClick={() => null}
          onDelete={() => onDelete(item)}
          size="medium"
          color="primary"
        />
      ))}

    </Box>
  )
}

export default TimelineFilter;
