import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from 'api';
import reducers from 'reducers';
import { reducer as reduxFormReducer } from 'redux-form';


//Configuración del store de redux
const configRedux = () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        combineReducers({
            ...reducers,
            form: reduxFormReducer
        }),
        composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
    )
}

export default configRedux;