import { Backdrop, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import ProtoTypes from 'prop-types';

const CustomLoader = ({ message, show }) => {
    return (
        // Utilizado para indicar cargando 
        <div>
            <Backdrop open={show} className="Backdrop" >
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress color="inherit" />
                    <Typography variant="h6" noWrap>{message}</Typography>
                </div>
            </Backdrop>
        </div>
    )
}

CustomLoader.prototypes = {
    message: ProtoTypes.string,
    show: ProtoTypes.bool.isRequired
}

CustomLoader.defaultProps = {
    message: "Cargando, por favor espere.",
    show: false
}


export default CustomLoader;