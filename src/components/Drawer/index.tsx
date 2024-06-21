import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

type Props = {
    open: boolean;
    toggleDrawer: any;
}

export default function DrawerMenu({open, toggleDrawer} : Props) {
    const navigate = useNavigate();

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={""} disablePadding onClick={() => {navigate("/")}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Pagina Inicial"} />
                    </ListItemButton>
                </ListItem>

                <ListItem key={""} disablePadding>
                    <ListItemButton onClick={() => {navigate("/settings")}}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Configurações"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
      </Drawer>
    </div>
  );
}