import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../../hooks/useAuth';

type Task =  {
    id: string;
    titulo: string;
    descricao: string;
    status: boolean
}

  
type ItemList = {
    token: string;
    list_task_db: Task[]
}
  
type Props = {
    open: boolean;
    handleClose: any;
    task: Task | null
}

export default function DialogDelete({open, handleClose, task} : Props) {
    const { user} = useAuth();

    const deleteTask = () => {
        const listTaskDb = localStorage.getItem("list_task_db");
        const listTaskStorage = listTaskDb ? JSON.parse(listTaskDb) : null;
    
        if(listTaskStorage){
          listTaskStorage.map((item_list: ItemList) => {
            if(item_list.token === user.token){
                if(task){
                    item_list.list_task_db = item_list.list_task_db.filter((task_item: Task) => task_item.id !== task.id)
                } 
            }
          })
          localStorage.setItem("list_task_db", JSON.stringify(listTaskStorage))
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
          {task && task.titulo ? task.titulo : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja deletar essa tarefa?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={deleteTask} autoFocus variant="contained" color="error">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
  );
}