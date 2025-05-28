import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Modal,
  Typography,
  CircularProgress,
} from "@mui/material";
import CircularProgressWithLabel from "../progress/CircularProgressWithLabel";
import { useDispatch } from "react-redux";
import { setAlert } from "@/redux/slices/userSlice";
import { useTheme } from "@mui/material";

// Hooks
import useAudioFileUpload from "@/hooks/upload/useAudioFileUpload";
import useRedirect from "@/hooks/redirects/useRedirect";
import { useTranslations } from "next-intl";

// Constants
import { SCROLL_MARGIN_TOP } from "@/constants/globalConstants";

// Types
import { FormData, AudioCollectionItem } from "@/components/types";

// Utils
import { scrollIn } from "../../utils/utils";
import { INSTRUMENTS, STYLES } from "@/constants/globalConstants";

// Components
import ChipField from "@/components/filter/ChipField";
import DragAndDropAudio from "../inputs/DragAndDropAudio";

const MAX_PROJECTNAME_LENGTH = 40;
const MAX_DESCRIPTION_LENGTH = 300;

interface Props {
  song?: AudioCollectionItem | null;
  onUpdate?: () => Promise<void>;
  setIsDialogOpen?: (isOpen: boolean) => void;
}

const CreateProjectForm = ({ song, onUpdate, setIsDialogOpen }: Props) => {
  // Hooks
  const t = useTranslations("createCollab");
  const tTimeline = useTranslations("timelineFilter");
  const dispatch = useDispatch();
  const { goToDashboard } = useRedirect();
  const theme = useTheme();
  const { handleUpload, handleUpdate, isUploading, progress, message } =
    useAudioFileUpload();

  // Refs
  const projectNameRef = useRef<HTMLInputElement>(null);
  const instrumentsRef = useRef<HTMLInputElement>(null);
  const styleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLInputElement>(null);

  // States
  const defaultFormData = {
    projectName: song?.projectName || "",
    instrumentSelection: song?.instruments || [],
    styleSelection: song?.style || [],
    audioPreview: null,
    description: song?.description || "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const {
    projectName,
    instrumentSelection,
    styleSelection,
    audioPreview,
    description,
  } = formData;

  // Modal turnOn
  useEffect(() => {
    if (isUploading) {
      setIsModalOpen(true);
    }
  }, [isUploading]);

  // Utils
  async function validation() {
    try {
      if (projectName.length === 0 && projectNameRef.current) {
        dispatch(
          setAlert({
            text: t("Project name is required"),
            type: "error",
          })
        );

        scrollIn(projectNameRef.current);
        return;
      } else if (instrumentSelection.length === 0 && instrumentsRef.current) {
        dispatch(
          setAlert({
            text: t("Selecet what instruments you looking for"),
            type: "error",
          })
        );

        scrollIn(instrumentsRef.current);
        return;
      } else if (styleSelection.length === 0 && styleRef.current) {
        dispatch(
          setAlert({
            text: t("Select what genre is your demo"),
            type: "error",
          })
        );

        scrollIn(styleRef.current);
        return;
      } else if (description.length === 0 && descriptionRef.current) {
        dispatch(
          setAlert({
            text: t("Describe your project"),
            type: "error",
          })
        );

        scrollIn(descriptionRef.current);
        return;
      } else if (!song && !audioPreview && audioRef.current) {
        dispatch(
          setAlert({
            text: t("Add your demo"),
            type: "error",
          })
        );

        scrollIn(audioRef.current);
        return;
      } else {
        if (!song && audioPreview && audioPreview.waveform) {
          handleUpload(formData);
        }

        // If editing song
        if (song && onUpdate) {
          await handleUpdate(formData, song.id);
        }
      }
    } catch (err) {
      console.error(err);
      dispatch(
        setAlert({
          text: String(err),
          type: "error",
        })
      );
    }
  }

  function projectNameOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.length < MAX_PROJECTNAME_LENGTH) {
      setFormData({ ...formData, projectName: e.target.value });
    } else {
      dispatch(
        setAlert({
          text: t("Project name is too long"),
          type: "error",
        })
      );
    }
  }

  function descriptionOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.length < MAX_DESCRIPTION_LENGTH) {
      setFormData({ ...formData, description: value });
    } else {
      dispatch(
        setAlert({
          text: t("Description is too long"),
          type: "error",
        })
      );
    }
  }

  async function onModalClose() {
    setIsModalOpen(false);
    setFormData(defaultFormData);

    if (setIsDialogOpen && onUpdate) {
      setIsDialogOpen(false);
      await onUpdate();
    } else {
      goToDashboard();
    }
  }

  return (
    <Stack gap={2} pt={song ? 0 : 6}>
      <Stack
        ref={projectNameRef}
        mb={1}
        width="100%"
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP,
        }}
      >
        <Typography variant="overline">{t("Project Name")}</Typography>

        <TextField
          fullWidth
          id="outlined-basic"
          placeholder={t("Name your project")}
          variant="outlined"
          value={projectName}
          onChange={projectNameOnChange}
        />
      </Stack>

      <Box
        ref={instrumentsRef}
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP,
        }}
      >
        <ChipField
          list={INSTRUMENTS}
          selection={instrumentSelection}
          setSelection={(arr) =>
            setFormData({ ...formData, instrumentSelection: arr })
          }
          label={t("Selecet what instruments you looking for")}
          title={tTimeline("instruments")}
        />
      </Box>

      <Box
        ref={styleRef}
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP,
        }}
      >
        <ChipField
          list={STYLES}
          selection={styleSelection}
          setSelection={(arr) =>
            setFormData({ ...formData, styleSelection: arr })
          }
          label={t("Select Genre")}
          title={tTimeline("styles")}
        />
      </Box>

      <Stack
        ref={descriptionRef}
        sx={{
          scrollMarginTop: SCROLL_MARGIN_TOP,
        }}
      >
        <Typography variant="overline">{t("description")}</Typography>

        <TextField
          id="outlined-multiline-static"
          placeholder={t("Describe your project exactly")}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={description}
          onChange={descriptionOnChange}
        />
      </Stack>

      {!song && (
        <Stack
          ref={audioRef}
          sx={{
            scrollMarginTop: SCROLL_MARGIN_TOP,
          }}
        >
          <Typography variant="overline">{t("Upload your demo")}</Typography>

          <DragAndDropAudio
            audioPreview={audioPreview}
            setAudioPreview={(data) =>
              setFormData({ ...formData, audioPreview: data })
            }
          />
        </Stack>
      )}

      <Box mt={1}>
        <Button fullWidth variant="contained" onClick={validation}>
          {t("Submit")}
        </Button>
      </Box>

      <Box>
        <Button fullWidth variant="contained" color="error">
          {t("Cancel")}
        </Button>
      </Box>

      <Modal open={isModalOpen}>
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Stack
            alignItems="center"
            justifyContent="center"
            bgcolor={theme.palette.background.paper}
            width={400}
            minHeight={300}
            borderRadius={10}
            gap={2}
          >
            {isUploading && (
              <Box>
                {progress === 0 || progress === 100 ? (
                  <CircularProgress />
                ) : (
                  <CircularProgressWithLabel value={progress} />
                )}
              </Box>
            )}

            <Box minHeight={50} textAlign="center">
              <Typography variant="overline">{message}</Typography>
            </Box>

            {!isUploading && (
              <Box>
                <Button variant="contained" onClick={onModalClose}>
                  {t("close")}
                </Button>
              </Box>
            )}
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default CreateProjectForm;
