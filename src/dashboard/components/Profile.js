import * as React from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { FormControl, FormLabel, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState,useEffect } from "react";
// APOLLO GRAPHQL
import { useMutation, gql, ApolloClient, InMemoryCache } from "@apollo/client";

const userClient = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

const UPDATE_USER = gql`
mutation updateUser($id: Int!, $nombre: String, $email: String, $password: String, $pais: String, $genero: String, $descripcion: String, $profesion: String) {
  updateUserProfile(
    id: $id,
    updateUserDto: {
      nombre: $nombre,
      email: $email,
      password: $password,
      genero: $genero,
      pais: $pais,
      descripcion: $descripcion,
      profesion: $profesion,
    }
  ) {
    id
    nombre
    email
    password
    pais
    genero
    descripcion
    profesion
  }
}
`;


const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Profile() {
  const [loginData, setLoginData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );

  const [buttonDisabled, setButtonDisabled] = useState(true);

  
  
  const validateUpdate = (event) => {
    const { name, value } = event.target;
    if (loginData[name] === value) {
      setButtonDisabled(true);
    } else {
      if (loginData[name] === null && value === "") {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }
  };

  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {client: userClient});
  useEffect(() => {
    if (loading) {
      console.log("Loading");
    }
    if (error) {
      console.log("Error");
    }
    if (data) {
      console.log("Data");
      console.log(data);
      console.log("User profile updated: ", data.updateUserProfile);
      window.localStorage.setItem("loginData", JSON.stringify(data.updateUserProfile));
      setLoginData(data.updateUserProfile);
      setButtonDisabled(true);
    }
  }, [data, loading, error]);

  const handleSubmit = (event) => {
    console.log("Submit");
    
    updateUser({
      variables: {
        id: loginData.id,
        nombre: loginData.nombre,
        email: loginData.email,
        descripcion: loginData.descripcion,
        pais: loginData.pais,
        genero: loginData.genero,
      },
    });
    event.preventDefault();
  }

  return (
    <Grid
      component={"form"}
      onSubmit={handleSubmit}
      noValidate
      container
      spacing={3}
      paddingX={"5vw"}
      paddingTop={"3vh"}
      justifyContent={"end"}
    >
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormControl>
          <FormLabel htmlFor="name" >
            Nombre
          </FormLabel>
          <TextField
            id="name"
            name="nombre"
            type="name"
            placeholder="John"
            defaultValue={loginData.nombre}
            required
            size="small"
            onChange={validateUpdate}
          />
        </FormControl>
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormControl>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="ejemplo@email.com"
            defaultValue={loginData.email}
            required
            size="small"
            onChange={validateUpdate}
          />
        </FormControl>
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControl>
          <FormLabel htmlFor="descripcion" required>
            Descripcion
          </FormLabel>
          <TextField
            id="descripcion"
            name="descripcion"
            type="descripcion"
            placeholder="Agrega una descripcion a tu perfil."
            defaultValue={loginData.descripcion}
            required
            size="small"
            onChange={validateUpdate}
          />
        </FormControl>
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormControl>
          <FormLabel htmlFor="pais" required>
            País
          </FormLabel>
          <TextField
            id="pais"
            name="pais"
            type="pais"
            placeholder="Agrega tu pais"
            defaultValue={loginData.pais}
            required
            size="small"
            onChange={validateUpdate}
          />
        </FormControl>
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormControl>
          <FormLabel htmlFor="genero" required>
            Género
          </FormLabel>
          <TextField
            id="genero"
            name="genero"
            type="genero"
            placeholder="Escribe tu género"
            defaultValue={loginData.genero}
            required
            size="small"
            onChange={validateUpdate}
          />
        </FormControl>
      </FormGrid>
      <Button id="submitButton" type="submit" color="secondary" variant="contained" disabled={buttonDisabled} loginid={loginData.id}>
        Guardar
      </Button>
    </Grid>
  );
}
