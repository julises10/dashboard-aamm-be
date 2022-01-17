// Importa librerías necesarias para la ejecución del API
import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import url from 'url'
import path from 'path'
import router from './routes/index.js'
import dotenv from 'dotenv'
import errorHandler from './middlewares/errorHandler.js'
import helmet from 'helmet'
import device from 'express-device'
import SQLService from './services/SQLService.js'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lee variables de entorno desde archivo .env
dotenv.config()

// Realiza conexión con el motor de base de datos
SQLService.dw.authenticate()
.then(
	() => { console.log('Conexión Establecida con SQL Server: REPORTERIA CCMM') },
	(e) => { console.error('No se ha podido establecer conexión con el servidor SQL Server: ', e) }
)

// Configura CORS e intérprete de peticiones HTTP
const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(device.capture({parseUserAgent: true}))

// Configura middlewares de seguridad
app.use(helmet())
app.disable('x-powered-by')

// Configuraciones generales del servidor
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join( __dirname, 'public')))

app.use('/api', router)
app.set('port', process.env.APP_PORT || 3003)

// Middleware de bad request
app.use(errorHandler.requestError)

// Levanta Servidor ExpressJS
app.listen(app.get('port'), () => {
    console.log(`server running on port ${ app.get('port') }`)
})