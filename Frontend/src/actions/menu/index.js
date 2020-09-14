import { _toggleMenu } from "reducers/menu";

//Acción que cambia el estado el menú principal del aplicativo
export const toggleMenu = state => {
    return (dispatch, getState, Api) => {
       return Promise.resolve().then(_ => {
        dispatch(_toggleMenu(state));
       })
    }
}