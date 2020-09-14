import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { Menu as MenuIcon, Close } from '@material-ui/icons';
// import RightNav from './rightNav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from 'actions/menu';
import clsx from 'clsx';
import { getMenuState } from 'reducers/menu';

//Componente encargado de ilustrar el menú horizontal del aplicativo
const AppNavbar = ({ title }) => {

    //State redux
    const menuState = useSelector(({ menu }) => getMenuState(menu));

    //Para disparar las acciones de redux
    const dispatch = useDispatch();
    const _toggleMenu = () => dispatch(toggleMenu(!menuState));

    //Para el manejo de mediaQuery
    const theme = useTheme();
    const betweenXsMd = useMediaQuery(theme.breakpoints.between('xs', 'md'));
    const betweenLgXl = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

    return (
        <AppBar position="fixed" className={clsx("appNavbar", { "appNavbarActive": menuState && betweenLgXl })}>
            <Toolbar>
                {/* Opciones mostradas al lado izquierdo del navbar */}
                {!betweenXsMd &&
                    <IconButton color="inherit" edge="start" onClick={_toggleMenu}>
                        {menuState ? <MenuIcon /> : <Close />}
                    </IconButton>
                }
                <Typography variant="h6" noWrap>
                    {title}
                </Typography>
                {/* Opciones mostradas al lado derecho del navbar */}
                {/* <RightNav /> */}
            </Toolbar>
        </AppBar>
    )
}

export default AppNavbar;