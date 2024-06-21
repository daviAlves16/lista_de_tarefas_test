import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AppBar, Box, Button, Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import DrawerMenu from "../Drawer";
import MenuIcon from '@mui/icons-material/Menu';
import useWidth from "../../hooks/useWidth";
import { useStyles } from "./styles";

export function NavBar({children} : any) {
  const navigate = useNavigate();
  const { signed, signOut, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const width = useWidth();
  const styles = useStyles();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    signOut()
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {width < 1000 && 
      (
        <Typography variant="subtitle2" component="div" className={styles.typographyMenu}>
          {user && user.email ? user.email : ""}
        </Typography>
      )}
      {width < 1000 && (<Divider sx={{ my: 0.5 }} />)}
      <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
    </Menu>
  );


  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {signed && (
            <IconButton aria-label="delete" size="large" color="inherit" onClick={toggleDrawer(true)} sx={{marginRight: '0.2rem'}}>
              <MenuIcon fontSize="inherit" />
            </IconButton>
          )}
          <Typography onClick={() => {navigate("/")}} variant={width < 1000 ? "subtitle1" : "h6"} component="div" sx={{ flexGrow: 1, cursor: "pointer"}}>
            Minhas Tarefas
          </Typography>
          {!signed ? (
            <Box>
                <Button size={width < 1000 ? "small" : "large"} className={styles.buttonSingIn} variant="outlined" color="inherit" onClick={() => {navigate("/signin")}}>Entrar</Button>
                <Button size={width < 1000 ? "small" : "large"} color="inherit" onClick={() => {navigate("/signup")}} variant="outlined">Criar Conta</Button>
            </Box>
          )
          :
          (
            <Box className={styles.boxIconCircle}>
              {width >= 1000 && (<Typography variant="subtitle2" component="div">
                {user && user.email ? user.email : ""}
              </Typography>)}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )
        }
        
        </Toolbar>
      </AppBar>
      {renderMenu}

        <div>
            {children}
        </div>

        <DrawerMenu 
          open={open}
          toggleDrawer={toggleDrawer}
        />
    </Box>
  );
}

