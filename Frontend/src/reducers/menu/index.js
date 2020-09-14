//Constantes generales
import { LIMPIAR_STATE_SALIR } from "actions";

//Constantes locales
export const TOGGLE_MENU = "TOGGLE_MENU";

//Estos en su forma inicial
const initState = {
    open: true,
}

//Manejo de los estados del menú con redux
export const menu = (state = initState, action) => {
    switch (action.type) {

        case LIMPIAR_STATE_SALIR: {
            return {
                ...state,
                ...initState
            }
        }

        case TOGGLE_MENU: {
            return {
                ...state,
                open: action.state
            }
        }

        default:
            return state;
    }
}

export const _toggleMenu = state => ({ type: TOGGLE_MENU, state });

export const getMenuState = state => state && state.open !== undefined ? state.open : false;