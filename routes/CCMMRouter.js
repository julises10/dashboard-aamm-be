import routerx from 'express-promise-router'
import CCMMController from '../controllers/CCMMController.js'

const router = routerx()

router.get('/qty-ubicacion', CCMMController.QtyConcesionesUbicacion)
router.get('/qty-estado', CCMMController.QtyConcesionesEstado)
router.get('/qty-usuario', CCMMController.QtyConcesionesUsuario)
router.get('/qty-tipo-solicitud', CCMMController.QtyConcesionesTipoSolicitud)
router.get('/qty-tipo-concesion', CCMMController.QtyConcesionesTipoConcesion)
router.get('/solicitudes-usuario', CCMMController.SolicitudesUsuario)

export default router