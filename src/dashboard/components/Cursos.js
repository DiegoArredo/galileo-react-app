import * as React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import Curso from './Curso';



const data = [
  {
    id: 1,
    nombre: 'Curso de React',
    categoria: 'Desarrollo Web',
    descripcion: 'Aprende a crear aplicaciones web con React',
    precio: 100,
    instructor: 'Juan Perez',
    urlimagen: 'https://picsum.photos/800/450/?random=1',
  },
  {
    id: 2,
    nombre: 'Curso de Python',
    categoria: 'Desarrollo Web',
    descripcion: 'Aprende a crear aplicaciones web con Python',
    precio: 150,
    instructor: 'Juan Perez',
    urlimagen: 'https://picsum.photos/800/450/?random=2',
  },
  {
    id: 3,
    nombre: 'Curso de Java',
    categoria: 'Desarrollo Web',
    descripcion: 'Aprende a crear aplicaciones web con Java',
    precio: 200,
    instructor: 'Juan Perez',
    urlimagen: 'https://picsum.photos/800/450/?random=3',
  },
  {
    id: 4,
    nombre: 'Curso de Angular',
    categoria: 'Desarrollo Web',
    descripcion: 'Aprende a crear aplicaciones web con Angular',
    precio: 250,
    instructor: 'Juan Perez',
    urlimagen: 'https://picsum.photos/800/450/?random=4',
  }
];

export default function Cursos() {
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
          {/* card 4 */}
          {data.map((curso) => (
            <Curso
              key={curso.id}
              id={curso.id}
              nombre={curso.nombre}
              categoria={curso.categoria}
              descripcion={curso.descripcion}
              precio={curso.precio}
              instructor={curso.instructor}
              urlimagen={curso.urlimagen}
            />
          ))}
        </Grid>
      </Box>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
