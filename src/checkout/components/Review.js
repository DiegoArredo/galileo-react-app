import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type:', detail: 'Visa' },
  { name: 'Card holder:', detail: 'Mr. John Smith' },
  { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date:', detail: '04/2024' },
];

export default function Review() {
  // console.log(localStorage.getItem("montoCarrito"))
  // console.log(localStorage.getItem("carritoItems"))
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Productos" secondary={localStorage.getItem("carritoItems") + " cursos seleccionados"} />
          <Typography variant="body2">{"$ "+localStorage.getItem("montoCarrito")}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Descuentos" secondary="" />
          <Typography variant="body2">- $0.00</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {"$ "+localStorage.getItem("montoCarrito")}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Detalles de envío:
          </Typography>
          <Typography gutterBottom>{localStorage.getItem("carritoItems") +" cursos con acceso completo:"}</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
           Seran agregados a su cuenta al fianlizar el pago.
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Detalles del Pago:
          </Typography>

           
              
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Metodo Selecionado:
                  </Typography>
                  <Typography variant="body2">WebPay</Typography>
                </Stack>

        </div>
      </Stack>
    </Stack>
  );
}
