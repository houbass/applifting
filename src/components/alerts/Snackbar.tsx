import { useEffect, useState } from "react"
import { Snackbar as Snack, Alert, SnackbarCloseReason } from "@mui/material"

export interface Message {
  text: string,
  type: "info" | "success" | "error"
}

interface Props {
  message: Message | null
  setMessage: (value: null) => void
}

const Snackbar = ({
  message, setMessage
}: Props) => {

  const [open, setOpen] = useState(false)
  const text = message?.text;
  const type = message?.type;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setMessage(null);
  };

  useEffect(() => {
    if(text && text.length > 0)
    setOpen(true);
  }, [text])

  return(
    <>
      {text && type && (
        <Snack
          open={open}
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          onClose={handleClose}
          autoHideDuration={3000}
        >
          <Alert
            onClose={handleClose}
            severity={type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {text}
          </Alert>
        </Snack>
      )}
    </>
  )
}

export default Snackbar;