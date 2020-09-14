import { Button, Divider, Typography } from '@material-ui/core';
import CustomLoader from 'components/customLoader';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { Container } from 'reactstrap';
import { reduxForm, SubmissionError } from 'redux-form';
import { ReportForm } from './form';
import moment from 'moment';
import { NotifyError, NotySuccess } from 'components/notification';
import Api from 'api';

const formName = "reportForm";

//Componente que contiene las funcionalidades que hacen posible que un técnico haga un reporte de la atención a un servicio una vez fue terminado.
let Report = ({ handleSubmit, reset }) => {

    const [workingPersistence, setWorkingPersistence] = useState(false);

    const createNewServer = newServer => Api.Serice.Create(newServer);

    //metodo encargado de limpiar el formulario
    const _clearForm = () => {
        reset();
    }

    //Metodo encargado de validar y enviar los datos del formulario
    const _sendData = values => {
        const { endTime, idSer, idTec, startTime } = values;
        if (idTec && idSer && moment(endTime).isValid() && moment(startTime).isValid()) {

            //Ahora se valida que las fechas no sean mayor que hoy y que se respeten por orden
            if (moment(endTime).isSameOrBefore(moment()) && moment(startTime).isSameOrBefore(moment())) {

                if (moment(endTime).isAfter(moment(startTime))) {

                    //Todo OK, pasamos a crear el objecto del servicio
                    const newService = {
                        idTec: idTec.trim(),
                        idSer: idSer.trim(),
                        startDate: `${moment(startTime).year()}-${(moment(startTime).month() + 1) < 10 ? "0" + (moment(startTime).month() + 1) : (moment(startTime).month() + 1)}-${moment(startTime).date() < 10 ? "0" + moment(startTime).date() : moment(startTime).date()}T00:00`,
                        startTime,
                        endDate: `${moment(endTime).year()}-${(moment(endTime).month() + 1) < 10 ? "0" + (moment(endTime).month() + 1) : (moment(endTime).month() + 1)}-${moment(endTime).date() < 10 ? "0" + moment(endTime).date() : moment(endTime).date()}T00:00`,
                        endTime
                    }

                    //Se solicita la creación por base de datos
                    setWorkingPersistence(true);
                    createNewServer(newService).then( res => {
                        setWorkingPersistence(false);
                        if(!res.error){
                            NotySuccess(res.mensaje);
                        }else{
                            NotifyError(res.mensaje);
                        }
                    } ).catch( err => {
                        NotifyError(err)
                    } );

                } else {
                    throw new SubmissionError({
                        endTime: 'La fecha inicial debe ser menor a la final',
                    });
                }

            } else if (!moment(endTime).isSameOrBefore(moment())) {
                throw new SubmissionError({
                    endTime: 'La fecha no puede ser mayor a la actual',
                });
            } else if (!moment(startTime).isSameOrBefore(moment())) {
                throw new SubmissionError({
                    startTime: 'La fecha no puede ser mayor a la actual',
                });
            }
        } else {
            NotifyError("Verifique los campos solicitados e intente nuevamente.");
        }
    }

    return (
        <CSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
        >

            {/* Cabecera */}
            <div className="header-page">
                <Typography variant="h5">Reporte de servicio</Typography>
                <Typography variant="subtitle1">Este módulo contiene las funcionalidades que hacen posible que un técnico haga un reporte de la atención a un servicio una vez fue terminado.</Typography>
                <Divider style={{margin: 10}} />
            </div>

            {/* Cuerpo */}
            <Container fluid className={"body-page"}>
                <ReportForm disabled={workingPersistence} formSection="" />

                <div style={{ float: 'right' }}>
                    <Button variant="contained" onClick={_clearForm} disabled={workingPersistence}>
                        Cancelar
                    </Button>
                    <Button className="ml-2" variant="contained" color="primary" onClick={handleSubmit(_sendData)} disabled={workingPersistence}>
                        Enviar
                    </Button>
                </div>

            </Container>

            {/* Utilizado para indicar cargando */}
            <CustomLoader show={workingPersistence} />
        </CSSTransitionGroup>
    )
}

Report = reduxForm({
    form: formName
})(Report);

Report = connect(
    state => ({
        initialValues: {
            idTec: "",
            idSer: "",
            startTime: "",
            endTime: ""
        },
        enableReinitialize: true
    })
)(Report);

export default Report;