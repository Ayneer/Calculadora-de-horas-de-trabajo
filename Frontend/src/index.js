import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import app from 'app';
import configRedux from 'config/redux';

//Css general
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.scss';

//Configuración del store de redux
const store = configRedux();

const renderApp = Component => (
    // Provee el manejo del storage de redux
    <Provider store={store}>
        {/* Nos provee del manejo de rutas */}
        <BrowserRouter>
            {/* Componente principal */}
            <Component />
        </BrowserRouter>
    </Provider>
);

ReactDom.render(renderApp(app), document.getElementById("root"));