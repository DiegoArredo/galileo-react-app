import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppTheme from '../shared-theme/AppTheme';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate


const CartCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '80%',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));



const CartContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

function ShoppingCart({ cartItems = [], setCartItems = () => {}, onComplete, onBack, props }) {
  const navigate = useNavigate();
  const defaultItems = [
    { id: 1, name: 'Item 1', price: 10, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
    { id: 2, name: 'Item 2', price: 15, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
    { id: 3, name: 'Item 3', price: 10, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
    { id: 4, name: 'Item 4', price: 15, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
    { id: 5, name: 'Item 5', price: 10, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
    { id: 6, name: 'Item 6', price: 15, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
    { id: 7, name: 'Item 7', price: 10, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
    { id: 8, name: 'Item 8', price: 15, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
    { id: 9, name: 'Item 9', price: 10, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
    { id: 10, name: 'Item 10', price: 15, quantity: 1 , url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU'},
  ];

  const [temporaryCartItems, setTemporaryCartItems] = useState(cartItems.length > 0 ? cartItems : defaultItems);

  useEffect(() => {
    setTemporaryCartItems(cartItems.length > 0 ? cartItems : defaultItems);
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    setTemporaryCartItems(temporaryCartItems.filter(item => item.id !== id));
  };

  const handleCompletePurchase = () => {
    onComplete(temporaryCartItems);
    setCartItems(temporaryCartItems);
  };

  return (
      <AppTheme {...props}>
        <CartContainer direction="column" justifyContent="center">
      <CartCard variant="outlined">
        <Typography component="h1" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Carrito de Compras
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {temporaryCartItems.length === 0 ? (
            <Typography>No hay elementos en el carrito.</Typography>
          ) : (
            temporaryCartItems.map(item => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , border: '1px dashed grey'}}>  
                <img 
                src={item.url}
                width={150} height={150}
                alt="new"
                />
                <Typography variant="h4">{item.name} </Typography>
                <Typography variant="h4"> Valor ${item.price} </Typography>
                <Typography variant="h4"> Cantidad de cursos :{item.quantity}</Typography>
                <Button variant="contained" color="error" onClick={() => handleRemoveItem(item.id)}>
                  Eliminar
                </Button>
              </Box>
            ))
          )}
        </Box>
        <Divider sx={{ marginY: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/')} fullWidth>
            Regresar
          </Button>
          <Button variant="contained" color="primary" onClick={handleCompletePurchase} fullWidth>
            Completar Compra
          </Button>
        </Box>
      </CartCard>
    </CartContainer>
      </AppTheme>
    
  );
}

export default ShoppingCart;
