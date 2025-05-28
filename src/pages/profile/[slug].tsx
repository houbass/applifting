import React, { useState } from "react";
import { Stack, Typography, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAlert } from "@/redux/slices/userSlice";

// Types
import { AudioCollectionItem } from "@/components/types";
import { GetServerSidePropsContext } from "next";

// Hooks
import { useRouter } from "next/router";
import useGetUserData from "@/hooks/firebase/useGetUserData";
import useGetUserSongs from "@/hooks/firebase/useGetUserSongs";
import useHomeRedirect from "@/hooks/redirects/useHomeRedirect";
import useGetTimelineData from "@/hooks/firebase/useGetTimelineData";

// Utils
import {
  deleteDocumentById,
  removeProjectId,
  deleteFileFromStorage,
} from "@/utils/firebase";
import { formatedFileName } from "@/hooks/upload/utils";

// Components
import BasicHead from "@/components/containers/BasicHead";

import PageLayout from "@/components/containers/PageLayout";

// TODO infinitive scrolling
const Profile = () => {
  // Redirect when logout
  const { user, userCheck } = useHomeRedirect();

  // Hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;
  const { fetchTimeline } = useGetTimelineData();

  // States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<AudioCollectionItem | null>(
    null
  );
  const id = user && userCheck ? (slug as string) : undefined;

  // Fetch user data
  const { data, isLoading } = useGetUserData(id);
  const { songs, setSongs, isSongsLoading, fetchUserSongs } =
    useGetUserSongs(id);

  // Utils
  const onDelete = async (song: AudioCollectionItem) => {
    // Handle deletion
    if (!id) return;
    const songId = song.id;
    const collection = "audio";
    try {
      const filePath = `audio/${id}/${formatedFileName(song.projectName)}`;

      // Delete track from storage
      await deleteFileFromStorage(filePath);
      // Delete from collection
      await deleteDocumentById(collection, songId);
      // Delete it from user projectIds array
      await removeProjectId(id, songId);

      // filter out current profile
      const filteredSongs = songs?.filter((item) => item.id !== songId) || [];
      setSongs(filteredSongs);

      // Info message when deleted
      dispatch(
        setAlert({
          text: "Song has been deleted successfully",
          type: "success",
        })
      );
    } catch (err) {
      console.error(err);
      // Info message on error
      dispatch(
        setAlert({
          text: String(err),
          type: "success",
        })
      );
    }
  };

  function onEdit(song: AudioCollectionItem) {
    setIsDialogOpen(true);
    setSelectedSong(song);
  }

  async function onUpdate() {
    try {
      await fetchUserSongs(id as string, setSongs);
      await fetchTimeline();
      //setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user || !userCheck) return;

  if (isLoading || isSongsLoading)
    return (
      <PageLayout>
        <CircularProgress />
      </PageLayout>
    );

  if (!data)
    return (
      <>
        <BasicHead title="Profile" />

        <PageLayout>
          <Typography>No such a profile</Typography>
        </PageLayout>
      </>
    );

  if (data)
    return (
      <>
        <BasicHead title={data.userName} />

        <PageLayout>
          <Typography>{data.userName}</Typography>

          <Stack gap={1}>
            <p>profile</p>
          </Stack>
        </PageLayout>
      </>
    );
};

export default Profile;
