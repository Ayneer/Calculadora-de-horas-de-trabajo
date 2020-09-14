const status = require('../../helpers/status');
const { responseModel, FOUND_RESOURCE, NO_FOUND_RESOURCE } = require('../../helpers/response');
const { List } = require('./List');
const { Find } = require('./Find');
const moment = require('moment');

//Metodo encargado de devolver el rango de fechas del numero de una semana del año
const getDatesByWeekNumber = (weekNumber, year) => {
    const actualDate = `${year}-01-01`;
    //La semana es desde Lunes-Domingo (ISO)
    //Se busca por el número de la semana la fecha inicial en el año indicado. Teniendo siempre encuenta que este en formato ISO
    const initialDate = moment(actualDate).year(year).week(weekNumber).startOf('isoWeek');
    //Se realiza el mismo procedimiento, añadiendo esta vez 6 días más, para obtener así la fecha final. Teniendo siempre encuenta que este en formato ISO
    const endDate = moment(actualDate).year(year).week(weekNumber).startOf('isoWeek').add(6, 'days');

    return {
        initialDate,
        endDate
    }
}

//Metodo encargado de convertir minutos a horas
const getHoursByMinutes = generalMinutes => {
    const divition = generalMinutes / 60;
    const hours = Math.floor(divition);
    const minutes = Math.floor(((divition - hours) * 60));
    return { hours, minutes };
}

const Handler = async (req, res, next) => {
    try {
        const { idTec, weekNumber } = req.body;

        //Verifico que los datos existan
        if (idTec && weekNumber) {

            //Ahora verifico que exista al menos un servicio del tecnico
            const serviceTec = await Find({ idTec });

            if (!serviceTec.error && serviceTec.data) {

                //Ahora se obtienen las fechas del numero de la semana del año solicitado
                const actualYear = moment().year();
                const { endDate, initialDate } = getDatesByWeekNumber(weekNumber, actualYear);

                //Se consultan los servicios que se encuentren en el rango de las fechas arrojadas del numero de la semana solicitado
                const resServices = await List({
                    idTec,
                    "$or": [
                        {
                            "$and": [
                                { startDate: { "$gte": new Date(initialDate) } },
                                { startDate: { "$lte": new Date(endDate) } }
                            ]
                        },
                        {
                            "$and": [
                                { endDate: { "$gte": new Date(initialDate) } },
                                { endDate: { "$lte": new Date(endDate) } }
                            ]
                        }
                    ]
                });

                if (!resServices.error) {

                    //Contadores para cada combinación y la general
                    //Se trabajarán en minutos, luego serán convertidos a horas
                    let weekMinutes = 0;
                    let sundayMinutes = 0;
                    let sundayExtraMinutes = 0;
                    let normalMinutes = 0;
                    let normalExtraMinutes = 0;
                    let nightMinutes = 0;
                    let nightExtraMinutes = 0;

                    //Se recorren los servicios
                    const servicesList = resServices.data;
                    for (const service of servicesList) {
                        const end = moment(service.endTime);//Fecha con la hora final del servicio
                        let start = moment(service.startTime);//Fecha con la hora de inicio del servicio

                        //Para ser mas preciso al saber el tiempo invertido por cada combinación
                        //Se optó por usar un ciclo while que irá desde la fecha inicial hasta la final
                        //Donde será evaluada cada nueva fecha por ciclo

                        //Nos aseguramos que el servicio se este evaluando este correcto y así evitar un loop
                        if (start.isValid() && end.isValid() && start.isBefore(end)) {

                            while (!start.isSame(end)) {
                                //Se adiciona el minuto para evaluar la "nueva fecha"
                                start.add(1, 'minute');

                                //Se verifica que la fecha sea del número de semana a consultar
                                if (start.isoWeek() + "" === weekNumber) {
                                    weekMinutes++;//Se añade un minuto a la cantidad de minutos trabajado de la presente semana

                                    //Number of week days = [0 (Sunday), 1, 2, 3, 4, 5, 6 (Monday)]
                                    //Se verifica si estamos en un domingo o no
                                    if (start.day() === 0) {//Dia dominical
                                        //Si la cantidad de minutos trabajados por la semana supera las 48h (2880minutes) de la semana, pasará a ser extra
                                        if (weekMinutes > 2880) {//minuto dominical extra
                                            sundayExtraMinutes++;
                                        } else {//Minuto dominical
                                            sundayMinutes++;
                                        }
                                    } else {//Dia de semana
                                        //Ahora debo validar si son minutes nocturnos o normales
                                        if (start.hour() >= 7 && start.hour() <= 18) {//Minutos normales 7:00 AM (7) - 8:00 PM (18)
                                            if (weekMinutes > 2880) {//Minutos normales extra
                                                normalExtraMinutes++;
                                            } else {//Minutos normales
                                                normalMinutes++;
                                            }
                                        } else {//Minutos nocturnos 8:00 PM (18) - 7:00 AM (7)
                                            if (weekMinutes > 2880) {//Minutos nocturnos extra
                                                nightExtraMinutes++;
                                            } else {//Minutos normales
                                                nightMinutes++;
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            console.log("object")
                        }

                    }

                    const result = responseModel(false, FOUND_RESOURCE, {
                        endDate,
                        initialDate,
                        "HorasNormales": `${getHoursByMinutes(normalMinutes).hours} hora(s) y ${getHoursByMinutes(normalMinutes).minutes} minuto(s).`,
                        "HorasNocturnas": `${getHoursByMinutes(nightMinutes).hours} hora(s) y ${getHoursByMinutes(nightMinutes).minutes} minuto(s).`,
                        "HorasDominicales": `${getHoursByMinutes(sundayMinutes).hours} hora(s) y ${getHoursByMinutes(sundayMinutes).minutes} minuto(s).`,
                        "HorasNormalesExtra": `${getHoursByMinutes(normalExtraMinutes).hours} hora(s) y ${getHoursByMinutes(normalExtraMinutes).minutes} minuto(s).`,
                        "HorasNocturnasExtra": `${getHoursByMinutes(nightExtraMinutes).hours} hora(s) y ${getHoursByMinutes(nightExtraMinutes).minutes} minuto(s).`,
                        "HorasDominicalesExtra": `${getHoursByMinutes(sundayExtraMinutes).hours} hora(s) y ${getHoursByMinutes(sundayExtraMinutes).minutes} minuto(s).`
                    }, null, FOUND_RESOURCE);

                    res.status(status(result.status)).send(result);

                } else {//Error
                    res.status(status(resServices.status)).send(resServices);
                }
            }else{//Error
                serviceTec.mensaje = serviceTec.mensaje + ". EL TÉCNICO QUE BUSCA NO CUENTA CON SERVICIOS.";
                res.status(status(serviceTec.status)).send(serviceTec);
            }

        } else {//Error
            const result = responseModel(true, NO_FOUND_RESOURCE, null, NO_FOUND_RESOURCE, "DEBE ENVIAR EL ID DEL TÉCNICO Y EL NÚMERO DE LA SEMANA A CONSULTAR, VERIFIQUE E INTENTE NUEVAMENTE.");
            res.status(status(result.status)).send(result);
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {
    Handler,
}