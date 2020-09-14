import { URL_SERVER } from "config/server";

export const Create = async newService => {

    let response;

    try {
        const res = await fetch(URL_SERVER + '/service', {
            method: 'POST',
            body: JSON.stringify(newService),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });

        response = await res.json();

    } catch (error) {
        console.log(error)
        response.Error = true;
        response.Mensaje = error.message;
    }

    return response;
}