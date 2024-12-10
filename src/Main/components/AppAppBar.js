import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Sitemark from './SitemarkIcon';
import { useNavigate } from "react-router-dom";
import { Icon, Typography } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/join/register");
  };

  const goToLogin = () => {
    navigate("/join/login");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const logout = () => {
    window.localStorage.removeItem("loginData");
    navigate("/join/login");
  };

  const handleNavigate = (path) => () => {
    navigate(`/dashboard/${path}`);
  };

  const handleCarrito = () => {
    navigate("/carrito");
  };
  const [carritoCantidad, setCarritoCantidad] = React.useState(localStorage.getItem("carritoItems"));
  
  
  React.useEffect(() => {
    setCarritoCantidad(localStorage.getItem("carritoItems"));
    
  }, [localStorage.getItem("carritoItems")]);


  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "1vw",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              px: 0,
            }}
          >
            {/* <Sitemark /> */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button onClick={() => navigate("/")}>
                <PsychologyIcon />

                <Typography
                  variant="h5"
                  component="div"
                  alignSelf={"center"}
                  px={"1vh"}
                >
                  Galileo Learning
                </Typography>
              </Button>

              {localStorage.getItem("loginData") && (
                <>
                  <Button
                    variant="text"
                    color="info"
                    size="small"
                    onClick={handleNavigate("cursos")}
                  >
                    Cursos
                  </Button>
                  <Button
                    variant="text"
                    color="info"
                    size="small"
                    onClick={handleNavigate("perfil")}
                  >
                    Perfil
                  </Button>
                  <Button
                    variant="text"
                    color="info"
                    size="small"
                    onClick={handleNavigate("compras")}
                  >
                    Historial Compra
                  </Button>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <IconButton aria-label="cart"  href="carrito" >
              <Badge badgeContent={"C"} color="warning">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {!localStorage.getItem("loginData") ? (
              <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={goToLogin}
                >
                  Sign in
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={goToRegister}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={logout}
              >
                Log Out
              </Button>
            )}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { sm: "flex", md: "none" },
              alignItems: "self-start",
              px: 0,
            }}
          >
            <Box display={"flex"}>
              <IconButton color="info" disabled>
                <PsychologyIcon />
              </IconButton>

              <Typography
                variant="h5"
                component="div"
                alignSelf={"center"}
                px={"1vh"}
              >
                Galileo Learning
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />

                <MenuItem onClick={handleNavigate("cursos")}>Cursos</MenuItem>
                <MenuItem onClick={handleNavigate("perfil")}>Perfil</MenuItem>
                <MenuItem onClick={handleNavigate("compras")}>
                  Historial de Compra
                </MenuItem>
                <MenuItem>
                  <IconButton onClick={handleCarrito}>
                    <ShoppingCartIcon />
                  </IconButton>
                </MenuItem>
                {!localStorage.getItem("loginData") ? (
                  <>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={goToRegister}
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        fullWidth
                        onClick={goToLogin}
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={logout}
                    >
                      Log Out
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
