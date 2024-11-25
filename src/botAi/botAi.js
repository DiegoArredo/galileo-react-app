import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Configura Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:3010/graphql', // URL del backend
  cache: new InMemoryCache(),
});

// Función para obtener una respuesta del bot
const fetchAnswerBot = async (userMessage, sessionId) => {
  try {
    const QUERY = gql`
      query GetChatbotResponse($message: String!, $sessionId: String!) {
        getChatbotResponse(message: $message, sessionId: $sessionId)
      }
    `;
    
    const response = await client.query({
      query: QUERY,
      variables: { message: userMessage, sessionId },
    });

    return response.data.getChatbotResponse; // Devuelve la respuesta del servidor
  } catch (error) {
    // Devuelve el mensaje de error específico
    if (error.networkError) {
      return `Error de red: ${error.networkError.message}`;
    } else if (error.graphQLErrors) {
      return `Error de GraphQL: ${error.graphQLErrors.map(err => err.message).join(", ")}`;
    } else {
      return `Error desconocido: ${error.message || "No se pudo conectar con el servidor."}`;
    }
  }
};

const ChatButton = () => {
  const [openChat, setOpenChat] = useState(false); // Estado para controlar si el chat está abierto
  const [message, setMessage] = useState(''); // Estado para almacenar el mensaje del usuario
  const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes enviados
  const [sessionId, setSessionId] = useState(null); // Estado para almacenar el sessionId

  useEffect(() => {
    // Generar un sessionId único si no existe
    if (!sessionId) {
      setSessionId(generateSessionId());
    }
  }, [sessionId]);

  // Función para generar un sessionId único
  const generateSessionId = () => {
    return `session_${Math.random().toString(36).substring(2, 15)}`; // Genera un id aleatorio único
  };

  const handleClickOpen = () => {
    setOpenChat(true);
  };

  const handleClose = () => {
    setOpenChat(false);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Añadir el mensaje del usuario a la lista de mensajes
      setMessages(prevMessages => [
        ...prevMessages,
        { text: message, sender: 'user' }
      ]);

      // Limpiar el campo de texto
      setMessage('');

      // Llamar a la función que obtiene la respuesta del bot
      try {
        const botAnswer = await fetchAnswerBot(message, sessionId); // Usar el sessionId generado

        // Añadir la respuesta del bot a la lista de mensajes
        setMessages(prevMessages => [
          ...prevMessages,
          { text: botAnswer, sender: 'bot' }
        ]);
      } catch (error) {
        // Manejo de error si la llamada a la API falla
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Lo siento, ocurrió un error al procesar el mensaje.", sender: 'bot' }
        ]);
      }
    }
  };

  return (
    <div style={{ position: 'relative', height: '1vh' }}>
      {/* Botón redondo para abrir el chat */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '50%',
          width: '50px',   // Tamaño del botón
          height: '50px',  // Tamaño del botón
          position: 'fixed', // Posición fija en la parte inferior derecha de la pantalla
          bottom: 20,
          right: 20,
          boxShadow: 3,
          padding: 0,
        }}
        onClick={handleClickOpen}
      >
        <ChatIcon sx={{ fontSize: '24px' }} />
      </Button>

      {/* Ventana del chat */}
      <Dialog open={openChat} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Chat</DialogTitle>
        <DialogContent>
          {/* Panel de mensajes */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '300px', overflowY: 'auto', mb: 2 }}>
            <List>
              {messages.map((msg, index) => (
                <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <ListItemText
                    primary={msg.text}
                    sx={{
                      backgroundColor: msg.sender === 'user' ? '#3f51b5' : '#e0e0e0',
                      color: msg.sender === 'user' ? 'white' : 'black',
                      borderRadius: '10px',
                      padding: '10px',
                      maxWidth: '70%',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <TextField
            label="Escribe un mensaje"
            multiline
            rows={2}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Evitar el salto de línea normal
                handleSendMessage(); // Enviar el mensaje
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChatButton;
