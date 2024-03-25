import  express  from 'express';
import router from './routes/index.js';
import db from './config/db.js';

 
const app = express();

// conectar la base de datos
db.authenticate()
    .then( () => console.log("base de datos conectada "))
    .catch(error => console.log(error))
 
// Definir puerto
const port = process.env.PORT || 3000; // Variables de entorno

// habilitar pug
app.set('view engine', 'pug')

// obtener el año actual
app.use( (req, res, next) =>{
    const year = new Date();
    res.locals.ActualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes"
    next()

});

// agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));


//definir la carpeta publica
app.use(express.static('public'))

// agregar router
app.use('/', router)


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})