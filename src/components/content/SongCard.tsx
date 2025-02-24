import React from "react";
import Link from "next/link";
import { 
  Avatar, 
  Box, 
  Button,
  Card,
  Divider, 
  Chip, 
  Stack, 
  Typography, 
  useTheme 
} from "@mui/material";

// Utils
import { formatTimestamp } from "@/utils/utils";

// Types
import { AudioCollectionItem } from "../types";

// Components
import AudioPlayer from "../audio/AudioPlayer";

interface Props {
  item: AudioCollectionItem
  onDelete?: () => void
}

const AVATAR_WIDTH = "20px";

const SongCard = ({ 
  item, onDelete 
}: Props) => {

  // States
  const { userName, description, userPhotoURL } = item;
  const firstLetter = userName[0].toUpperCase();
  
  // Colors
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const primaryColor = theme.palette.primary.main;

  const date = formatTimestamp(item.timeStamp)

  return (
    <Card>
      <Stack 
        borderRadius={2}  
      >  
        <Stack 
          p={1} 
          flexDirection="row"
          alignItems="center" 
          justifyContent="space-between"
        >
          <Stack flexDirection="row" gap={1} alignItems="center">
            {userPhotoURL.length > 0 
              ? (
                <Avatar 
                  alt={userName} 
                  src={userPhotoURL} 
                  sx={{
                    width: AVATAR_WIDTH, 
                    height: AVATAR_WIDTH,
                  }}
                />)
              : (
                <Avatar 
                  alt={userName}
                  sx={{
                    width: AVATAR_WIDTH, 
                    height: AVATAR_WIDTH, 
                    fontSize: "12px", 
                    fontWeight: '500',
                    color: textColor,
                  }}
                >
                  {firstLetter}
                </Avatar>)
            }

            <Link href={`/profile/${item.uid}`} style={{ textDecoration: 'none' }} >              
              <Typography 
                color={textColor} 
                variant="caption"
                sx={{
                  '&:hover' : {
                    color: primaryColor
                  }
                }}
              >
                {item.userName}
              </Typography>
            </Link>
            
          </Stack>

          <Button 
            size="small" 
            variant="contained"
          >
            lets collab
          </Button>
        </Stack>       

        <Divider />

        <Stack px={2} pt={2} pb={1} gap={1}>
          <Typography variant="inherit">
            {description}
          </Typography>

          <Divider />
        </Stack> 

        <Stack px={2} pb={2}> 
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="overline">
              {item.projectName}
            </Typography>

            <Typography variant="overline">
              {date}
            </Typography>
          </Stack>

          <AudioPlayer 
            url={item.url}
            waveformData={item.waveform}
            duration={item.duration}
            onDelete={onDelete}
          />
        </Stack>

        <Divider />

        <Stack 
          pt={1}  
          flexDirection="row" 
        >
          <Stack gap={0.5} flex={1} pl={1}>
            <Typography 
              color="textSecondary" 
              fontSize={10} 
              textTransform="uppercase"
            >
              Looking for
            </Typography>
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
          </Stack>

          <Stack gap={0.5} textAlign="right" flex={1}>
            <Typography 
              color="textSecondary" 
              fontSize={10} 
              textTransform="uppercase"
              pr={1}
            >
              Style
            </Typography>

            <Box > 
              {item.style.map(style => {
                return (
                  <Box 
                    key={style}
                    mb={1} 
                    mr={1}
                    display="inline-block"
                  >
                    <Chip color="default" label={style} size="small" />
                  </Box>
                )
              })}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export default SongCard;