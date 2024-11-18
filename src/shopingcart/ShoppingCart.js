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


//######################################################################################################################


const backfetchcartitems = async (id_user) => {
  const cartData = [
    { id: 1, name: 'Item 1', price: 10, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
    { id: 2, name: 'Item 2', price: 15, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
    { id: 3, name: 'Item 3', price: 10, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
    { id: 4, name: 'Item 3', price: 10, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
  ];
  

  //return cartData;
  return null;
};

const sendShoppingCart = async (id_user, cartItems) => {
  try {
    // Imprime los datos de cartItems en la consola
    console.log('Datos del carrito de compras:', cartItems);

    const response = await fetch('/api/complete-purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id_user,
        cartItems: cartItems,
      }),
    });
    
    const result = await response.json();
    if (result.success) {
      console.log('Compra completada con éxito');
    } else {
      console.error('Hubo un problema con la compra');
    }
  } catch (error) {
    console.error('Error al completar la compra', error);
  }
};

//######################################################################################################################
const fetchCartItems = async (id_user) => {
  try {
    // Llamada a la función backfetchcartitems, pasa el id_user
    const response = await backfetchcartitems(id_user);
    
    // Si no recibe datos válidos, se devuelven los datos por defecto
    if (!response || response.length === 0) {
      return [
        { id: 1, name: 'Curso de Desarrollo Web - Básico', price: 24990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
        { id: 2, name: 'Introducción a la Inteligencia Artificial', price: 39990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
        { id: 3, name: 'Curso de Python para Principiantes', price: 15990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
        { id: 4, name: 'Marketing Digital: Estrategias Avanzadas', price: 29990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
        { id: 5, name: 'Curso de Diseño Gráfico con Photoshop', price: 21990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
        { id: 6, name: 'Gestión de Proyectos Ágiles con Scrum', price: 25990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
        { id: 7, name: 'Curso de Ciberseguridad para Principiantes', price: 28990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
        { id: 8, name: 'Certificación en Gestión de Bases de Datos', price: 43990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
        { id: 9, name: 'Curso de Fotografía Digital', price: 24990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
        { id: 10, name: 'Curso de JavaScript Avanzado', price: 36990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' }
      ];
    }

    // Si los datos son válidos, se retornan los datos recibidos
    return response;

  } catch (error) {
    console.error('Error fetching cart items:', error);
    // Si hay un error, retornar los datos por defecto
    return [
      { id: 1, name: 'Curso de Desarrollo Web - Básico', price: 24990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
      { id: 2, name: 'Introducción a la Inteligencia Artificial', price: 39990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
      { id: 3, name: 'Curso de Python para Principiantes', price: 15990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
      { id: 4, name: 'Marketing Digital: Estrategias Avanzadas', price: 29990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
      { id: 5, name: 'Curso de Diseño Gráfico con Photoshop', price: 21990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
      { id: 6, name: 'Gestión de Proyectos Ágiles con Scrum', price: 25990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
      { id: 7, name: 'Curso de Ciberseguridad para Principiantes', price: 28990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
      { id: 8, name: 'Certificación en Gestión de Bases de Datos', price: 43990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
      { id: 9, name: 'Curso de Fotografía Digital', price: 24990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' },
      { id: 10, name: 'Curso de JavaScript Avanzado', price: 36990, quantity: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYaeMOxXRWIQVP7FdM8xq9rr8EDEG613jCk-g9qz4xuKKmoGUKik-Xjt8-dY3TIJxLcpQ&usqp=CAU' }
    ];
  }
};

//######################################################################################################################


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




const ShoppingCart = ({ id_user }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); 
  const [purchaseCompleted, setPurchaseCompleted] = useState(false); // Nuevo estado para controlar el popup

  useEffect(() => {
    const loadCartItems = async () => {
      const items = await fetchCartItems(id_user); 
      setCartItems(items);
    };

    loadCartItems(); 
  }, [id_user]); 

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCompletePurchase = async () => {
    // Llamamos a la función para enviar los datos del carrito
    await sendShoppingCart(id_user, cartItems);
    // Después de completar la compra, mostramos el mensaje de compra completada
    setPurchaseCompleted(true);
  };

  const handleGoBack = () => {
    // Al hacer clic en "Volver", redirigimos al usuario
    navigate('/');
  };

  // Calcular el total de la compra
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AppTheme>
      <CartContainer direction="column" justifyContent="center">
        <CartCard variant="outlined">
          <Typography component="h1" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Carrito de Compras
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          
          {/* Mostrar los items en el carrito solo si la compra no ha sido completada */}
          {!purchaseCompleted && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {cartItems.length === 0 ? (
                <Typography>No hay elementos en el carrito.</Typography>
              ) : (
                cartItems.map(item => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px dashed grey' }}>
                    <img 
                      src={item.url}
                      width={150} height={150}
                      alt={item.name}
                    />
                    <Typography variant="h4">{item.name}</Typography>
                    <Typography variant="h4">Valor ${item.price}</Typography>
                    <Typography variant="h4">Cantidad: {item.quantity}</Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                ))
              )}
            </Box>
          )}

          {/* Si la compra está completada, mostrar el popup con los detalles */}
          {purchaseCompleted && (
            <Box sx={{ textAlign: 'center', marginTop: 3 }}>
              <Typography variant="h6" sx={{ color: 'green' }}>
                ¡Compra completada con éxito!
              </Typography>
              
              {/* Mostrar los productos comprados */}
              <Box sx={{ marginTop: 3 }}>
                <Typography variant="h6">Detalles de la compra:</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                  {cartItems.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{item.name} x {item.quantity}</Typography>
                      <Typography>${item.price * item.quantity}</Typography>
                    </Box>
                  ))}
                  
                  {/* Mostrar el total de la compra */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, fontWeight: 'bold' }}>
                    <Typography>Total</Typography>
                    <Typography>${totalAmount}</Typography>
                  </Box>
                </Box>
              </Box>

              <Button variant="contained" onClick={handleGoBack} sx={{ marginTop: 2 }}>
                Volver
              </Button>
            </Box>
          )}

          {/* Mostrar los botones solo si la compra no ha sido completada */}
          {!purchaseCompleted && (
            <>
              <Divider sx={{ marginY: 2 }} />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button variant="contained" onClick={() => navigate('/')} fullWidth>
                  Regresar
                </Button>
                <Button variant="contained" color="primary" onClick={handleCompletePurchase} fullWidth>
                  Completar Compra
                </Button>
              </Box>
            </>
          )}
        </CartCard>
      </CartContainer>
    </AppTheme>
  );
};

export default ShoppingCart;
