import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ContainerApp } from "../../components/ContainerApp";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useStyles } from "./styles";

const validationSchema = Yup.object().shape({
  email: Yup.string(),
  password: Yup.string(),
});

type Values =  {
  email: string;
  password: string
}

export function SignIn() {

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const styles = useStyles();

  const [initialValues] = useState<Values>({
    email: "",
    password: "",
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: () => {},
  });

  const handleLogin = () => {
    if(!formik.values.email || !formik.values.password){
      setError("Preencha todos os campos");
      return
    }
    const res = signIn(formik.values.email, formik.values.password);
    if(res){
      setError(res);
      return;
    }
    navigate("/home")
  }
  
  return (
      <ContainerApp>
        <Box className={styles.boxGlobal}>
          <Box 
            className={styles.boxCenter}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              BEM-VINDO
            </Typography>

            <TextField 
              id="outlined-basic" 
              value={formik.values.email} 
              type="email" label="E-mail" 
              variant="outlined" 
              onChange={formik.handleChange("email")}
              className={styles.textFieldForm}
            />
            <TextField 
              id="outlined-basic" 
              value={formik.values.password} 
              type="password" 
              label="Senha" 
              variant="outlined"
              onChange={formik.handleChange("password")}
              className={styles.textFieldForm}
            />
            <Typography variant="subtitle2" component="div" className={styles.typographyErro}>
              {error}
            </Typography>
            <Button className={styles.buttonLogin} variant="contained" color="primary" onClick={() => {handleLogin()}}>Entrar</Button>
            
            <Box className={styles.boxInfo}>
              <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
                Não tem uma conta?
              </Typography>
              <Typography variant="subtitle2" component="div" 
                className={styles.typographyDestaque}
              >
                <Link to="/signup">Cadastre-se já</Link>
              </Typography>
            </Box>
            
          </Box> 
        </Box>
      </ContainerApp>
  );
}