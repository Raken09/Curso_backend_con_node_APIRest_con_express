const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');


const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.hander')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // middleware, ayuda a parsear los datos que llegan en formato json

const whiteList = ['http://localhost:8080', 'https://myapp.co' ]; // lista blanca de dominios permitidos
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options)); // middleware, ayuda a que se pueda acceder a la api desde otro dominio

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Soy una nueva ruta')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Corriendo en el puerto: " + port);
});

