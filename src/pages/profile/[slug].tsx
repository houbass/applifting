
import React from 'react';
import { Stack, Typography } from '@mui/material';

// Constatnts
import { PAGE_PADDING_TOP } from '@/constants/globalConstants';

// Hooks
import { useRouter } from 'next/router';
import useGetUserData from '@/hooks/firebase/useGetUserData';


const Profile = () => {
  // Hooks
  const router = useRouter();
  const { slug } = router.query;
  const id = slug as string;
  const { data, isLoading} = useGetUserData(id);

  console.log(slug)

  // States
  console.log('--- data', data)  

  if (isLoading) return <p>Loading...</p>; 

  if (!data) return (
    <Stack pt={PAGE_PADDING_TOP}>
      <Typography>No such a profile</Typography>
    </Stack>
  )

  if (data) return (
    <Stack pt={PAGE_PADDING_TOP}>
      <Typography>this is profile {data.uid}</Typography>
    </Stack>
  )
}

export default Profile;