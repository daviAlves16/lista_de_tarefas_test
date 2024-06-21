import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  boxButton:{
    marginTop: '2rem', 
    marginBottom: '1rem', 
    display: 'flex', 
    justifyContent: 'end'
  },
  pappeTable: {
    width: '100%', 
    overflow: 'hidden'
  },
  tableContainer: {
    height: '70vh'
  },
  textTable: {
    fontSize: '0.7rem !important'
  },
  textTableV2: {
    fontSize: '1rem !important'
  }
}));