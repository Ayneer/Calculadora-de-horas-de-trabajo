import { renderInput } from 'components/field/input';
import { renderInputDate } from 'components/field/input-date';
import { required, validateID, validDigit } from 'components/field/validate';
import React from 'react';
import { Col, FormGroup, Row } from 'reactstrap';
import { Field, FormSection } from 'redux-form';

export const ReportForm = ({ formSection, disabled }) => {
    return (
        <FormSection name={formSection}>
            <Row form>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormGroup className={"form-gruop-redux"}>
                        <Field
                            id={`IdentificacionT${formSection}`}
                            type="text"
                            name="idTec"
                            component={renderInput}
                            label="Identificación del técnico"
                            disabled={disabled}
                            required={true}
                            validate={[required, validateID, validDigit]}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormGroup className={"form-gruop-redux"}>
                        <Field
                            id={`IdentificacionS${formSection}`}
                            type="text"
                            name="idSer"
                            component={renderInput}
                            label="Identificación del servicio"
                            disabled={disabled}
                            required={true}
                            validate={[required, validDigit]}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormGroup className={"form-gruop-redux"}>
                        <Field
                            id={`FechaHoraI${formSection}`}
                            name="startTime"
                            component={renderInputDate}
                            label="Fecha y hora de inicio"
                            disabled={disabled}
                            required={true}
                            validate={[required]}
                        />
                    </FormGroup>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <FormGroup className={"form-gruop-redux"}>
                        <Field
                            id={`FechaHoraF${formSection}`}
                            name="endTime"
                            component={renderInputDate}
                            label="Fecha y hora de fin"
                            disabled={disabled}
                            required={true}
                            validate={[required]}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </FormSection>
    )
}