import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ContainerApp } from "../../components/ContainerApp";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useStyles } from "./styles";

const validationSchema = Yup.object().shape({
  email: Yup.string(),
  emailConfirm: Yup.string(),
  password: Yup.string(),
});

export function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const styles = useStyles();

  const [initialValues] = useState<any>({
    email: "",
    emailConfirm: "",
    password: "",
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: () => {},
  });

  const handleSignUp = () => {
    if(!formik.values.email || !formik.values.password || !formik.values.emailConfirm){
      setError("Preencha todos os campos");
      return
    }else if(formik.values.email !== formik.values.emailConfirm){
      setError("Os e-mails não são iguais")
      return 
    }
    const res = signUp(formik.values.email, formik.values.password );

    if(res){
      setError(res);
      return;
    }

    alert("Usuario cadastrado com sucesso!")
    navigate("/home")
  }
  
  return (
    <ContainerApp>
        <Box className={styles.boxGlobal}>
          <Box 
            className={styles.boxCenter}>
            
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              CRIE A SUA CONTA.
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
              value={formik.values.emailConfirm} 
              type="email" label="Confirme seu e-mail" 
              variant="outlined" 
              onChange={formik.handleChange("emailConfirm")}
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
            <Button className={styles.buttonLogin} variant="contained" color="primary" onClick={() => {handleSignUp()}}>Cadastrar</Button>
            
            <Box className={styles.boxInfo}>
              <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
                Já tem uma conta?
              </Typography>
              <Typography variant="subtitle2" component="div" 
                className={styles.typographyDestaque}
              >
                <Link to="/signin">Entre já</Link>
              </Typography>
            </Box>
            
          </Box> 
        </Box>
    </ContainerApp>
  );
}