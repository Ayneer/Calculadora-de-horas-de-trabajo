import { Button, Divider, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Api from 'api';
import CustomLoader from 'components/customLoader';
import { NotifyError, NotySuccess } from 'components/notification';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { Container } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { ConsultForm } from './form';
import moment from 'moment';

const formName = "consultForm";

//Componente que contiene las funcionalidades necesarias para consultar el cálculo de horas de trabajo para cualquier técnico por semana
let Consult = ({ handleSubmit, reset }) => {

    const [workingPersistence, setWorkingPersistence] = useState(false);
    const [combionations, setCombionations] = useState(null);

    const consultCombinatios = (idTec, weekNumber) => Api.Serice.GetCombination(idTec, weekNumber);

    //metodo encargado de limpiar el formulario
    const _clearForm = () => {
        reset();
        setCombionations(null);
    }

    const _getStringDate = date => {
        if (moment(date).isValid()) {
            const year = moment(date).year();
            const month = (moment(date).month() + 1) < 10 ? "0" + (moment(date).month() + 1) : (moment(date).month() + 1);
            const day = (moment(date).date()) < 10 ? "0" + (moment(date).date()) : (moment(date).date());
            return `${year}-${month}-${day}`;
        } else {
            return "Invalid";
        }
    }

    //Metodo encargado de validar los datos del formulario y realizar la consulta de las combinaciones
    const _consultCombinations = values => {
        const { idTec, numeroSemana } = values;

        if (idTec && numeroSemana) {
            setWorkingPersistence(true);
            consultCombinatios(idTec.trim(), numeroSemana.trim()).then(res => {
                setWorkingPersistence(false);
                if (!res.error && res.data) {
                    const { HorasNormales, HorasNocturnas, HorasDominicales, HorasNormalesExtra, HorasNocturnasExtra, HorasDominicalesExtra, initialDate, endDate } = res.data;
                    setCombionations(
                        <div>
                            <AlertTitle>
                                {`Combinaciones para la semana ${numeroSemana.trim()}.`}<br />
                                <strong>Desde </strong>{_getStringDate(initialDate)} <strong>hasta </strong>{_getStringDate(endDate)}
                            </AlertTitle>
                            <strong>Horas normales (7:00 AM - 8:00 PM):</strong> {HorasNormales} <br />
                            <strong>Horas nocturnas (8:00 PM - 7:00 AM):</strong> {HorasNocturnas} <br />
                            <strong>Horas dominicales (Domingo):</strong> {HorasDominicales} <br />
                            <strong>Horas normales extras (7:00 AM - 8:00 PM Despues de 48h de trabajo/semana):</strong> {HorasNormalesExtra} <br />
                            <strong>Horas nocturnas extras (8:00 PM - 7:00 AM Despues de 48h de trabajo/semana): </strong> {HorasNocturnasExtra} <br />
                            <strong>Horas dominicales extras (Domingo, despues de 48h de trabajo/semana):</strong> {HorasDominicalesExtra} <br />
                        </div>
                    );
                    NotySuccess(res.mensaje);
                } else {
                    NotifyError(res.mensaje);
                    setCombionations(null);
                }
            });
        } else {
            NotifyError("Verifique los campos solicitados e intente nuevamente.");
            setCombionations(null);
        }
        console.log(values)
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
                <Typography variant="h5">Consulta de servicios</Typography>
                <Typography variant="subtitle1">Este módulo contiene las funcionalidades necesarias para consultar el cálculo de horas de trabajo para cualquier técnico por semana.</Typography>
                <Divider style={{ margin: 10 }} />
            </div>

            {/* Cuerpo */}
            <Container fluid className={"body-page"}>

                <ConsultForm disabled={workingPersistence} formSection="" />

                {combionations &&
                    <Alert severity="info" className="mb-3">
                        {combionations}
                    </Alert>
                }

                <div style={{ float: 'right' }}>
                    <Button variant="contained" onClick={_clearForm} disabled={workingPersistence}>
                        Cancelar
                    </Button>
                    <Button className="ml-2" variant="contained" color="primary" onClick={handleSubmit(_consultCombinations)} disabled={workingPersistence}>
                        Consultar
                    </Button>
                </div>

            </Container>

            {/* Utilizado para indicar cargando */}
            <CustomLoader show={workingPersistence} />
        </CSSTransitionGroup>
    )
}

Consult = reduxForm({
    form: formName
})(Consult);

Consult = connect(
    state => ({
        initialValues: {
            idTec: "",
            numeroSemana: "",
        },
        enableReinitialize: true
    })
)(Consult);

export default Consult;