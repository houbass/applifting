import React from "react";
import Link from "next/link";
import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";

// Utils
import { formatTimestamp } from "@/utils/utils";

// Types
import { AudioCollectionItem } from "../types";

// Components
import MyAudioPlayer from "../audio/MyAudioPlayer";

interface Props {
  item: AudioCollectionItem
  onDelete?: () => void
}

const SongCard = ({ 
  item, onDelete 
}: Props) => {
  
  const theme = useTheme();
  const bgColor = theme.palette.action.hover;
  const textColor = theme.palette.text.primary;
  const primaryColor = theme.palette.primary.main;

  const date = formatTimestamp(item.timeStamp)

  return (
    <Stack 
      borderRadius={2} 
      pl={1} 
      bgcolor={bgColor}
    >  
      <Stack >

        <Stack flexDirection="row" justifyContent="space-between" pr={1}>
          <Typography variant="overline">
            {item.projectName + ' - '}
            <Link href={`/profile/${item.uid}`} style={{ textDecoration: 'none' }} >
              
              <Typography 
                color={textColor} 
                variant="overline"
                sx={{
                  '&:hover' : {
                    color: primaryColor
                  }
                }}
              >
                {item.userName}
              </Typography>

            </Link>
          </Typography>

          <Typography variant="overline">
            {date}
          </Typography>
        </Stack>

        <MyAudioPlayer 
          url={item.url}
          waveformData={item.waveform}
          duration={item.duration}
          onDelete={onDelete}
        />
      </Stack>

      <Stack mt={1} flexDirection="row" justifyContent="space-between">
        <Box> 
          {item.instruments.map(instrument => {
            return (
              <Box 
                key={instrument}
                mb={1} 
                mr={1}
                display="inline-block"
              >
                <Chip label={instrument} size="small" />
              </Box>
            )
          })}
        </Box>

        <Box textAlign="right"> 
          {item.style.map(style => {
            return (
              <Box 
                key={style}
                mb={1} 
                mr={1}
                display="inline-block"
              >
                <Chip color="primary" label={style} size="small" />
              </Box>
            )
          })}
        </Box>
      </Stack>
    </Stack>
  )
}

export default SongCard;