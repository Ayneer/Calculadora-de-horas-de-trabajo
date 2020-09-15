## IAS APP (Backend)

#### Descripción
Servicio REST encargado de procesar la lógica de negocio para el cálculo de las horas de trabajo. 

## Tech stack

- NodeJs v11.10.0
- express ^4.17.1
- MongoDB v4.0.9
- mongoose ^5.10.5

## Configurar y ejecutar la app

#### Descargar e instalar el proyecto

- Clonar el repositorio
````
git clone https://github.com/Ayneer/Calculadora-de-horas-de-trabajo.git
````
- Ir a la carpeta "Backend"
````
cd Backend
````
- Obtener los cambios mas recientes
````
git checkout master
git pull
````
- Instalar las dependencias
````
npm install
````
- Correr el proyecto
````
npm start
````
- Correr las pruebas
````
npm test
````

#### Preparar ambiente para la base de datos

- Contar con mongoDB local u otro (nube)
- Crear un archivo .env en la raiz del proyecto con los siguientes datos. (Esto si se trabaja con mongoDB local, si utiliza otro, debe llenar la respectiva configuración)
````
MONGO_HOST = localhost
MONGO_PORT = 27017
MONGO_DATABASE = ias-services
MONGO_USER = 
MONGO_PASSWORD = 
MONGO_REPLICASET = 
MONGO_SSL =  
MONGO_AUTH_SOURCE = 
````
- No olvidarse de tener en ejecución la base de datos (Si es local recuerde lo siguiente)
- En una terminal (CMD) inicie mongoDB (Usualmente se ejecuta el siguiente comando)
````
mongod
````