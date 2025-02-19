import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Chip, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

// Types
import { AudioCollectionItem } from "@/components/types";

// Components
import MyAudioPlayer from "../audio/MyAudioPlayer";

const Timeline = () => {
  const theme = useTheme();
  const bgColor = theme.palette.action.hover;

  // States
  const [data, setData] = useState<AudioCollectionItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch data
  useEffect(() => {
    if(!data) {
      fetchCollection();
    }
  }, []);

  // Utils
  const fetchCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "audio"));
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(items as AudioCollectionItem[]);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  };


  if(loading) {
    return (
      <Stack justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <Stack pt={3} gap={1}>
      {data?.map((item, index) => {
        return (
          <Stack 
            borderRadius={2} 
            pl={1} 
            key={item.projectName + item.userName + index} 
            bgcolor={bgColor}
          >
            <Stack >
              <Typography variant="overline">
                {item.projectName + ' - ' + item.userName}
              </Typography>


              <MyAudioPlayer 
                url={item.url}
                waveformData={item.waveform}
                duration={item.duration}
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
      })}
    </Stack>
  )
}

export default Timeline;