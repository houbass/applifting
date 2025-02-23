
import React from 'react';
import { Stack, Typography, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/redux/slices/userSlice';

// Types
import { AudioCollectionItem } from '@/components/types';

// Hooks
import { useRouter } from 'next/router';
import useGetUserData from '@/hooks/firebase/useGetUserData';
import useGetUserSongs from '@/hooks/firebase/useGetUserSongs';
import useHomeRedirect from '@/hooks/redirects/useHomeRedirect';
import { setFilterOut } from '@/redux/slices/dashboardSlice';

// Utils
import { deleteDocumentById, removeProjectId, deleteFileFromStorage } from '@/utils/firebase';
import { formatedFileName } from '@/hooks/upload/utils';

// Components
import BasicHead from '@/components/containers/BasicHead';
import SongCard from '@/components/content/SongCard';
import PageLayout from '@/components/containers/PageLayout';

// TODO infinitive scrolling
const Profile = () => {
  // Hooks
  // Redirect when logout
  const { user, userCheck } = useHomeRedirect();
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;
  const id = user && userCheck ? slug as string : undefined;

  // Fetch user data
  const { data, isLoading } = useGetUserData(id);

  // TODO move it to redux (just user profile)
  const { songs, setSongs, isSongsLoading } = useGetUserSongs(id);

  // Utils
  const onDelete = async(song: AudioCollectionItem) => {
    // Handle deletion
    if(!id) return;
    const songId = song.id;
    const collection = 'audio'
    try {
      const filePath = `audio/${id}/${formatedFileName(song.projectName)}`
      
      // Delete track from storage
      await deleteFileFromStorage(filePath)
      // Delete from collection
      await deleteDocumentById(collection, songId);
      // Delete it from user projectIds array
      await removeProjectId(id, songId)

      // filter out current profile
      const filteredSongs = songs?.filter(item => item.id !== songId) || [];
      setSongs(filteredSongs)

      // Filterout timeline data if this song is included
      dispatch(setFilterOut(songId));

      // Info message when deleted
      dispatch(setAlert({
        text: 'Song has been deleted successfully',
        type: 'success'
      }))

    }
    catch(err) {
      console.error(err)
      // Info message on error
      dispatch(setAlert({
        text: String(err),
        type: 'success'
      }))
    }    
  }

  if(!user || !userCheck) return

  if (isLoading || isSongsLoading) return (
    <PageLayout>
      <CircularProgress />
    </PageLayout>
  )

  if (!data) return (
    <>
      <BasicHead title='Profile'/>

      <PageLayout>
        <Typography>No such a profile</Typography>
      </PageLayout>
    </>
  )

  if (data) return (
    <>
      <BasicHead title={data.userName}/>

      <PageLayout>
        <Typography>{data.userName} &apos;s profile </Typography>

        <Stack>
          {songs && songs.map((song, index) => {
            if(user?.uid === id) {
              return (
                <SongCard 
                  key={index}
                  item={song} 
                  onDelete={() => onDelete(song)}
                />
              )
            } else {
              return (
                <SongCard 
                  key={index}
                  item={song} 
                />
              )
            }
          })}
        </Stack>
      </PageLayout>
    </>
  )
}

export default Profile;