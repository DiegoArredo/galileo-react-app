import * as React from 'react';
import {Box, Button, FormControl, FormLabel, TextField, Typography, Link} from '@mui/material';
// import ForgotPassword from './ForgotPassword';
import { useState,useEffect } from "react";
// NAVIGATE
import { useNavigate } from 'react-router-dom';
// APOLLO CLIENT
import { useLazyQuery, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
const userClient = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

// QUERY
const GET_LOGIN = gql`
query getLoginData($email: String!, $password: String!) {
login(loginUserDto: { email: $email , password: $password }) {
id
nombre
email
password
pais
genero
descripcion
profesion
isActive
}
}`



export default function NewSignIn() {
  //NAVIGATE
  const navigate = useNavigate();

  // LAZY QUERY
  const[getLoginData,{data, loading,error}] = useLazyQuery(GET_LOGIN, {client: userClient});
  useEffect(() => {
    if (loading) {
      console.log("Loading");
    }
    if (error) {
        console.log("Error en la consulta: ")
        console.log(error.message)
        if (error.message === "No se encontro usuario") {
          setEmailError(true);
          setEmailErrorMessage("Este email no esta registrado")
        }else if(error.message === "Contraseña incorrecta"){
          setPasswordError(true);
          setPasswordErrorMessage("Contraseña incorrecta")
        }
      }
    if (data) {
      console.log("Data");
      console.log(data);
      console.log("DATOS LOGUEO", data.login);
      window.localStorage.setItem("loginData", JSON.stringify(data.login));
      navigate('/'); 
    }
  }, [data, loading, error]);

  //STATE
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  // FormControl Variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    let isValid = true;

    // Validación de email
    if (!email|| !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Porfavor ingresar un email válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    //Validacion password
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('El largo de la constraseña debe ser de al menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    // ACA SE HACE LA CONSULTA AL SERVIDOR CON LAZY QUERY
    getLoginData({ variables: { email: email, password: password } });


    event.preventDefault();
  };

  return (
          <>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Inicio de Sesión
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="tucorreo@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  
              </FormControl>
   
              {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Continuar
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Si no tienes cuenta,{' '}
                <span>
                  <Link
                    href="/join/register"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Registrate
                  </Link>
                </span>
              </Typography>
              {/* <Link
                    component="button"
                    type="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    
                    sx={{ alignSelf: 'center' }}
                    >
                    ¿Olvidaste tu contraseña?
              </Link> */}
            </Box>
          </>
  );
}
