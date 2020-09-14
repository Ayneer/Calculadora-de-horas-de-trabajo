import { renderInput } from 'components/field/input';
import { required, validateID, validDigit } from 'components/field/validate';
import React from 'react';
import { Col, FormGroup, Row } from 'reactstrap';
import { Field, FormSection } from 'redux-form';

export const ConsultForm = ({ formSection, disabled }) => {
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
                            id={`NumeroSemana${formSection}`}
                            type="text"
                            name="numeroSemana"
                            component={renderInput}
                            label="Numero de la semana"
                            disabled={disabled}
                            required={true}
                            validate={[required, validDigit]}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </FormSection>
    )
}