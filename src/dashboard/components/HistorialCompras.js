import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Avatar, ListItemAvatar } from "@mui/material";
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

//LAZY QUERY PARA OBTENER LOS CURSOS DEL CARRITO
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

export default function HistorialCompras() {
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

  return (
    <Stack spacing={2} width={"80%"} pt={"2vw"}>
      {comprasEnHistorial.map((compra) => (
        <Compra  idCarrito={compra.id} />
      ))}

    </Stack>
    
  );
}
