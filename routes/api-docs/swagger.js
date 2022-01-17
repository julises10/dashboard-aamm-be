// Importa libreria de enrutamiento
import routerx from 'express-promise-router'
import swaggerUi from 'swagger-ui-express'
import options from './options.js'
import SIGPER from './paths/SIGPER.js'

// Crea instancia de enrutador
const router = routerx()

const paths = {
	...SIGPER,
}

const specs = {
	openapi: '3.0.0',
	info: {
		version: '1.0',
		title: 'API Funcionarios',
		description: 'API de Recursos compartidos entre aplicaciones Desarrolladas por el Departamento TIC'
	},
	tags: [
		{ name: 'Active Directory' },
	],
}

// Configuración de Swagger
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup({
	...specs,
	paths
}, options));

// Exporta enrutador
export default router