var moment = require('moment');

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

const getHoursByMinutes = generalMinutes => {
    const divition = generalMinutes / 60;
    const hours = Math.floor(divition);
    const minutes = Math.floor(((divition - hours) * 60));
    return { hours, minutes };
}

// db.service.find({
//     "$or": [
//         {
//             "$and": [
//                 { startDate: { "$gte": new Date("2020-09-07T05:00:00Z") } },
//                 { startDate: { "$lte": new Date("2020-09-13T05:00:00Z") } }
//             ]
//         },
//         {
//             "$and": [
//                 { endDate: { "$gte": new Date("2020-09-07T05:00:00Z") } },
//                 { endDate: { "$lte": new Date("2020-09-13T05:00:00Z") } }
//             ]
//         }
//     ]
// })

// db.service.find({ "$or": [{ "$and": [{ startDate: { "$gte": new Date("2020-09-07T05:00:00Z") } }, { startDate: { "$lte": new Date("2020-09-13T05:00:00Z") } }] }, { "$and": [{ endDate: { "$gte": new Date("2020-09-07T05:00:00Z") } }, { endDate: { "$lte": new Date("2020-09-13T05:00:00Z") } }] }] })

const getCombinations = (weekNumber, year, services) => {

    console.log(moment(new Date("2020-09-15T03:40:00.000Z")))

    //Se consultan los servicios que se encuentren en el rango de las fechas arrojadas del numero de la semana solicitado
    //Buscamos el rango
    const { endDate, initialDate } = getDatesByWeekNumber(weekNumber, year);

    console.log("Week number ", weekNumber)
    console.log("Initial date ", initialDate)
    console.log("End date ", endDate)
    console.log(":::::::::::::::::::::::::::::")

    let servicesList = [];

    //Se filtran los servicios
    //Evaluo que al menos una de las dos fechas de cada servicio (inicial o final), se encuentre en el rango del numero de la semana
    for (let index = 0; index < services.length; index++) {
        const service = services[index];

        //Se obtienen las fechas del servicio en moment y (sin las horas)
        const initialServerDate = moment(service.startDate);
        const endServerDate = moment(service.endDate);

        if ((initialServerDate.isSameOrAfter(initialDate) && initialServerDate.isSameOrBefore(endDate)) ||
            (endServerDate.isSameOrAfter(initialDate) && endServerDate.isSameOrBefore(endDate))) {
            servicesList.push(service);
        }

    }

    //Se recorren los servicios
    for (const service of servicesList) {

        let start = service.startTime;
        let end = service.endTime;
        let minutesCont = 0;
        //48h = 2880min, a partir de 48h de trabajo por los servicios realizados en la semana, se empezará a contabilizar en extra
        let sundayMinutes = 0;
        let sundayExtraMinutes = 0;
        let normalMinutes = 0;
        let normalExtraMinutes = 0;
        let nightMinutes = 0;
        let nightExtraMinutes = 0;

        //Se recorre desde la fecha inicial hasta la final por minuto, para así evaluar cada fecha e indicar a que combinacion pertenece (H. Normal, H. Nocturna, H. Dominical, etc.)
        while (!start.isSame(end)) {
            start.add(1, 'minute');
            //Se verifica que la fecha sea del numero de semana a consultar
            if (start.isoWeek() === weekNumber) {
                // console.log(start);
                minutesCont++;

                //Number of week days = [0 (Sunday), 1, 2, 3, 4, 5, 6 (Monday)]
                //Se verifica si estamos en un domingo o no
                if (start.day() === 0) {//Dia dominical
                    if (minutesCont > 2880) {//minuto dominical extra
                        sundayExtraMinutes++;
                    } else {//Minuto dominical
                        sundayMinutes++;
                    }
                } else {//Dia de semana
                    //Ahora debo validar si son minutes nocturnos o normales
                    if (start.hour() >= 7 && start.hour() <= 18) {//Minutos normales 7:00 AM (7) - 8:00 PM (18)
                        if (minutesCont > 2880) {//Minutos normales extra
                            normalExtraMinutes++;
                        } else {//Minutos normales
                            normalMinutes++;
                        }
                    } else {//Minutos nocturnos 8:00 PM (18) - 7:00 AM (7)
                        if (minutesCont > 2880) {//Minutos nocturnos extra
                            nightExtraMinutes++;
                        } else {//Minutos normales
                            nightMinutes++;
                        }
                    }
                }

            }
        }

        console.log("Servicio #", service.id);
        console.log("Horas de la semana ", getHoursByMinutes(minutesCont))
        console.log("Horas normales ", getHoursByMinutes(normalMinutes))
        console.log("Horas nocturnas ", getHoursByMinutes(nightMinutes))
        console.log("Horas dominicales ", getHoursByMinutes(sundayMinutes))
        console.log("Horas normales extras ", getHoursByMinutes(normalExtraMinutes))
        console.log("Horas nocturnas extras ", getHoursByMinutes(nightExtraMinutes))
        console.log("Horas dominicales extras ", getHoursByMinutes(sundayExtraMinutes))
        console.log("-------------------------------------------------------------------------------------------")
    }
}


const db_example = [
    {
        idTec: 1,
        idSer: 1,
        startDate: moment("2020-09-06T00:00"),
        startTime: moment("2020-09-06T18:00"),
        endDate: moment("2020-09-08T00:00"),
        endTime: moment("2020-09-08T22:40"),
        id: 1
    },
    {
        idTec: 1,
        idSer: 1,
        startDate: moment("2020-09-10T00:00"),
        startTime: moment("2020-09-10T15:11"),
        endDate: moment("2020-09-10T00:00"),
        endTime: moment("2020-09-10T17:00"),
        id: 2
    },
    {
        idTec: 1,
        idSer: 1,
        startDate: moment("2020-09-11T00:00"),
        startTime: moment("2020-09-11T06:25"),
        endDate: moment("2020-09-11T00:00"),
        endTime: moment("2020-09-11T08:13"),
        id: "5f5d846bb58e3117947d6573"
    },
    {
        idTec: 1,
        idSer: 1,
        startDate: moment("2020-09-12T00:00"),
        startTime: moment("2020-09-12T21:00"),
        endDate: moment("2020-09-13T00:00"),
        endTime: moment("2020-09-13T01:10"),
        id: "5f5d8da78d36265c6852264e"
    },
    {
        idTec: 1,
        idSer: 1,
        startDate: moment("2020-09-13T00:00"),
        startTime: moment("2020-09-13T18:00"),
        endDate: moment("2020-09-14T00:00"),
        endTime: moment("2020-09-14T22:40"),
        id: "5f5d8de28d36265c6852264f"
    },
    {
        idTec: 1,
        idSer: 1,
        startDate: moment("2020-09-14T00:00"),
        startTime: moment("2020-09-14T18:00"),
        endDate: moment("2020-09-14T00:00"),
        endTime: moment("2020-09-14T22:40"),
        id: "5f5d8dfe8d36265c68522650"
    },
    {
        idTec: 1,
        idSer: 1,
        startDate: moment("2020-09-06T00:00"),
        startTime: moment("2020-09-06T18:00"),
        endDate: moment("2020-09-14T00:00"),
        endTime: moment("2020-09-14T22:40"),
        id: "5f5d8e528d36265c68522651"
    }
];

getCombinations(37, 2020, db_example);