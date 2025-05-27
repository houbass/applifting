import React from "react";
import { useRouter } from "next/router";
import { Dialog, Stack, IconButton, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterData, setFilterData } from "@/redux/slices/dashboardSlice";
import { useTranslations } from "next-intl";

// Constants
import { INSTRUMENTS, STYLES } from "@/constants/globalConstants";

// Components
import ChipField from "../ChipField";

export interface Props {
  open: boolean;
  onClose: () => void;
}

const FilterDialog = ({ open, onClose }: Props) => {
  // Hooks
  const t = useTranslations("timelineFilter");
  const dispatch = useDispatch();
  const router = useRouter();

  // Stats
  const { instruments, styles } = useSelector(selectFilterData);

  // Utils
  function setInstruments(instruments: string[]) {
    // Put it to URL params
    router.push({
      query: {
        filter: JSON.stringify({
          instruments,
          styles,
        }),
      },
    });
    dispatch(setFilterData({ instruments, styles }));
  }

  function setStyles(styles: string[]) {
    // Put it to URL params
    router.push({
      query: {
        filter: JSON.stringify({
          instruments,
          styles,
        }),
      },
    });
    dispatch(setFilterData({ instruments, styles }));
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack alignItems="flex-end">
        <Box p={1} width="fit-content">
          <IconButton size="small" onClick={handleClose}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Stack>
      <Stack px={2} pb={4} gap={2}>
        <ChipField
          list={INSTRUMENTS}
          selection={instruments}
          setSelection={setInstruments}
          label={t("Select Instrument")}
          title={t("instruments")}
        />

        <ChipField
          list={STYLES}
          selection={styles}
          setSelection={setStyles}
          label={t("Select Genre")}
          title={t("styles")}
        />
      </Stack>
    </Dialog>
  );
};

export default FilterDialog;
