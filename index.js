
/*Creamos un servidor manual

const http = require('http');

const server = http.createServer((req, res) => {
    res.status = 200;
    res.setHeader('Contetnt-type', 'text/plain');
    res.write('Hola mundo con Express');
    res.end();
});

server.listen(3000, () => {
    console.log('Server on port 3000');
});
*/

//Creamos servidor a partir de Express
const express = require('express');
const morgan = require('morgan');
const app = express();

/*
MIDDLEWARES manual

function logger(req, res, next) {
    console.log(`Ruta recibida: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

MIDDLEWARE Llamamos a la función logger que creamos
app.use(logger);
*/

//--SETTINGS------------------------------------------
app.set('appName', 'Tutorial Express');

//Configuramos puerto
app.set('port', 3000);

//Configuramos motor de plantilla
app.set('view engine', 'ejs');


//--MIDDLEWARES------------------------------------------
//Convertimos la información en un objeto json 
app.use(express.json());

app.use(morgan('dev'));

/*
Utilizamos el método "all" de express
Utilizamos un nuevo parámetro "next" 
para que continúe avanzando en la ruta "user"
*/
app.all('/user', (req, res, next) => {
    console.log('Info procesada aqui');
    next();
});

//Método "static" de express public/index.html
//app.use(express.static('public'));

//--ROUTES-----------------------------------------------
app.get('/', (req, res) => {
    const data = [{name: 'Roberto'}, {name: 'Mariana'}, {name: 'Patricia'}];
    res.render('index.ejs', {people: data});
});


//Pedimos info al servidor con la petición GET
app.get('/', (req, res) => {
    res.send('Petición GET recibida');
});

app.get('/user', (req, res) => {
    res.json({
        username: 'Pablo',
        lastname: 'Martinez',
    });
});

/*
Enviamos Info al servido con POST 
Creamos una ruta dinámica /:id
    //req.body obtiene en consola un objeto json
    //req.body = Cuerpo de la petición
    console.log(req.body);

    //req.params obtiene el parametro de la variable "id"
    //req.params = Parámetro de la petición
    console.log(req.params);
    res.send('Petición POST recibida');
});

/*
Petición put para actualizar información ATENCIÓN 
no son comillas simples dentro del paréntsis
*/
app.put('/user/:id', (req, res) => {
    console.log(req.body);
    res.send(`User ${req.params.id} updated`);
});

/*
Usamos la petición "deleted" ATENCIÓN 
no son comillas simples dentro del paréntsis
*/
app.delete('/user/:userId', (req, res) => {
    res.send(`User ${req.params.userId} deleted`);
});

//Puerto configurado en "settings" escuchando 
app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port', app.get('port'));
});