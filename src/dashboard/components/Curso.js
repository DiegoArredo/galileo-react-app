import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { SyledCard, StyledTypography, SyledCardContent } from '../../Main/components/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useQuery, gql, ApolloClient, InMemoryCache} from '@apollo/client';
const cursoClient = new ApolloClient({
  uri: 'http://localhost:3002/graphql',
  cache: new InMemoryCache()
});

const GET_CURSOS_BY_ID = gql`
query getCursoId($id: Int!) {
  getCursoById(id: $id) {
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
export default function Curso({ idCurso }) {
    const { loading: loadingCurso, error: errorCurso, data: dataCurso } = useQuery(GET_CURSOS_BY_ID, { client: cursoClient, variables: { id: idCurso } });
    const [id, setId] = React.useState(idCurso);
    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [precio, setPrecio] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [categoria, setCategoria] = React.useState("");
    const [nivel, setNivel] = React.useState("");
    const [instructor, setInstructor] = React.useState("");
    const [urlimagen, setUrlImagen] = React.useState("");
    const carritoId = localStorage.getItem("carritoId");

    React.useEffect(() => {
        if (loadingCurso) {
          console.log("Loading curso", id, "...");
        }
        if (errorCurso) {
          console.log("Error en la consulta curso", id, ": ", errorCurso.message);
    
        }
        if (dataCurso) {
          console.log("Data curso", id, ": ", dataCurso.getCursoById);
          setId(dataCurso.getCursoById.id);
          setNombre(dataCurso.getCursoById.nombre);
          setDescripcion(dataCurso.getCursoById.descripcion);
          setPrecio(dataCurso.getCursoById.precio);
          setRating(dataCurso.getCursoById.rating);
          setCategoria(dataCurso.getCursoById.categoria);
          setNivel(dataCurso.getCursoById.nivel);
          setInstructor(dataCurso.getCursoById.instructor);
          setUrlImagen(dataCurso.getCursoById.urlImagen);
        }
      }, [dataCurso, loadingCurso, errorCurso]);


    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };
    return (

        <Grid size={{ xs: 12, md: 4 }}>
            <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(0)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
            >
                <CardMedia
                    component="img"
                    alt="imagen-curso"
                    image={urlimagen}
                    aspect-ratio="16 / 9"
                    sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                />
                <SyledCardContent>
                    <Typography gutterBottom variant="caption" component="div">
                        {categoria}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {nombre}
                    </Typography>
                    <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                        {descripcion}
                    </StyledTypography>
                 
                </SyledCardContent>


            {/* BOTTON SECTION */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                    }}
                >
                    <Box
                        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
                    >
                        <Avatar key={instructor} sx={{ width: 24, height: 24 }} />
                        <Typography variant="caption">
                            {instructor}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                    <Button variant="contained" color="primary" >Ir al Cuso</Button>
                    </Box>
                </Box>
            </SyledCard>
        </Grid>
    )
}