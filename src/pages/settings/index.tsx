import { ContainerApp } from "../../components/ContainerApp";
import { Box, Container, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useEffect, useState } from "react";
import { useStyles } from "./styles";

export function Settings() {
    const [age, setAge] = useState('20');
    const [color, setColor] = useState('#007bff');
    const styles = useStyles();

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);

      if(event.target.value == '10'){
        const themeModeStorage = "dark"
        localStorage.setItem("themeMode", JSON.stringify(themeModeStorage))
        window.location.reload();
      }else{
        if(event.target.value == '20'){
            const themeModeStorage = "light"
            localStorage.setItem("themeMode", JSON.stringify(themeModeStorage))
            window.location.reload();
        }
      }
    };

    const handleChangeColor = (event: any) => {
        setColor(event.target.value);

        const themeModeColorStorage = event.target.value;

        localStorage.setItem("themeModeColor", JSON.stringify(themeModeColorStorage))
        window.location.reload();
    };

    useEffect(() => {
        const themeModeDb = localStorage.getItem("themeMode");
        const themeModeStorage = themeModeDb ? JSON.parse(themeModeDb) : null;

        const themeModeColorDb = localStorage.getItem("themeModeColor");
        const themeModeColorStorage = themeModeColorDb ? JSON.parse(themeModeColorDb) : null;

        
        
        if(themeModeStorage){
            if(themeModeStorage === 'dark'){
                setAge("10")
            }else if(themeModeStorage === 'light'){
                setAge("20")
            }
        }

        if(themeModeColorStorage){
            setColor(themeModeColorStorage)
        }
    }, [])

  return (
      <ContainerApp>
        <Container className={styles.containerCenter}>
            <Box className={styles.boxGlobal}>
                <Box className={styles.boxLabel}>
                    <WbSunnyIcon />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Modo do Tema
                    </Typography>
                </Box>
                <Box>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Modo"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Escuro</MenuItem>
                        <MenuItem value={20}>Claro</MenuItem>
                    </Select>
                </Box>
            </Box>

            <Box className={styles.boxGlobalV2}>
                <Box className={styles.boxLabel}>
                    <WbSunnyIcon />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cor Padrão
                    </Typography>
                    
                </Box>
                <Box>
                    <TextField 
                        id="outlined-basic" 
                        value={color} 
                        type="color" label="Titulo" 
                        variant="outlined"
                        className={styles.textField}
                        onChange={handleChangeColor}
                    />
                </Box>
            </Box>
            
        </Container>
      </ContainerApp>
  );
}