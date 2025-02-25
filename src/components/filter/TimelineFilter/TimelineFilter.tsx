import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Box, Button, Stack } from "@mui/material";
import FilterDialog from "./FilterDialog";
import ChipFieldItem from "../ChipFieldItem";

const btnStyle = {
  fontSize: "10px",
  padding: '5px 10px',
  textAlign: 'center'
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
    <>
      <Box 
        my={1}
      >
        <Stack
          mb={1} 
          gap={2}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button 
            variant="outlined"
            color="info"
            sx={btnStyle}
            onClick={handleClickOpen}
          >
            filter by instruments & styles
          </Button>

          <Link href="/createproject" passHref legacyBehavior>
            <Button 
              variant="outlined"
              color="error"
              sx={btnStyle}
            >
              create collab
            </Button>
          </Link>
        </Stack>

        <Box>
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
      </Box>

      <FilterDialog
        open={open}
        onClose={handleClose}
        instrumentSelection={instrumentSelection}
        setInstrumentSelection={setInstrumentSelection}
        styleSelection={styleSelection}
        setStyleSelection={setStyleSelection}
      />
    </>
  )
}

export default TimelineFilter;
