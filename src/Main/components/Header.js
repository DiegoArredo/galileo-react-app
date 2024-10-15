import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, useMediaQuery, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/system";
// import { FaBars } from "react-icons/fa";

const ParallaxHeader = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "60vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  [theme.breakpoints.down("md")]: {
    height: "40vh"
  }
}));

const Logo = styled("img")({
  height: 40,
  marginRight: 16
});

const NavButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  marginLeft: theme.spacing(2),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
}));

const HeaderContent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "#fff",
  animation: "fadeIn 1s ease-in",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  }
});

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Home", "About", "Services", "Contact"];

  const handleNavClick = (item) => {
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsDrawerOpen(false);
  };

  return (
    <>

      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item} onClick={() => handleNavClick(item)}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <ParallaxHeader role="img" aria-label="Scenic mountain landscape">
        <HeaderContent>
          <Typography variant="h1" component="h1" gutterBottom>
            Galileo e-Learning
          </Typography>
          {/* <Typography variant="h5" component="h2" gutterBottom>
            Discover amazing features and services
          </Typography> */}
        </HeaderContent>
      </ParallaxHeader>
    </>
  );
};

export default Header;
