import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

// Components
import AudioPlayer from "../audio/AudioPlayer";

const Timeline = () => {
  const theme = useTheme();
  const url = [
    {
      name: "Check My Bitchees",
      auth: "David Haslhoof",
      url: "https://firebasestorage.googleapis.com/v0/b/collabro-281e7.firebasestorage.app/o/audio%2F1d4i8yny3YVQvck8apxXGUU7jFq1%2Faa?alt=media&token=f3d5ad99-6eaf-4c61-b227-ca4c637d3c24",
      instruments: ["guitar", "bass"],
      styles: ["drum and bass"]
    },
    {
      name: "While You Sleep",
      auth: "On Sun",
      url: "https://firebasestorage.googleapis.com/v0/b/collabro-281e7.firebasestorage.app/o/audio%2F1d4i8yny3YVQvck8apxXGUU7jFq1%2Fdw?alt=media&token=e8495e96-3c17-4c64-9695-e866b8b4b0e6",
      instruments: ["guitar", "bass"],
      styles: ["house"]
    },
    {
      name: "Check My Bitchees",
      auth: "David Haslhoof",
      url: "https://firebasestorage.googleapis.com/v0/b/collabro-281e7.firebasestorage.app/o/audio%2F1d4i8yny3YVQvck8apxXGUU7jFq1%2Faa?alt=media&token=f3d5ad99-6eaf-4c61-b227-ca4c637d3c24",
      instruments: ["guitar", "bass"],
      styles: ["drum and bass"]
    },
    {
      name: "While You Sleep",
      auth: "On Sun",
      url: "https://firebasestorage.googleapis.com/v0/b/collabro-281e7.firebasestorage.app/o/audio%2F1d4i8yny3YVQvck8apxXGUU7jFq1%2Fdw?alt=media&token=e8495e96-3c17-4c64-9695-e866b8b4b0e6",
      instruments: ["guitar", "bass"],
      styles: ["drum and bass", "bass music"]
    },
    {
      name: "Check My Bitchees",
      auth: "David Haslhoof",
      url: "https://firebasestorage.googleapis.com/v0/b/collabro-281e7.firebasestorage.app/o/audio%2F1d4i8yny3YVQvck8apxXGUU7jFq1%2Faa?alt=media&token=f3d5ad99-6eaf-4c61-b227-ca4c637d3c24",
      instruments: ["guitar", "bass"],
      styles: ["drum and bass"]
    },
    {
      name: "While You Sleep",
      auth: "On Sun",
      url: "https://firebasestorage.googleapis.com/v0/b/collabro-281e7.firebasestorage.app/o/audio%2F1d4i8yny3YVQvck8apxXGUU7jFq1%2Fdw?alt=media&token=e8495e96-3c17-4c64-9695-e866b8b4b0e6",
      instruments: ["guitar", "bass"],
      styles: ["drum and bass", "bass music"]
    },
  ]

  return (
    <Stack pt={3} gap={1}>
      
      {url.map((item, index) => {
        return (
          <Stack key={item.name + item.auth + index} bgcolor={theme.palette.action.hover}>
            <Stack >
              <Typography variant="overline">
                {item.name + ' - ' + item.auth}
              </Typography>
              <AudioPlayer audioUrl={item.url} />
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