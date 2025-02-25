import React from 'react';

import { Dialog, Stack, IconButton, Box } from '@mui/material';
import { Close } from "@mui/icons-material";
import ChipField from '../ChipField';

import { INSTRUMENTS, STYLES } from '@/constants/globalConstants';

export interface Props {
  open: boolean;
  onClose: () => void;
  instrumentSelection: string[]
  setInstrumentSelection: (value: string[]) => void
  styleSelection: string[]
  setStyleSelection: (value: string[]) => void
}

const FilterDialog = ({ 
  open, 
  onClose, 
  instrumentSelection, 
  setInstrumentSelection, 
  styleSelection,
  setStyleSelection  
}: Props) => {

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <Stack alignItems="flex-end">
          <Box p={1} width="fit-content">
            <IconButton size="small" onClick={handleClose}>
              <Close fontSize="small"/>
            </IconButton>
          </Box>
        </Stack>
        <Stack px={2} pb={4} gap={2}>
          <ChipField
            list={INSTRUMENTS} 
            selection={instrumentSelection}
            setSelection={setInstrumentSelection}
            label="select What you looking for"
            title="instruments"
          />

          <ChipField
            list={STYLES} 
            selection={styleSelection}
            setSelection={setStyleSelection}
            label="Select Genre"
            title="styles"
          />
        </Stack>
    </Dialog>
  );
}

export default FilterDialog;
