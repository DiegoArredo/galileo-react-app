import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import getCheckoutTheme from "./theme/getCheckoutTheme";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";
import TemplateFrame from "./TemplateFrame";
import { List } from "@mui/material";
import CursoListItem from "./components/CursoListItem";
import { useNavigate } from "react-router-dom";
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

//Marcar carrito como pendiente

// Definir la mutación para marcar el carrito como pendiente
const MARCAR_CARRITO_COMO_PENDIENTE = gql`
  mutation marcarCarritoComoPendiente($idCarrito: Int!) {
    marcarCarritoComoPendiente(idCarrito: $idCarrito) {
      id
      estado
    }
  }
`;

const steps = ["Detalles del pago", "Revisa tu orden"];
function getStepContent(step) {
  switch (step) {
    case 0:
      return <PaymentForm />;
    case 1:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}
export default function Checkout() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  //OBTENER DATOS DEL CARRITO
  const [carritoId, setCarritoId] = React.useState(0);
  const [carritoMonto, setCarritoMonto] = React.useState("");
  const [cursosEnCarrito, setCursosEnCarrito] = React.useState([]);
  //QUERY
  const [
    getCarrito,
    { loading: loadingCarrito, error: errorCarrito, data: dataCarrito },
  ] = useLazyQuery(GET_CARRITO, { client: carritoClient });
  //Marcar carrito como pendiente
  const [marcarCarritoComoPendiente] = useMutation(MARCAR_CARRITO_COMO_PENDIENTE, { client: carritoClient });

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
      localStorage.setItem("montoCarrito",  dataCarrito.getCarrito.monto)
      getCursosEnCarrito({
        variables: { idCarrito: dataCarrito.getCarrito.id },
      });
    }
  }, [dataCarrito, loadingCarrito, errorCarrito]);

  //INICIAR LA QUERY
  React.useEffect(() => {
    const carritoId = JSON.parse(localStorage.getItem("carritoId"));
    console.log("CARRITO ID: ", carritoId);
    if (carritoId) {
      setCarritoId(carritoId);
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
      setCursosEnCarrito(dataCursosCarrito.getCursosEnCarrito);
    }
  }, [dataCursosCarrito, loadingCursosCarrito, errorCursosCarrito]);

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
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
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1){
      console.log("IR A WEBPAY")
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const navigate = useNavigate();
  const handlegotoorders = () => {
    navigate("/dashboard/compras");
  };

  const handlePayment = async () => {
    // Asegúrate de que `carritoId` esté definido y tenga un valor válido
    console.log('carritoId:', carritoId);
    if (!carritoId) {
      alert('Carrito no definido');
      return;
    }

    // Marcar carrito como pendiente
    console.log('Marcando carrito como pendiente:', carritoId);
    const result = await marcarCarritoComoPendiente({ variables: { idCarrito: carritoId } });
    console.log('Resultado de marcarCarritoComoPendiente:', result);
  
    // Ejecuta la consulta para obtener los datos del carrito
    const { data } = await getCarrito({ variables: { id: carritoId } });
    console.log('getCarrito data:', data);
  
    if (!data || !data.getCarrito) {
      alert('Error al obtener los datos del carrito');
      return;
    }
  
    // Asegúrate de que el monto sea un número entero
    const amount = Math.round(data.getCarrito.monto);
    const clienteId = data.getCarrito.idUsuario;
    console.log('amount:', amount, 'clienteId:', clienteId);
  
    const response = await fetch('http://localhost:3003/webpay/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, cliente_id: clienteId }),
    });
  
    const dataResponse = await response.json();
    console.log('dataResponse:', dataResponse);
    if (dataResponse.status === 'OK') {
      window.location.href = dataResponse.data.urlWebpay;
    } else {
      alert('Error al iniciar la transacción');
    }
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
        <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
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
            <Typography variant="h4">Checkout</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >


            {/* LISTA DE LOS CURSOS   */}
              <React.Fragment>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Total
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {carritoMonto}
                </Typography>
                <List disablePadding>
                  {cursosEnCarrito &&
                    cursosEnCarrito.map((curso) => (
                      <CursoListItem idCurso={curso.idCurso} />
                    ))}
                </List>
              </React.Fragment>
              {/* INFORMACION DE LOS CURSOS (LISTA) EN EL CARRITO */}
            </Box>
          </Grid>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexGrow: 1,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{ width: "100%", height: 40 }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ":first-child": { pl: 0 },
                        ":last-child": { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
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
                  <Typography variant="body1">
                    {activeStep >= 2 ? "$144.97" : "$134.98"}
                  </Typography>
                </div>
                <InfoMobile
                  totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
                />
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
                maxHeight: "720px",
                gap: { xs: 5, md: "none" },
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: "flex", md: "none" } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                      "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{
                        ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">
                    Thank you for your order!
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Your order number is
                    <strong>&nbsp;#140396</strong>. We have emailed your order
                    confirmation and will update you once its shipped.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={handlegotoorders}
                  >
                    Go to my orders
                  </Button>
                </Stack>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box
                    sx={[
                      {
                        display: "flex",
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: "end",
                        flexGrow: 1,
                        gap: 1,
                        pb: { xs: 12, sm: 0 },
                        mt: { xs: 2, sm: 0 },
                        mb: "60px",
                      },
                      activeStep !== 0
                        ? { justifyContent: "space-between" }
                        : { justifyContent: "flex-end" },
                    ]}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        Atrás
                      </Button>
                    )}
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ display: { xs: "flex", sm: "none" } }}
                      >
                        Atrás
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={activeStep === steps.length - 1 ? handlePayment : handleNext}
                      sx={{ width: { xs: "100%", sm: "fit-content" } }}
                    >
                      {activeStep === steps.length - 1 ? "Ir a Pagar" : "Siguiente"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </TemplateFrame>
  );
}
