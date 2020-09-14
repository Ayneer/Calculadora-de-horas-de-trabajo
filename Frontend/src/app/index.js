import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layout from 'layout';
import { APP } from 'layout/verticalMenu/menuOptions/routes';
import { ToastContainer } from 'react-toastify';

//Componente encargado de controlar el acceso hacia la interfaz principal del aplicativo, validando la existencia de un usuario/token.
const App = () => {
    return(
        <div>
            <Switch>
                <Route path={APP} component={Layout} />
                <Route path="/" render={ () => <Redirect to={APP} /> } />
            </Switch>
            <ToastContainer />
        </div>
    )
}

export default withRouter(App);