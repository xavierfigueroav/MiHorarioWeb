import React,{useState, useEffect} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  CardHeader,
  Button,
  Divider
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

import DialogPractico from "./dialog-practico";
import Zoom from "@material-ui/core/Zoom";
import {formatoIntevalo, formatoIntevaloEx} from '../util/util'
//import * as Colors from "@material-ui/core/colors";
const useStyles = makeStyles(theme =>({
  root: {
    //minWidth: 250,
    //maxWidth: 250,
    //maxHeight: 350
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  div: {
    padding: 0,
    alignContent: 'left',
    alignItems: 'left',

  },
  fab: {
    position: "absolute",
    right: theme.spacing(0),
    top: theme.spacing(0)
  },
  ghostIcon: {
    opacity: 0
  }
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  //const bull = <span className={classes.bullet}>•</span>;
  //necesarios para el cuadro de dialogo de paralelo
  const [open, setOpen] = useState(false);
  const [paralelo,setParalelo] = useState();
  const [isAdd, setIsAdd] = useState(true);

  const handleAddRemove = () => {
    setIsAdd(!isAdd);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      icon: <AddBoxOutlinedIcon />,
      label: "Add",
      entra: true,
      tooltipNode: "Add"
    },
    {
      color: "secondary",
      className: classes.fab,
      icon: <DeleteOutlineIcon />,
      label: "Remove",
      entra: false,
      tooltipNode: "Remove"
    }
  ];
  
  const handleParAsociados = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const getAction = () => {
    return (paralelo) ? (<><AddBoxOutlinedIcon className={classes.ghostIcon}/>
    {fabs.map((fab, index) => (
      <Zoom
        key={fab.color}
        in={isAdd === fab.entra}
        timeout={transitionDuration}
        unmountOnExit
      >
        <Tooltip title={fab.tooltipNode}>
          <IconButton
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={() => {
              handleAddRemove();
            }}
          >
            {fab.icon}
          </IconButton>
        </Tooltip>
      </Zoom>
    ))}</>) :(<></>)
  };

  useEffect(()=>{
    setParalelo(props.paralelo)
  },[props.paralelo]);


  return ( paralelo ?
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {paralelo['paralelo']}
          </Avatar>
        }
        action={ getAction()}
        title={paralelo['profesor'] ? paralelo['profesor'] : "Sin nombre"}
        subheader="Sin calificación"
      /><Divider />
      <CardContent className={classes.div}>
      <Typography variant="body2" component="p"  aling='left'>
          Clases
      </Typography>
      {paralelo.hasOwnProperty('eventos')? 
      (paralelo.eventos.clases.map(clase => (
          <React.Fragment key={clase}>
          <Typography variant="body2" aling='left' color='textSecondary'>
          - {formatoIntevalo(clase['inicio'], clase['fin'])}
          </Typography>
          </React.Fragment>
        ))):<></>}
      
      { paralelo.hasOwnProperty('eventos')? (
          <React.Fragment >
          <Typography variant="body2" component="p">
          Examenes
          </Typography>
          <Typography variant="body2" component="p" color='textSecondary'>
          - Parcial {formatoIntevaloEx(paralelo.eventos.examenes.parcial['inicio'],
          paralelo.eventos.examenes.parcial['fin'])}
          </Typography>
          <Typography variant="body2" component="p" color='textSecondary'>
          - Final {formatoIntevaloEx(paralelo.eventos.examenes.final['inicio'],
          paralelo.eventos.examenes.final['fin'])}
          </Typography>
          <Typography variant="body2" component="p" color='textSecondary'>
          - Mejoramiento {formatoIntevaloEx(paralelo.eventos.examenes.mejoramiento['inicio'],
          paralelo.eventos.examenes.mejoramiento['fin'])}
          </Typography>
          </React.Fragment>
        ):<></>}
      </CardContent>
      
      {(paralelo && paralelo['paralelos_practicos'].length > 0) ? (
        <><Divider />
          <CardActions>
            <Button size="small" onClick={handleParAsociados} color="primary">
              Par asociados
            </Button>
            <DialogPractico
              id="práctico-menu"
              open={open}
              keepMounted
              onClose={handleCloseDialog}
              teoricoId={paralelo['_id']}
              teorico={paralelo}
            />
          </CardActions>
        </>
      ) : (<></>
      )}
    </Card>: <div>Loading...</div> 
  );
}