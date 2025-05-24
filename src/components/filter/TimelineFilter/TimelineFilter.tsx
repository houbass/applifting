import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectFilterData, setFilterData } from "@/redux/slices/dashboardSlice";

// Components
import FilterDialog from "./FilterDialog";
import ChipFieldItem from "../ChipFieldItem";

const btnStyle = {
  fontSize: "10px",
  padding: '5px 10px',
  textAlign: 'center'
}

const TimelineFilter = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // States
  const { filter } = router.query
  const urlData = filter && JSON.parse(filter as string)
  console.log('--- filter', (urlData))

  const [open, setOpen] = useState(false);
  const { instruments, styles } = useSelector(selectFilterData)
  const arr = useMemo(() => {
    return instruments.concat(styles)
  }, [instruments, styles])

  // Utils
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onDelete(item: string) {
    const isInstrument = instruments.includes(item);

    if(isInstrument) {
      const filterObj = {
        instruments: instruments.filter(ins => ins !== item),
        styles
      }

      // Put it to URL params
      router.push({
        query: {
          filter: JSON.stringify(filterObj)
        }
      })

      dispatch(
        setFilterData(filterObj)
      )
    } else {
      const filterObj = {
        instruments,
        styles: styles.filter(style => style !== item)
      }

      // Put it to URL params
      router.push({
        query: {
          filter: JSON.stringify(filterObj)
        }
      })

      dispatch(
        setFilterData({
          instruments,
          styles: styles.filter(style => style !== item)
        })
      )
    }
  }

  return (
    <>
      <Box 
        mt={1}
        mb={arr.length > 0 ? 0 : 1}
      >
        <Stack
          mb={arr.length > 0 ? 1 : 0} 
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
      />
    </>
  )
}

export default TimelineFilter;
