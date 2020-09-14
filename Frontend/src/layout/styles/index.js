import { makeStyles } from "@material-ui/core";

export const useStayles = makeStyles(theme => ({
    toolbar: {//Permite acomodar el contenido debajo del menú vetical de forma correcta
        ...theme.mixins.toolbar
    },
}))