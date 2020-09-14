import React from 'react';
import { toast } from 'react-toastify';
import { WarningRounded, CheckRounded, InfoRounded } from '@material-ui/icons';
import { Row, Col } from 'reactstrap';

//Cuerpo de la notificación
const NotificationBody = ({ closeToast, message, icon }) => {
    return (
        <Row onClick={closeToast} style={{ alignItems: 'center', display: 'flex' }}>
            <Col xl={2} xs={2} >{icon}</Col>
            <Col xl={10} xs={10} style={{ paddingLeft: 9 + 'px' }}><span>{message}</span></Col>
        </Row>
    )
}

//Notificación normal
export const Notificacion = (message, autoClose = 5000) => toast(<NotificationBody message={message} />, { autoClose });

//Notificación de error
export const NotifyError = (message, autoClose = 5000) => toast.error(
    <NotificationBody
        message={message}
        icon={<WarningRounded className="icon-notificacion" />}
    />,
    { autoClose });

//Notificación para informar
export const NotifyInfo = (message, autoClose = 5000) => toast.info(
    <NotificationBody
        message={message}
        icon={<InfoRounded className="icon-notificacion" />}
    />,
    { autoClose });

//Notificación de exito
export const NotySuccess = (message, autoClose = 5000) => toast.success(
    <NotificationBody
        message={message}
        icon={<CheckRounded className="icon-notificacion" />}
    />,
    { autoClose }
);