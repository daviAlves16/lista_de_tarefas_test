import { RoutesApp } from "./routes";
import { AuthProvider } from "./contexts/auth";
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react";


export function App() {
  
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light")
  const [primaryColor, setPrimaryColor] = useState('#007bff');

  const darkTheme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: primaryColor,
      }
    },
    
  });

  useEffect(() => {
    const themeModeDb = localStorage.getItem("themeMode");
    const themeModeStorage = themeModeDb ? JSON.parse(themeModeDb) : null;

    const themeModeColorDb = localStorage.getItem("themeModeColor");
    const themeModeColorStorage = themeModeColorDb ? JSON.parse(themeModeColorDb) : null;

    setPrimaryColor(themeModeColorStorage ? themeModeColorStorage : "#007bff")
    setThemeMode(themeModeStorage ? themeModeStorage : "light")
  }, [])
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </ThemeProvider>
    
  );
}