import React from "react";
import { Box, Button, CardContent, CardMedia, Divider, Typography } from "@mui/material";
//Apollo
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { useQuery, gql, useMutation } from "@apollo/client";
import {GET_CURSOS_CARRITO} from "./Cart.js";
//MICROSERVICIO DE CURSOS
const cursoClient = new ApolloClient({
  uri: "http://localhost:3002/graphql",
  cache: new InMemoryCache(),
});

//MICROSERVICIO DE CARRITO
const carritoClient = new ApolloClient({
  uri: "http://localhost:3003/graphql",
  cache: new InMemoryCache(),
});

//QUERY PARA OBTENER LOS CURSOS POR ID
const GET_CURSOS_BY_ID = gql`
  query getCursoId($id: Int!) {
    getCursoById(id: $id) {
      id
      nombre
      descripcion
      precio
      rating
      categoria
      nivel
      instructor
      urlImagen
    }
  }
`;

//MUTACION PARA ELIMINAR EL CURSO DEL CARRITO
const DELETE_CURSO_CARRITO = gql`
mutation removeCurso($idCarrito: Int!, $idCurso: Int!){
  removeCurso(idCarrito:$idCarrito, idCurso:$idCurso)
}
`;





export default function CursoCard({idCurso, onCursoEliminado}) {
  const [elimando, setEliminando] = React.useState(false);
  const { loading: loadingCurso, error: errorCurso, data: dataCurso } = useQuery(GET_CURSOS_BY_ID, { client: cursoClient, variables: { id: idCurso } });
  const [id, setId] = React.useState(idCurso);
  const [nombre, setNombre] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const [nivel, setNivel] = React.useState("");
  const [instructor, setInstructor] = React.useState("");
  const [urlimagen, setUrlImagen] = React.useState("");
  const carritoId = localStorage.getItem("carritoId");

  const [removeCurso,{loading:loadingRemove, error:errorRemove, data:dataRemove}] = useMutation(DELETE_CURSO_CARRITO, {client: carritoClient},
    {refetchQueries: [{query: GET_CURSOS_CARRITO, variables: {idCarrito: parseInt(carritoId)}}]}
  );
  React.useEffect(() => {
    if (loadingRemove) {
      console.log("Loading remove curso", id, "...");
    }
    if (errorRemove) {
      console.log("Error en la consulta remove curso", id, ": ", errorRemove.message);
    }
    if (dataRemove) {
      console.log("Data remove curso", id, ": ", dataRemove.removeCurso);
      onCursoEliminado(idCurso);
    }
  }, [dataRemove, loadingRemove, errorRemove]);
  const handleRemove = () => {
    console.log("carritoID",carritoId)
    removeCurso({
      variables: {
        idCarrito: parseInt(carritoId),
        idCurso: idCurso
      }
    });
  }

  React.useEffect(() => {
    if (loadingCurso) {
      console.log("Loading curso", id, "...");
    }
    if (errorCurso) {
      console.log("Error en la consulta curso", id, ": ", errorCurso.message);

    }
    if (dataCurso) {
      console.log("Data curso", id, ": ", dataCurso.getCursoById);
      setId(dataCurso.getCursoById.id);
      setNombre(dataCurso.getCursoById.nombre);
      setDescripcion(dataCurso.getCursoById.descripcion);
      setPrecio(dataCurso.getCursoById.precio);
      setRating(dataCurso.getCursoById.rating);
      setCategoria(dataCurso.getCursoById.categoria);
      setNivel(dataCurso.getCursoById.nivel);
      setInstructor(dataCurso.getCursoById.instructor);
      setUrlImagen(dataCurso.getCursoById.urlImagen);
    }
  }, [dataCurso, loadingCurso, errorCurso]);




    return (
       
        <>
        
        <Divider flexItem sx={{mb:"2vh"}} />
        <Box
          className= "CursoCard" 
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            mb: "2vh",
          }}
        >
          <Box display="flex">
          
          <CardMedia
              component="img"
              sx={{width: "10vw"}}
              alt="green iguana"
              image={urlimagen}
              aspect-ratio="16 / 9"
              idcurso={id}
              
              />
         
            <CardContent sx={{ml:"3vh"}}>
              <Box display="flex" flexDirection="column"  gap={1}>
                <Typography variant="subtitle1">{nombre}</Typography>
                <Typography variant="subtitle2">{instructor}</Typography>
              </Box>

              <Typography variant="body1"></Typography>
            </CardContent>

          </Box>
            <Button variant="outlined" color="error" idcurso={id} onClick={handleRemove}>
              <Typography variant="subtitle2">Eliminar</Typography>
            </Button>
            <Typography variant="h6">$ {precio}</Typography>
        </Box>
        </>
    );
};