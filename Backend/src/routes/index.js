module.exports = (express, app) => {

    const Service = require('./service')(express);

    app.use('/service', Service);
}