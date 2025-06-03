import {
  Box,
  Drawer,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Logout from "../auth/Logout";

interface Props {
  settingsView: boolean;
  toggleDrawer: () => void;
}

export default function UserSettingsPanel({
  settingsView,
  toggleDrawer,
}: Props) {
  return (
    <Drawer anchor="right" open={settingsView} onClose={toggleDrawer}>
      <Stack height="100%">
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          pl={2}
          py={1}
        >
          <Typography fontWeight={600} variant="overline">
            Settings
          </Typography>

          <IconButton onClick={toggleDrawer}>
            <Close />
          </IconButton>
        </Stack>

        <Divider />

        <Stack p={2}>
          <Box>
            <Logout toggleDrawer={toggleDrawer} />
          </Box>
        </Stack>
      </Stack>
    </Drawer>
  );
}
