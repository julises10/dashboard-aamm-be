import models from '../models/index.js'
import Messages from '../helpers/messages.js'
import geoip from 'geoip-lite'
import mongoose from 'mongoose'

export default {
	verifyKey: async (req, res, next) => {
		try {
			if (!req.headers.apikey){
				return res.status(404).send({ message: Messages.error404 })
			}
	
			let sistema = null

			const sistemas = await models.Sistema.find( {} , { _id: 1 })
			
			const sistemaRegistrado = sistemas.some(s => s._id.equals(req.headers.apikey))
			if (sistemaRegistrado) {
				sistema = await models.Sistema.findById(req.headers.apikey)
			}
			
			const geo = geoip.lookup(req.ip)

			let comments = ''
			if (!sistema) {
				comments = 'API Key es inválida'
			} else if (!sistema.status) {
				comments = 'El sistema se encuentra inactivo'
			} else if (!sistema.accesos.includes(req.url)) {
				comments = 'El sistema no tiene permisos para acceder a esta ruta'
			} else {
				comments = 'Petición Ok'
			}
			
			await models.APIRequest.create({
				sistema: sistemaRegistrado ? req.headers.apikey : null,
				endpoint: req.url,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
				device_type: req.device.type,
				device_name: req.device.name,
				os: req.device.parser.useragent.os.family,
				browser: req.headers["user-agent"],
				country: geo ? geo.country : 'unkwown',
				region: geo ? geo.region : 'unkwown',
				success: (sistema || false) && sistema.status && sistema.accesos.includes(req.url),
				comments
			})
	
			if ( sistema && sistema.status && sistema.accesos.includes(req.url) ) {
				next()
			} else {
				return res.status(403).send({ message: Messages.error403 })
			}
		} catch (error) {
			return res.status(500).send({ message: Messages.error500, error: error.stack })
		}
	},
}