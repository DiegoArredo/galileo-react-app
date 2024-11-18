import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { SyledCard, StyledTypography, SyledCardContent } from '../../Main/components/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



export default function Curso({ id, nombre, categoria, descripcion, precio, instructor, urlimagen }) {
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