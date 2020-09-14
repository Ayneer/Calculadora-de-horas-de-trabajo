import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Divider, useTheme, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import Brand from './brand';
import MenuOptions from './menuOptions';
import { toggleMenu } from 'actions/menu';
import { getMenuState } from 'reducers/menu';

//Componente encargado de ilustrar el menú vertical del aplicativo
const VerticalMenu = ({ history }) => {

    //State redux
    const menuState = useSelector(({ menu }) => getMenuState(menu));

    //Para disparar las acciones de redux
    const dispatch = useDispatch();

    //Para el manejo de mediaQuery
    const theme = useTheme();
    const isSm_Xs = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    //Si se esta en dispositivos pequeños, se debe abrir el menú cuando este sea presionado
    const _onClickVerticalMenu = () => {
        if(isSm_Xs && !menuState){
            dispatch(toggleMenu(true));
        }
    }

    return (
        <Drawer
            variant="permanent"
            className={clsx("verticalMenu", {
                "verticalMenuActive": menuState,
                "verticalMenuClose": !menuState,
                "useHover": !isSm_Xs
            })}
            onClick={_onClickVerticalMenu}
        >
            {/* Logotipo del aplicativo */}
            <Brand />
            {/* Divición entre el brand y el listado de items del menú */}
            <Divider className={"divider"} />
            {/* OpcioneS del menú */}
            <MenuOptions history={history} />
        </Drawer>
    )
}

export default VerticalMenu;