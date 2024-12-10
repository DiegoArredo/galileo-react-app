import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


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

const FINALIZAR_CARRITO = gql`
  mutation finalizarCarrito($idCarrito: Int!){
    finalizarCarrito(idCarrito:$idCarrito){
      id
      idUsuario
      monto
      estado
    }
  }
`;


export default function Payment() {
    // console.log(localStorage.getItem("montoCarrito"))
    // console.log(localStorage.getItem("carritoItems"))
    const { status, action } = useParams();
    const [compraConfirmada, setCompraConfirmada] = React.useState(false)
    const navigate = useNavigate();
    const [finalizarCarrito, { data: dataFinalizar, loading: loadingFinalizar, error: errorFinalizar }] = useMutation(FINALIZAR_CARRITO, { client: carritoClient });
    console.log(parseInt(localStorage.getItem("carritoId")))
    React.useEffect(() => {
        if (loadingFinalizar) {
            console.log("Loading Finalizar...");
        }
        if (errorFinalizar) {
            console.log("Error en la consulta: ");
            console.log(errorFinalizar.message);
        }
        if (dataFinalizar) {
            console.log("Data Finalizar");
            console.log(dataFinalizar);
            localStorage.removeItem("montoCarrito")
            localStorage.removeItem("carritoId")
            localStorage.removeItem("carritoItems")
            console.log("Se removio localstorage de Carrito")
        }
    }, [dataFinalizar, loadingFinalizar, errorFinalizar]);

    React.useEffect(() => {
        if (status === "succes"){
            finalizarCarrito({variables: {idCarrito: parseInt(localStorage.getItem("carritoId"))}})
        }
    }, [status]);


    const handlegotoorders = () => {
        navigate("/dashboard/compras");
    }
    const handlegotocheckout = () => {
        navigate("/checkout");
    }

    const notifyPurchase = async (email,idCarrito,cantidadCursos) => {
        const purchaseData = {
          user_email: email,
          summary: "Se ha confirmado la compra con N° #" + idCarrito + " por un total de " + cantidadCursos + " cursos. Gracias por tu compra! :)",
        };
      
        try {
          const response = await fetch("http://localhost:3005/notify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(purchaseData),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
      
          const result = await response.text();
          console.log(result); // "Email sent successfully"
         
        } catch (error) {
          console.error("Error al enviar la notificación:", error);
          
        }
      };





    if (status === "succes") {
        // console.log(JSON.parse(localStorage.getItem("loginData")).email)
        // console.log(localStorage.getItem("carritoId"))
        // console.log(localStorage.getItem("carritoItems"))
        
        notifyPurchase(JSON.parse(localStorage.getItem("loginData")).email, localStorage.getItem("carritoId"), localStorage.getItem("carritoItems"))
        return (
            <Stack spacing={2} useFlexGap pt={"8vh"}>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">
                    GRACIAS POR TU COMPRA!
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Tu numero de orden es
                    <strong>&nbsp;#{localStorage.getItem("carritoId")}</strong>. Te hemos enviado un mail de confirmación de tu compra a tu
                    correo.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        alignSelf: "start",
                        width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={handlegotoorders}
                >
                    Ir a mi compras
                </Button>
            </Stack>

        );
    } else if (status === "error") {
        return (
            <Stack spacing={2} useFlexGap pt={"8vh"}>
                <Typography variant="h1">⛔</Typography>
                <Typography variant="h5">
                    OCURRIO UN ERROR
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Tu numero de orden es
                    <strong>&nbsp;#{localStorage.getItem("carritoId")}</strong>. Vuelve a intentarlo, ocurrio un problema con el pago.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        alignSelf: "start",
                        width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={handlegotocheckout}
                >
                    Ir a Checkout
                </Button>
            </Stack>
        )
    }

};