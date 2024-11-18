import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Curso from './Curso';
import { useQuery, gql, ApolloClient, InMemoryCache} from '@apollo/client';
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



export default function MainContent() {
  const { data,loading,error } = useQuery(GET_CURSOS, {client: cursoClient});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;
  console.log(data);

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };
  
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
          />
        ))}

      </Grid>


    </Box>
  );
}
