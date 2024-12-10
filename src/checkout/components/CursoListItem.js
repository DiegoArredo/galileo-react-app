import React from "react";
import { Typography} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
//Apollo
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { useQuery, gql, useMutation } from "@apollo/client";
//MICROSERVICIO DE CURSOS
const cursoClient = new ApolloClient({
  uri: "http://localhost:3002/graphql",
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


export default function CursoListItem({ idCurso }) {
  const [elimando, setEliminando] = React.useState(false);
  const {
    loading: loadingCurso,
    error: errorCurso,
    data: dataCurso,
  } = useQuery(GET_CURSOS_BY_ID, {
    client: cursoClient,
    variables: { id: idCurso },
  });
  const [id, setId] = React.useState(idCurso);
  const [nombre, setNombre] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const [nivel, setNivel] = React.useState("");
  const [instructor, setInstructor] = React.useState("");
  const [urlimagen, setUrlImagen] = React.useState("");


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
      <ListItem key={id} sx={{ py: 1, px: 0 }}>
        <ListItemAvatar>
          <Avatar
            alt={`avatar`+ nombre}
            src={urlimagen}
          />
        </ListItemAvatar>
        <ListItemText sx={{ mr: 2 }} primary={nombre} secondary={instructor} />
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          {precio}
        </Typography>
      </ListItem>
    </>
  );
}
