// Importa libreria de enrutamiento
import routerx from 'express-promise-router'

// Importa rutas
import CCMMRouter from './CCMMRouter.js'
import swaggerRouter from './api-docs/swagger.js'

// Crea instancia de enrutador
const router = routerx()

// Enlaza rutas
router.use('/reportes/ccmm', CCMMRouter)
router.use('/docs', swaggerRouter)

// Exporta enrutador
export default router