import * as React from "react";
import {
  Button,
  Divider,
  Box,
  Card,
  CardContent,
  Typography,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import getCheckoutTheme from "../checkout/theme/getCheckoutTheme";
import TemplateFrame from "../checkout/TemplateFrame";
import AppAppBar from "../Main/components/AppAppBar";
import CursoCard from "./CursoCard";
import { useNavigate } from "react-router-dom";
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

//MUTACION PARA CREAR CARRITO Y SI EXISTE UNO ACTIVO LO DEVUELVE.
const CREATE_CARRITO = gql`
  mutation createCarrito($idUsuario: Int!) {
    createCarrito(idUsuario: $idUsuario) {
      id
      idUsuario
      monto
      estado
    }
  }
`;

//LAZY QUERY PARA OBTENER LOS CURSOS DEL CARRITO
export const GET_CURSOS_CARRITO = gql`
  query getCursosEnCarrito($idCarrito: Int!) {
    getCursosEnCarrito(idCarrito: $idCarrito) {
      id
      idCarrito
      idCurso
    }
  }
`;

export default function Cart() {
  const [carritoId, setCarritoId] = React.useState(localStorage.getItem("carritoId"));
  const [carritoMonto, setCarritoMonto] = React.useState("");
  const [cursosEnCarrito, setCursosEnCarrito] = React.useState([]);
  //MUTACION PARA CREAR CARRITO
  const [createCarrito,{ data: dataCarrito, loading: loadingCarrito, error: errorCarrito }] = useMutation(CREATE_CARRITO, { client: carritoClient },
    {refetchQueries: [{query: GET_CURSOS_CARRITO, variables: {idCarrito: parseInt(carritoId)}}]});
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
      setCarritoId(dataCarrito.createCarrito.id);
      localStorage.setItem("carritoId", dataCarrito.createCarrito.id);
      setCarritoMonto(dataCarrito.createCarrito.monto);
      getCursosEnCarrito({
        variables: { idCarrito: dataCarrito.createCarrito.id },
      });
    }
  }, [dataCarrito, loadingCarrito, errorCarrito]);

  //MUTACION PARA CREAR CARRITO
  React.useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    console.log("Login data: ", loginData);
    if (loginData) {
      createCarrito({ variables: { idUsuario: loginData.id } });
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
  ] = useLazyQuery(GET_CURSOS_CARRITO, { client: carritoClient },
    {refetchQueries: [{query: GET_CURSOS_CARRITO, variables: {idCarrito: parseInt(carritoId)}}]}
  );
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
      localStorage.setItem(
        "carritoItems",
        dataCursosCarrito.getCursosEnCarrito.length
      );
      console.log(
        "Cursos en carrito: ",
        dataCursosCarrito.getCursosEnCarrito.length
      );
    }
  }, [dataCursosCarrito, loadingCursosCarrito, errorCursosCarrito]);

  React.useEffect(() => {
    console.log("Cursos en carrito: ", cursosEnCarrito);
  }, [cursosEnCarrito]);

  //MANEJA LA ELIMINACION DE CURSOS EN EL CARRITO!
//ACTUALIZAR CACHE! Falta eso
  const handleCursoEliminado = (idCurso) => {
    setCursosEnCarrito((prev) => prev.filter((curso) => curso.idCurso !== idCurso));
    getCursosEnCarrito({
      variables: { idCarrito: dataCarrito.createCarrito.id },
    });
  }



  const navigate = useNavigate();
  const handlePagar = () => {
    navigate("/checkout");
  }

  //Themes
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    console.log("Checking theme mode");
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };


  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
              backgroundColor: { xs: "transparent", sm: "background.default" },
              alignItems: "start",
              pt: { xs: 6, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Typography variant="h4">Carrito</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%" },
              }}
            >
              {cursosEnCarrito &&
                cursosEnCarrito.map((curso) => (
                  <CursoCard key={curso.idCurso} idCurso={curso.idCurso} onCursoEliminado={handleCursoEliminado}/>
                ))}
            </Box>

            <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected products
                  </Typography>
                  <Typography variant="body1"></Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 16,
              px: 10,
              gap: 4,
            }}
          >
            {/* <SitemarkIcon /> */}
            {/* <Typography variant="h4">Carrito</Typography> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
                mt: "4vh",
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Total:
              </Typography>

              <Typography variant="h4" gutterBottom>
                {carritoMonto}
              </Typography>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                sx={{ p: "4vh", mt: "1vh" }}
                carritoid={carritoId}
                onClick={handlePagar}
              >
                <Typography variant="h5">Pagar</Typography>
              </Button>
              <Divider sx={{ my: "3vh" }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </TemplateFrame>
  );
}
