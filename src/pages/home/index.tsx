import { useEffect, useState } from "react";
import { ContainerApp } from "../../components/ContainerApp";
import { useAuth } from "../../hooks/useAuth";
import AlertDialogTask from "../../components/DialogCreate";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import DialogConfirm from "../../components/DialogConfirm";
import DialogDelete from "../../components/DialogDelete";
import { useStyles } from "./styles";
import { 
  Box, 
  Button, 
  Container, 
  IconButton, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, TablePagination, 
  TableRow, 
  Typography } from "@mui/material";
import useWidth from "../../hooks/useWidth";

interface Rows {
  id: string;
  titulo: string;
  descricao: string;
  status: boolean
}

export function Home() {
  const { user} = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [myRows, setMyRows] = useState<Rows[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [myTask, setMyTask] = useState<Rows | null>(null)
  const styles = useStyles();
  const width = useWidth()

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getTasks = () => {
    const listTaskDb = localStorage.getItem("list_task_db");
    const listTaskStorage = listTaskDb ? JSON.parse(listTaskDb) : null;

    if(listTaskStorage){
      const hasList = listTaskStorage ? listTaskStorage.filter((list: any) => list.token === user.token) : null
      if(hasList && hasList[0].list_task_db){
        setMyRows(hasList[0].list_task_db)
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    setLoading(true)
    if(user){
      getTasks()
    }
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if(loading){
    return (
      <ContainerApp>
        <Container>
        <Box>
          <Typography variant="subtitle2" component="div">
            Carregando...
          </Typography>
        </Box>
        </Container>
      </ContainerApp>
    )
  }

  return (
    <ContainerApp>
      <Container>
        <Box className={styles.boxButton}>
          <Button color="primary" onClick={() => {handleClickOpen()}} variant="contained">Criar Tarefa</Button>
        </Box>
        <Paper className={styles.pappeTable}>
          <TableContainer className={styles.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                    <TableCell
                      key={""}
                      align={"left"}
                      className={
                        width < 1000 
                        ? styles.textTable 
                        : styles.textTableV2
                      }
                    >
                      Título
                    </TableCell>
                    <TableCell
                      key={""}
                      align={"left"}
                      className={
                        width < 1000 
                        ? styles.textTable 
                        : styles.textTableV2
                      }
                    >
                      Descrição
                    </TableCell>

                    <TableCell
                      key={""}
                      align={"right"}
                      className={
                        width < 1000 
                        ? styles.textTable 
                        : styles.textTableV2
                      }
                    >
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
              <TableBody>
                {myRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow 
                        hover role="checkbox" 
                        tabIndex={-1} 
                        key={i}
                        sx={{
                          background: row.status ? '#a2cea4' : '',
                        }}
                      >
                        <TableCell 
                          key={""} 
                          className={
                            width < 1000 
                            ? styles.textTable 
                            : styles.textTableV2
                          }
                        >
                          {row && row.titulo ? row.titulo : "" }
                        </TableCell>
                        <TableCell 
                          key={""} 
                          className={
                            width < 1000 
                            ? styles.textTable 
                            : styles.textTableV2
                          }
                        >
                          {row && row.descricao ? row.descricao : "" }
                        </TableCell>
                        <TableCell 
                          key={""} 
                          align={"right"} 
                          className={
                            width < 1000 
                            ? styles.textTable 
                            : styles.textTableV2
                          }
                        >
                          {!row.status &&
                            (
                              <IconButton 
                                aria-label="Concluida" 
                                size="large" 
                                color="success" 
                                onClick={() => {
                                  setMyTask(row)
                                  handleClickOpenConfirm()}
                                }
                              >
                                <CheckIcon />
                              </IconButton>
                            )}
                          <IconButton 
                            aria-label="Deletar" 
                            size="large" 
                            color="error"
                            onClick={() => {
                              setMyTask(row)
                              handleClickOpenDelete()}
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={myRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>

      <AlertDialogTask 
        open={open} 
        handleClose={() => {
          handleClose()
          getTasks()
        }}
      />

      <DialogConfirm 
        task={myTask ? myTask : null}
        open={openConfirm} 
        handleClose={() => {
          handleCloseConfirm()
          getTasks()
          setMyTask(null)
        }}
      />

      <DialogDelete 
        task={myTask ? myTask : null}
        open={openDelete} 
        handleClose={() => {
          handleCloseDelete()
          getTasks()
          setMyTask(null)
        }}
      />
    </ContainerApp>
  );
}