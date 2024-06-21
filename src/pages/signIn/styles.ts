import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  boxGlobal:{
    height: '92vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  boxCenter: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '1rem', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  textFieldForm: {
    width: '20rem'
  },
  typographyErro: {
    flexGrow: 1, 
    color: 'red'
  },
  buttonLogin: {
    width: '20rem'
  },
  boxInfo: {
    display: 'flex', 
    gap: '0.2rem'
  },
  typographyDestaque: {
    flexGrow: 1, 
    color: '#1976d2', 
    cursor: 'pointer'
  }
}));

