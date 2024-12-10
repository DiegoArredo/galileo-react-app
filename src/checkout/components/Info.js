import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CursoListItem from './CursoListItem';

// Apollo

//MICROSERVICIO DE CARRITO
import {
  useQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  useMutation,
  useLazyQuery,
} from "@apollo/client";

const carritoClient = new ApolloClient({
  uri: "http://localhost:3003/graphql",
  cache: new InMemoryCache(),
});

//LAZY QUERY PARA OBTENER LOS CURSOS DEL CARRITO
const GET_CURSOS_CARRITO = gql`
  query getCursosEnCarrito($idCarrito: Int!) {
    getCursosEnCarrito(idCarrito: $idCarrito) {
      id
      idCarrito
      idCurso
    }
  }
`;


function Info({ idCarrito,totalPrice}) {
  const [cursosEnCarrito, setCursosEnCarrito] = React.useState([]);
  //QUERY PARA OBTENER LOS CURSOS DEL CARRITO
  const [
    getCursosEnCarrito,
    {
      loading: loadingCursosCarrito,
      error: errorCursosCarrito,
      data: dataCursosCarrito,
    },
  ] = useLazyQuery(GET_CURSOS_CARRITO, { client: carritoClient });
  React.useEffect(() => {
    if (loadingCursosCarrito) {
      console.log("Loading cursos carrito...");
    }
    if (errorCursosCarrito) {
      console.log("Error en la consulta: ");
      console.log(errorCursosCarrito.message);
    }
    if (dataCursosCarrito) {
      console.log("Data cursos carrito");
      console.log(dataCursosCarrito);
      setCursosEnCarrito(dataCursosCarrito.getCursosEnCarrito);
      console.log(
        "Cursos en carrito: \n",
        dataCursosCarrito.getCursosEnCarrito
      );
    }
  }, [dataCursosCarrito, loadingCursosCarrito, errorCursosCarrito]);

  React.useEffect(() => {
    getCursosEnCarrito({
      variables: { idCarrito: idCarrito },
    });
  }, []);


  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
      {cursosEnCarrito &&
        cursosEnCarrito.map((curso) => (
          <CursoListItem idCurso={curso.idCurso}/>

        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
