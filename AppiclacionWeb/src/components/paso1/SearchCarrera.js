import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useActions} from 'react-redux'
//import axios from 'axios';

const CssTextField = withStyles({
	root: {
		'& input': {
			color: '#ffffff'
		},
		'& label': {
			color: '#ffffff'
		},
		'& label.Mui-focused': {
			color: '#2196f3'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#2196f3'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#fff'
			},
			'&:hover fieldset': {
				borderColor: '#2196f3'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#2196f3'
			}
		}
	}
})(TextField);

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		margin: theme.spacing(1)
	}
}));

export default function SearchCarrera(props) {
	const classes = useStyles();
	//const [carrerasEspol, setCarrerasEspol] = useState([]);
	//const carrerasEspol = useSelector(state => )
	/*useEffect(()=>{
		const fetchData = async () => {
		  const response = await axios.get('http://localhost:8080/carrera');
		  setCarrerasEspol(response.data)
		}
		fetchData();
	  }, []);
*/
	const onChangeComplete = (event, value , reason) => {
		//props.onChangeCarrera(value);
	}

	return (
    <Container maxWidth="sm">
		<Grid
    container
    spacing={0}
    justify="center"
    direction="column"
    style={{ minHeight: '25vh' }}
		>
			<Grid item>
				<Autocomplete
					id='input-nombre-carrera'
					onChange={onChangeComplete}
					options={carrerasEspol}
					getOptionLabel={(option) => option['nombre']}
					renderInput={(params) => (
						<CssTextField
							{...params}
							className={classes.margin}
							label='Nombre de su carrera'
							variant='outlined'
							id='custom-css-outlined-input'
						/>
					)}
				/>
			</Grid>
			<Grid item>
				<script src="https://gist.github.com/EnmanuelMag/fe81e4261975fc584501668b845d4193.js"></script>
			</Grid>
		</Grid>
    </Container>
	);
}