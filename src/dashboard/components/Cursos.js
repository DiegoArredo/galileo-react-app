import * as React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import Curso from './Curso';
import Carrito from './Carrito';
//MICROSERVICIO DE CARRITO
import {
  useQuery,
  gql,
  ApolloClient,
  InMemoryCache,
  useMutation,
  useLazyQuery,
} from "@apollo/client";
import Compra from "./Compra";

const carritoClient = new ApolloClient({
  uri: "http://localhost:3003/graphql",
  cache: new InMemoryCache(),
});

const GET_CARRITO = gql`
  query getCarrito($id: Int!) {
    getCarrito(id: $id) {
      id
      idUsuario
      monto
      estado
    }
  }
`;
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
//HISTORIAL DE COMPRAS
const GET_HISTORIAL_COMPRAS = gql`
query getHistorialCompras($idUsuario: Int!){
  getHistorialCompras(idUsuario:$idUsuario){
    id
    idUsuario
    monto
    estado
  }
}
`;





export default function Cursos() {

  const [comprasEnHistorial, setComprasEnHistorial] = React.useState([]);
  const [
    getHistorialCompras,
    { loading: loadingHistorial, error: errorHistorial, data: dataHistorial },
  ] = useLazyQuery(GET_HISTORIAL_COMPRAS, { client: carritoClient });

  React.useEffect(() => {
    if (loadingHistorial) {
      console.log("Loading Historial...");
    }
    if (errorHistorial) {
      console.log("Error en la consulta: ");
      console.log(errorHistorial.message);
    }
    if (dataHistorial) {
      console.log("Data Historial");
      console.log(dataHistorial);
      setComprasEnHistorial(dataHistorial.getHistorialCompras);

    }
  }, [dataHistorial, loadingHistorial, errorHistorial]);


  React.useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    console.log("Login data: ", loginData);
    if (loginData) {
      getHistorialCompras({ variables: { idUsuario: loginData.id } });
    }
  }, []);



  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Cursos Comprados
      </Typography>

      {/* cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Grid container spacing={2} columns={12}>

          {/* INICIO DE OBTENER CURSOS */}
          {comprasEnHistorial.map((compra) => (
            <Carrito idCarrito={compra.id} />
          ))}

        </Grid>
      </Box>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
