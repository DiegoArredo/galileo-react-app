import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { SyledCard, StyledTypography, SyledCardContent } from './styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Button, Divider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Card, CardContent, CardActions } from "@mui/material"
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
//Apollo
import { useQuery, gql, ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
const carritoClient = new ApolloClient({
    uri: "http://localhost:3003/graphql",
    cache: new InMemoryCache(),
});

const ADD_CURSO_CARRITO = gql`
mutation addCurso($idCarrito: Int!, $idCurso: Int!) {
  addCurso(idCarrito: $idCarrito, idCurso: $idCurso) {
    id
    idUsuario
    monto
    estado
  }
}
`;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70vw",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 5,
};


export default function Curso({ id, nombre, categoria, descripcion, precio, instructor, urlimagen, rating, nivel}) {
    // Para alerta de agregar curso
    const [openSnack, setOpenSnack] = React.useState(false);
    const [openSnackerror, setOpenSnackerror] = React.useState(false);
    //
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //para array de cursos id



    const [carritoId, setCarritoId] = React.useState(localStorage.getItem("carritoId"));
    const [addCurso, { data, loading, error }] = useMutation(ADD_CURSO_CARRITO, { client: carritoClient });
    React.useEffect(() => {
        if (loading) {
            console.log("Loading.. Adding curso ", id, "...");
        }
        if (error) {
            if (error.message =="El curso ya está en el carrito."){
                setOpenSnackerror(true)
            }
        }
        if (data) {
            console.log("Data adding curso", id, ":", data);
            console.log("Open Snack de confirmación")
            setOpenSnack(true)

        }
    }, [loading, error, data]);


    //ADDING CURSO HANDLELING
    const handleAddingCurso = () => {
        if (localStorage.getItem("carritoId") == "0"){
            console.log("No hay carrito... logueate")
        }else{
        addCurso({ variables: { idCarrito: parseInt(carritoId), idCurso: id } });
        localStorage.setItem("carritoItems", parseInt(localStorage.getItem("carritoItems")) + 1)
        }
    };
    
    const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenSnack(false);
    };

    const handleSnackerrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenSnackerror(false);
        };
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
                    alt="green iguana"
                    image={urlimagen}
                    aspect-ratio="16 / 9"
                    sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                    onClick={handleOpen}
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
                        <Typography variant="subtitle1">
                            ${precio} USD
                        </Typography>
                        <Button idcurso={id} variant="contained" color="primary" onClick={handleAddingCurso}>
                            <AddShoppingCartIcon />
                        </Button>
                    </Box>
                </Box>
            </SyledCard>


            {/* MODAL */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card style={style}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="200vh"
                        image={urlimagen}
                    />
                    <SyledCardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {nombre}
                        </Typography>
                        <Divider />
                        <Typography gutterBottom variant="h6" component="div">
                            Categoría:
                        </Typography>
                        <StyledTypography variant="subtitle1" color="text.secondary" gutterBottom>
                            {categoria}
                        </StyledTypography>
                        <Divider />

                        <Typography gutterBottom variant="h6" component="div">
                            Nivel:
                        </Typography>
                        <StyledTypography variant="subtitle1" color="text.secondary" gutterBottom>
                            {nivel}
                        </StyledTypography>
                        <Divider />

                        <Typography gutterBottom variant="h6" component="div">
                            Instructor:
                        </Typography>
                        <StyledTypography variant="subtitle1" color="text.secondary" gutterBottom>
                            {instructor}
                        </StyledTypography>
                        <Divider />

                        <Typography gutterBottom variant="h6" component="div">
                            Descripción:
                        </Typography>
                        <StyledTypography variant="subtitle1" color="text.secondary" gutterBottom>
                            {descripcion}
                        </StyledTypography>
                        <Divider />

                        <Typography gutterBottom variant="h6" component="div">
                            Rating:
                        </Typography>
                        <StyledTypography variant="subtitle1" color="text.secondary" gutterBottom>
                            {rating}
                        </StyledTypography>
                        <Divider />

                        <Typography gutterBottom variant="h6" component="div">
                            Precio:
                        </Typography>
                        <StyledTypography variant="subtitle1" color="text.secondary" gutterBottom>
                            $ {precio} USD
                        </StyledTypography>

                    </SyledCardContent>
                    {/* <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                </Card>
            </Modal>

            {/* SNACKBAR */}
            <Snackbar open={openSnack} autoHideDuration={1000} onClose={handleSnackClose} 
            message="✅ Se añadió correctamente el curso!"
            
            />

            <Snackbar open={openSnackerror} autoHideDuration={1000} onClose={handleSnackerrorClose} 
            message="🚫 El curso ya esta en el carrito."
            
            /> 
                

        </Grid>

    )
}