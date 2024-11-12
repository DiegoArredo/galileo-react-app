import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useNavigate } from 'react-router-dom';

//              APOLLO CLIENT
import { useLazyQuery, gql } from '@apollo/client';

const GET_LOGIN = gql`
query GetLoginData($email: String!, $password: String!) {
login(loginUserDto: { email: $email , password: $password }) {
id
nombre
email
isActive
}
}`


//              STYLED COMPONENTS
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props) {
  const navigate = useNavigate();
  console.log(window.localStorage.getItem('loginId'))
  React.useEffect(() => {
    if (window.localStorage.getItem('loginId')) {
      navigate("/");}
  },[navigate]);
  // apollo client login graphql
  const[getLoginData,result] = useLazyQuery(GET_LOGIN);
  const[loginResult, setLoginResult] = React.useState(null);
  // ------------------------------
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  // hook para manejar el resultado de la query
  // React.useEffect(() => {
  //   if (result) {
  //     setLoginResult(result);
  //   }
  // }, [result]);
// ------------------------------
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    console.log(window.localStorage.getItem('loginId'))
    
  };
  const validateInputs = () => {
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;
    setEmailError(false);
    setPasswordError(false);

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
      return isValid;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    
    if (!password.value || password.value.length < 3) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
      return isValid;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    console.log("Consulta al servidor ")
    getLoginData({ variables: { email: email.value, password: password.value } });
    console.log(result)
    // console.log(loginResult)
    if (result.error) {
      console.log("Error en la consulta: ")
      console.log(result.error.message)
      if (result.error.message === "No se encontro usuario") {
        setEmailError(true);
        setEmailErrorMessage("Este email no esta registrado")
      }else if(result.error.message === "Contraseña incorrecta"){
        setPasswordError(true);
        setPasswordErrorMessage("Contraseña incorrecta")
      }
    }
    if (result.data) {
      console.log("Resultado de la consulta: ")
      console.log(result.data)
      window.localStorage.setItem('loginId', result.data.login.id);
    }
    console.log(window.localStorage.getItem('loginId'))
    setEmailError(true);
    isValid = false;
    return isValid;
  };
  
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between" style={{padding:"25vh"}}>
        {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component={'form'}
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <span>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
