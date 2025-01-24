import { Box, Button, Stack, TextField, Typography } from '@mui/material';

interface Props {
  setEmail: (value: string) => void,
  setPassword: (value: string) => void,
  handler: () => void,
  success: string,
  error: string
}

const SignInUp = ({
  setEmail, setPassword, handler, success, error
}: Props) => {


  return(
    <Stack gap={1}>
      <Box>
        <Typography>
          LETS SIGN UP
        </Typography>
      </Box>
    
      <TextField 
        id="outlined-basic" 
        label="Email" 
        variant="outlined" 
        onChange={(e) => setEmail(e.target.value)}
      />
          
      <TextField 
        id="outlined-basic" 
        label="Password" 
        variant="outlined" 
        onChange={(e) => setPassword(e.target.value)}
      />
    
      <Button variant="contained" onClick={handler}>
        sign up
      </Button>
    
      <Typography color="success">
        {success}
      </Typography>
    
      <Typography color="error">
        {error}
      </Typography>
    </Stack>
  )
}

export default SignInUp;