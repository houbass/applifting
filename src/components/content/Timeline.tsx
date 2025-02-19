import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

// Components
import NewAudioPlayer from "../audio/NewAudioPlayer";

const Timeline = () => {
  const theme = useTheme();

  
  const url = [
    
    {
      name: "Check My Bitchees",
      auth: "David Haslhoof",
      url: "",
      instruments: ["guitar", "bass"],
      styles: ["drum and bass"]
    },
    
  ]

  return (
    <Stack pt={3} gap={1}>
      
      {url?.map((item, index) => {
        return (
          <Stack borderRadius={2} pl={1} key={item.name + item.auth + index} bgcolor={theme.palette.action.hover}>
            <Stack >
              <Typography variant="overline">
                {item.name + ' - ' + item.auth}
              </Typography>

              <Box pr={1}>
                <NewAudioPlayer url={item.url} />
              </Box>
              
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
                {item.styles.map(style => {
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
      })}
    </Stack>
  )
}

export default Timeline;