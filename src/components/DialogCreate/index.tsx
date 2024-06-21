import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from "yup";
import { useAuth } from '../../hooks/useAuth';
import { useStyles } from './styles';

type Props = {
    open: boolean;
    handleClose: any
}

type Values =  {
  id: string;
  titulo: string;
  descricao: string;
  status: boolean
}

type ItemList = {
  token: string;
  list_task_db: Values[]
}

const validationSchema = Yup.object().shape({
  titulo: Yup.string(),
  descricao: Yup.string(),
  status: Yup.boolean(),
});

export default function AlertDialogTask({open, handleClose} : Props) {
  
  const { user} = useAuth();
  const styles = useStyles();
  const [initialValues] = useState<Values>({
    id: "",
    titulo: "",
    descricao: "",
    status: false
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: () => {},
  });

  const postTask = () => {
    const listTaskDb = localStorage.getItem("list_task_db");
    const listTaskStorage = listTaskDb ? JSON.parse(listTaskDb) : null;

    if(listTaskStorage){

      listTaskStorage.map((item_list: ItemList) => {
        if(item_list.token === user.token){
          item_list.list_task_db.push({
            id: Math.random().toString(36).substring(2),
            titulo: formik.values.titulo,
            descricao: formik.values.descricao,
            status: formik.values.status
          });
        }
      })
      localStorage.setItem("list_task_db", JSON.stringify(listTaskStorage))
      formik.setValues(initialValues)
      handleClose()
    }
  }
  
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Criar tarefa"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box className={styles.boxTitleDialog}>
              <TextField 
                id="outlined-basic" 
                value={formik.values.titulo} 
                type="text" label="Titulo" 
                variant="outlined"
                className={styles.textField}
                onChange={formik.handleChange("titulo")}
              />

              <TextField 
                id="outlined-basic" 
                value={formik.values.descricao} 
                type="text" label="Descrição" 
                variant="outlined"
                className={styles.textField}
                onChange={formik.handleChange("descricao")}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={postTask} autoFocus variant="contained" color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
  );
}