import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Grid } from '@material-ui/core';
import Celda from './celda';
import { useSelector, useDispatch } from 'react-redux';
import { carreraSeleccionada as carreraSelector } from '../../../redux/selectors';
import { getCarrera } from '../../../redux/actions/carrera';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {getAllTeoricos } from '../../../redux/actions/teorico';

import { allTeoricosResults as allteoricosSelector } from '../../../redux/selectors';
import { all } from 'redux-saga/effects';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		//alignContent: 'center', 
		color: theme.palette.text.secondary,
	},
	paperOnClick: {
		borderColor: 'blue',
	},
}));

const generarCelda = (elemento, index) => {
	return <Grid key={elemento.codigo} item xs={6} sm={4} md={4} lg={3} xl={2} >
				<Paper  variant='outlined' style={{ minHeight: 125 }} evelation={3}>
					<Celda materia={elemento} />
				</Paper>
			</Grid>
}


export default function Malla(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const carrera = useSelector((state) => carreraSelector(state));

	const allTeoricosBase = useSelector((state) => allteoricosSelector(state));
	const [allTeoricosUnicos, setAllTeoricosUnicos] = useState([]);
	const [celdas, setCeldas] = useState([]);

	useEffect(() => {
		//console.log('llamada')
		if(allTeoricosBase.length ===0 ){
			dispatch(getAllTeoricos());
		}
	});

	useEffect(()=>{
		//console.log('order')
		if(allTeoricosBase.length !==0 && allTeoricosUnicos.length ===0){
			let unicos = []
				allTeoricosBase.forEach( ter=> {
					
					if(typeof(unicos.find( (e) => e.codigo === ter.codigo)) === 'undefined'){
						unicos.push(ter)
					}
					
				})
				setAllTeoricosUnicos(unicos)
		}
		
		
	}, [allTeoricosUnicos, allTeoricosBase])

	useEffect(() => {
		if (!carrera) {
			dispatch(getCarrera());
		}
	});
	useEffect(() => {
		if (!celdas && carrera) {
			/*setCeldas( carrera['materias'].map((element, index) => (
				generarCelda(element, index, celdas)
			)));*/
			setCeldas([])
		}
	},[celdas,carrera]);


	const onChangeComplete = (event, value, reason) => {
		if(reason === "select-option"){
			if(typeof(celdas.find( (e) => e.key === value.codigo)) === 'undefined'){
				setCeldas( anteriorCeldas => {
					return [...anteriorCeldas, generarCelda(value,anteriorCeldas.length) ]
				})
			}
		}
	}
	console.log(allTeoricosBase)
	return (
		<div className={classes.root}>
			<div>
			<Grid container={true} spacing={3} justify="center"
				alignItems="center">

				<Grid item  xs={12} sm={8} md={8} lg={6} xl={6}>
				{allTeoricosBase && allTeoricosUnicos ? <Autocomplete
					id='input-nombre-carrera'
					onChange={onChangeComplete}
					options={allTeoricosUnicos}
					//options={carrerasResults.reduce((a, b) => {
					//	return {'materias': a.materias.concat(b.materias)} } )['materias']}
					getOptionLabel={(option) => {return `${option['nombre']} - ${option['codigo']}` }}
					renderInput={(params) => (
						<TextField {...params} 
						id='custom-css-outlined-input' 
						label="Agregue una nueva materia" 
						variant="outlined" />
						)}
				/>: <></> }
				</Grid >
			</Grid>
			</div>
			<Grid container={true} spacing={3} justify="center"
				alignItems="center">
				{celdas}
			</Grid>
		</div>
	);
}