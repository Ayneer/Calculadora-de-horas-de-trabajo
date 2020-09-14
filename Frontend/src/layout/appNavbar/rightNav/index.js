import React, { useState } from 'react';
import { Avatar, Typography, IconButton, Menu, Card, CardHeader, useMediaQuery, useTheme } from '@material-ui/core';
import { ExitToAppRounded, MoreVertOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { logout } from 'actions/session';
import clsx from 'clsx';

const RightNav = () => {

    //Estado para controlar el menú desplegado en los tres puntos de mas (mobil)
    const [moreMenu, setMoreMenu] = useState(null);

    const dispatch = useDispatch();
    //Dispatch para cerrar sesión
    const _logout = (cb) => dispatch(logout(cb));

    //Toggle menú tres puntos
    const _toggleMoreMenu = event => setMoreMenu(event.currentTarget);
    const _closeMoreMenu = () => setMoreMenu(null);

    //Para el manejo de mediaQuery
    const theme = useTheme();
    const isMoreMd = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div className={"appNavbarRight"}>
            {/* Componente que se visualiza cuando se esta en dispositivos medianamente grandes (xl, lg y md) */}
            <div className={clsx("avatarNav", { "displayNone": !isMoreMd })}>
                <Avatar className={"avatar"} />
                <Typography className={"text1"} noWrap>
                    {"userName"}
                </Typography>
                <IconButton color="inherit" edge="end" onClick={() => _logout(() => { })}>
                    <ExitToAppRounded />
                </IconButton>
            </div>
            {/* Componente que se visualiza cuando se esta en dispositivos pequeños (sm y xs) */}
            <div className={clsx("avatarNav", { "displayNone": isMoreMd })}>
                <IconButton color="inherit" edge="end" className={"btnMore"} aria-controls="menu" aria-haspopup="true" onClick={_toggleMoreMenu}>
                    <MoreVertOutlined />
                </IconButton>
                <Menu id="menu" keepMounted open={Boolean(moreMenu)} anchorEl={moreMenu} onClose={_closeMoreMenu} className={"menuMoreIcons"}>
                    <Card>
                        <CardHeader
                            avatar={<Avatar />}
                            action={
                                <IconButton color="inherit" edge="end" onClick={() => _logout(() => { })}>
                                    <ExitToAppRounded />
                                </IconButton>
                            }
                            title={"userName"}
                            subheader={""}
                        />
                    </Card>
                </Menu>
            </div>
        </div>
    )
}

export default RightNav;