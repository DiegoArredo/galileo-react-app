import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Avatar, ListItemAvatar } from "@mui/material";
import CursoListItem from "../../checkout/components/CursoListItem";
import Curso from "./Curso";
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

export default function Carrito ({ idCarrito }) {
    //OBTENER DATOS DEL CARRITO
    const [carritoMonto, setCarritoMonto] = React.useState("");
    const [cursosEnCarrito, setCursosEnCarrito] = React.useState([]);
    //QUERY
    const [
        getCarrito,
        { loading: loadingCarrito, error: errorCarrito, data: dataCarrito },
    ] = useLazyQuery(GET_CARRITO, { client: carritoClient });

    //MOSTRAR INFO DE LA QUERY
    React.useEffect(() => {
        if (loadingCarrito) {
            console.log("Loading carrito...");
        }
        if (errorCarrito) {
            console.log("Error en la consulta: ");
            console.log(errorCarrito.message);
        }
        if (dataCarrito) {
            console.log("Data carrito");
            console.log(dataCarrito);
            setCarritoMonto(dataCarrito.getCarrito.monto);
            getCursosEnCarrito({
                variables: { idCarrito: dataCarrito.getCarrito.id },
            });
        }
    }, [dataCarrito, loadingCarrito, errorCarrito]);

    //INICIAR LA QUERY
    React.useEffect(() => {
        const carritoId = idCarrito;
        if (carritoId) {
            getCarrito({ variables: { id: carritoId } });
        }
    }, []);

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
            setCursosEnCarrito(dataCursosCarrito.getCursosEnCarrito.map((curso) => curso.idCurso));
            console.log("Cursos en carrito: ", cursosEnCarrito);
        }
    }, [dataCursosCarrito, loadingCursosCarrito, errorCursosCarrito]);

    return (
        <>
            {cursosEnCarrito &&
                cursosEnCarrito.map((cursoid) => (
                    <Curso idCurso={cursoid} />
                ))}
        </>

    );
}