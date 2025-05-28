import React, { useState } from "react";
import { Stack, Typography, CircularProgress, Dialog } from "@mui/material";
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
import { setFilterOut } from "@/redux/slices/dashboardSlice";
import { useTranslations } from "next-intl";
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
import SongCard from "@/components/content/SongCard";
import PageLayout from "@/components/containers/PageLayout";
import CreateProjectForm from "@/components/forms/CreateProjectForm";

// TODO infinitive scrolling
const Profile = () => {
  // Redirect when logout
  const { user, userCheck } = useHomeRedirect();

  // Hooks
  const t = useTranslations("profile");
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

      // Filterout timeline data if this song is included
      dispatch(setFilterOut(songId));

      // Info message when deleted
      dispatch(
        setAlert({
          text: t("Song has been deleted successfully"),
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
        <BasicHead title={t("Profile")} />

        <PageLayout>
          <Typography>{t("No such a profile")}</Typography>
        </PageLayout>
      </>
    );

  if (data)
    return (
      <>
        <BasicHead title={data.userName} />

        <PageLayout>
          <Typography>{t("profile name", { name: data.userName })}</Typography>

          <Stack gap={1}>
            {songs &&
              songs.map((song, index) => {
                if (user?.uid === id) {
                  return (
                    <SongCard
                      key={index}
                      item={song}
                      onDelete={() => onDelete(song)}
                      onEdit={() => onEdit(song)}
                    />
                  );
                } else {
                  return <SongCard key={index} item={song} />;
                }
              })}
          </Stack>
        </PageLayout>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <Stack p={2}>
            <CreateProjectForm
              song={selectedSong}
              onUpdate={onUpdate}
              setIsDialogOpen={setIsDialogOpen}
            />
          </Stack>
        </Dialog>
      </>
    );
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const locale = context.locale || "en";

  const profile = (await import(`../../../messages/${locale}/profile.json`))
    .default;

  const songCard = (await import(`../../../messages/${locale}/songCard.json`))
    .default;

  const navbar = (await import(`../../../messages/${locale}/navbar.json`))
    .default;

  const timelineFilter = (
    await import(`../../../messages/${locale}/timelineFilter.json`)
  ).default;

  const createCollab = (
    await import(`../../../messages/${locale}/createCollab.json`)
  ).default;

  return {
    props: {
      messages: {
        profile,
        songCard,
        navbar,
        createCollab,
        timelineFilter,
      },
    },
  };
}
