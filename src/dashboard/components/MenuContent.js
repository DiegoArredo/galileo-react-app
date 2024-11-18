import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const mainListItems = [
  { text: 'Mis Cursos', icon: <HomeIcon />, route:'/dashboard/cursos' },
  { text: 'Perfil', icon: <AccountBoxIcon />  ,route:'/dashboard/perfil'},
  { text: 'Historial de Compra', icon: <ArticleIcon />,route:'/dashboard/compras' },
];


export default function MenuContent() {
  const navigate = useNavigate(); 
  const handleListItemClick = (route) => { navigate(route); };
  const location = window.location.pathname;
  const handleHome = () => {
    navigate("/");
  }
  return (

    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
            selected={location === item.route}
            onClick={() => handleListItemClick(item.route)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItem disablePadding sx={{ display: 'block', justifySelf: "end" }}>
        <ListItemButton onClick={handleHome}>
          <ListItemIcon><ArrowBackIcon/> </ListItemIcon>
          <ListItemText primary="Volver a Home" />
        </ListItemButton>
      </ListItem>
    </Stack>
  );
}
