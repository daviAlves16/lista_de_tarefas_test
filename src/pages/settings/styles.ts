import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  containerCenter:{
    marginTop: '2rem'
  },
  boxGlobal: {
    display: 'flex', 
    gap: '3rem', 
    alignItems: 'center'
  },
  boxGlobalV2: {
    display: 'flex', 
    gap: '3rem', 
    alignItems: 'center',
    marginTop: '1rem'
  },
  boxLabel: {
    display: 'flex', 
    gap: '1rem', 
    alignItems: 'center'
  },
  textField: {
    width: '10.5vh'
  }
}));