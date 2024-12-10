import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Curso from './Curso';
import { useQuery, gql, ApolloClient, InMemoryCache, useMutation} from '@apollo/client';
import Typography from '@mui/material/Typography';

const cursoClient = new ApolloClient({
  uri: 'http://localhost:3002/graphql',
  cache: new InMemoryCache()
});

const GET_CURSOS = gql`
query {
getAllCursos{
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
`


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

export default function MainContent() {

  
  const { data,loading,error } = useQuery(GET_CURSOS, {client: cursoClient});
  const[loginData, setLoginData] = React.useState(JSON.parse(localStorage.getItem("loginData")))
  React.useEffect(() =>{
    setLoginData(localStorage.getItem("loginData"))  
    },[localStorage.getItem("loginData")])

  //MUTACION PARA CREAR CARRITO
  const [createCarrito,{ data: dataCarrito, loading: loadingCarrito, error: errorCarrito }] = useMutation(CREATE_CARRITO, { client: carritoClient });
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
      localStorage.setItem("carritoId", dataCarrito.createCarrito.id);
    }
  }, [dataCarrito, loadingCarrito, errorCarrito]);

//Setear Carrito ID, 0 si es que no esta logeado
  React.useEffect(() =>{
  if(localStorage.getItem("loginData")){
    console.log("Hay login data", loginData)
    createCarrito({ variables: { idUsuario: loginData.id }})

  }else{
    localStorage.setItem("carritoId", 0)
    localStorage.setItem("carritoItems", 0)
  }
  },[])
  //Imprimir carrito ID
  React.useEffect(() =>{
    console.log("Carrito ID: "+localStorage.getItem("carritoId")) 
  },[localStorage.getItem("carritoId")])

  React.useEffect(() =>{
    console.log("Carrito Items: "+localStorage.getItem("carritoItems")) 
  },[localStorage.getItem("carritoItems")])

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;
  console.log(data);
  

  return (
    // CATEGORIAS
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip onClick={handleClick} size="medium" label="Todas las categorias" />
          <Chip onClick={handleClick} size="medium" label="Física"
             sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          /> 
        </Box>
      </Box> */}

        <Typography variant="h4" component="h1" gutterBottom>
          Cursos
        </Typography>
      {/* CURSOS */}

      <Grid container spacing={2} columns={12}>
        {data.getAllCursos.map((curso) => (
          <Curso
            key={curso.id}
            id={curso.id}
            nombre={curso.nombre}
            categoria={curso.categoria}
            descripcion={curso.descripcion}
            precio={curso.precio}
            instructor={curso.instructor}
            urlimagen={curso.urlImagen}
            rating={curso.rating}
            nivel={curso.nivel}
          />
        ))}

      </Grid>


    </Box>
  );
}
