
import { combineReducers } from 'redux'
import paqueteria from './paquetes'
import seleccionados from './seleccionados'
import carreras from './carreras'
import carrera from './carrera'
import materias from './materias'
import teoricos from './teorico'
import asociados from './asociado'
import generador from './generador'
export const initialState = {
    carreras: [],
    carrera: {},
    paquete: [],
    paquete_seleccionados: [],
    isMobile: false,
    horarios: [],
    hoaraio: {}
};

const todoApp = combineReducers({
    paqueteria,
    seleccionados,
    carreras,
    carrera,
    materias,
    teoricos,
    asociados,
    generador
})

export default todoApp