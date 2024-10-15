import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Copyright from '../internals/components/Copyright';

const cardData = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    tag: 'Física',
    title: 'Curso de Física Aplicada',
    description:
      'Aprende los conceptos básicos de la física aplicada a la ingeniería y la tecnología. Este curso te ayudará a comprender los principios fundamentales de la física y su aplicación en el mundo real.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    tag: 'Cálculo',
    title: 'Curso de Cálculo Diferencial e Integral',
    description:
      'Aprende los conceptos básicos del cálculo diferencial e integral y cómo aplicarlos en la resolución de problemas matemáticos. Este curso te ayudará a desarrollar habilidades matemáticas avanzadas.',
    authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=3',
    tag: 'Álgebra',
    title: 'Curso de Álgebra Lineal',
    description:
      'Aprende los conceptos básicos del álgebra lineal y cómo aplicarlos en la resolución de problemas matemáticos. Este curso te ayudará a desarrollar habilidades matemáticas avanzadas.',
    authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=4',
    tag: 'Ingeniería',
    title: "Curso de Ingeniería Mecánica",
    description:
      "Aprende los conceptos básicos de la ingeniería mecánica y cómo aplicarlos en el diseño y la construcción de máquinas y sistemas mecánicos. Este curso te ayudará a desarrollar habilidades técnicas avanzadas.",
    authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    tag: 'Física',
    title: 'Curso Física Moderna',
    description:
      "Aprende los conceptos básicos de la física moderna y cómo aplicarlos en la resolución de problemas científicos. Este curso te ayudará a comprender los principios fundamentales de la física y su aplicación en el mundo real.",
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=6',
    tag: 'Programación',
    title: 'Curso de Programación Avanzada',
    description:
      'Aprende los conceptos avanzados de la programación y cómo aplicarlos en el desarrollo de software. Este curso te ayudará a desarrollar habilidades técnicas avanzadas.',
    authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
  },
];

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ authors }) {
  return (
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
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      {/* <Typography variant="caption">July 14, 2021</Typography> */}
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

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
          <Grid size={{ xs: 12, md: 4 }}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(2)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardData[2].img}
                sx={{
                  height: { sm: 'auto', md: '50%' },
                  aspectRatio: { sm: '16 / 9', md: '' },
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {cardData[2].tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {cardData[2].title}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {cardData[2].description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={cardData[2].authors} />
            </SyledCard>
          </Grid>
          {/* card 4 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(2)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardData[1].img}
                sx={{
                  height: { sm: 'auto', md: '50%' },
                  aspectRatio: { sm: '16 / 9', md: '' },
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {cardData[1].tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {cardData[1].title}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {cardData[1].description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={cardData[1].authors} />
            </SyledCard>
          </Grid>
          {/* card 4 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <SyledCard
              variant="outlined"
              onFocus={() => handleFocus(2)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardData[5].img}
                sx={{
                  height: { sm: 'auto', md: '50%' },
                  aspectRatio: { sm: '16 / 9', md: '' },
                }}
              />
              <SyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {cardData[5].tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {cardData[5].title}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {cardData[5].description}
                </StyledTypography>
              </SyledCardContent>
              <Author authors={cardData[5].authors} />
            </SyledCard>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
