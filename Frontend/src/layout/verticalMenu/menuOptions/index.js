import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import MetisMenu from 'react-metismenu';
import CustomLink from './customLink';
import {items as itemList} from './items';

//Componente que ilustra las opciones del menú vertical del aplicativo
const MenuOptions = ({history}) => {
    const [activeLinkTo, setActiveLinkTo] = useState("/");
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (items.length === 0) {
            setItems(itemList);
            setActiveLinkTo(history.location.pathname);
        }
        return () => {}
    }, [items, history]);

    useEffect(() => {
        if(activeLinkTo !== history.location.pathname){
            setActiveLinkTo(history.location.pathname);
        }
        return () => {}
    }, [history.location.pathname, activeLinkTo]);

    return (
        <Fragment>
            <MetisMenu
                content={items}
                activeLinkTo={activeLinkTo}
                LinkComponent={(props) => <CustomLink {...props} activeLinkTo={activeLinkTo} actuaLink={history.location.pathname} />}
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />
        </Fragment>
    )

}

export default withRouter(MenuOptions); 