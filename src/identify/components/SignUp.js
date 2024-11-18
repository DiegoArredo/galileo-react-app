import * as React from 'react';
import {Box, Button, FormControl, FormLabel, TextField, Typography, Link} from '@mui/material';
import { useState, useEffect } from 'react';
// NAVIGATE
import { useNavigate } from 'react-router-dom';
// APOLLO CLIENT
import { useMutation, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
const userClient = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});
const CREATE_USER = gql`
mutation CreateUser($nombre: String!, $email: String!, $password: String!) {
  register(
    createUserDto: {
      nombre: $nombre
      email: $email
      password: $password
    }
  ) {
    id
    nombre
    email
    password
  }
}`

export default function SignUp() {
  //NAVIGATE
  const navigate = useNavigate();
  
  // MUTATION 
  const [createUser,{data,loading,error}] = useMutation(CREATE_USER, {client: userClient});
  useEffect(() => {
    if (loading) {
      console.log("Loading");
    }
    if (error) {
        console.log("Error en la consulta: ")
        console.log(error.message)
        if (error.message){
          setEmailError(true);
          setEmailErrorMessage("Este email ya esta registrado")
        }
        }
    if (data) {
      console.log("Data");
      console.log(data);
      console.log("DATOS REGISTRO", data.register);
      navigate('/join/login'); 
    }
  }, [data, loading, error]);


  // STATES
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  // FormControl< 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const validateInputs = () => {


    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Porfavor ingresar un email válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('El largo de la constraseña debe ser de al menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (password !== confirmPassword) {
      
      setPasswordError(true);
      setPasswordErrorMessage('Contraseñas no coinciden');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage('Nombre no puede estar vacío.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    
    createUser({
      variables: {
        nombre: name,
        email: email,
        password: password,
      }
    });

    event.preventDefault();
  };

  return (
    <>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Crea tu cuenta
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="name">Nombre Completo</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Jon Snow"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
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
              <FormControl>
                <FormLabel htmlFor="confirmPassword"> Confirmar Contraseña</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  placeholder="••••••••••••"
                  type="password"
                  id="confirmPassword"
                  autoComplete=""
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Registrarse
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
               ¿Ya tienes una cuenta? {' '}
                <span>
                  <Link
                    href="/join/login"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Iniciar Sesión
                  </Link>
                </span>
              </Typography>
            </Box>
          </>
  );
}
