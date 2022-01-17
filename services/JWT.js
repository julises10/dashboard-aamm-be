import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import ad from './ADService.js'

const secret = '#AP14uth.,'

export default {
	/**
	 * Recibe un usuario y retorna el token JWT para la autenticación
	 * mediante arquitectura REST
	 * 
	 * @param {number} usuario nombre de usuario de dominio
	 * @returns token JWT
	 */
	encode: async ({usuario}) => {
		return await jwt.sign(
			{ usuario },
			secret,
			{ expiresIn: '1d' }
		)
	},

	/**
	 * Recibe un token JWT y verifica si este es o no válido
	 * para acceder a la infromación del usuario logueado
	 * 
	 * @param {string} token token JWT
	 * @returns objeto de usuario en caso de ser un token válido, 
	 * false en caso contrario
	 */
	decode: async (token) => {
		try {
			const { usuario } = await jwt.verify(token, secret)

			ad.findUser( 
				usuario,
				(err, user) => {
					
					if (!err && user) {
						const { sAMAccountName, mail, displayName, dn } = user
						const dnData = dn.split(',').map( k => k.split('=')[1] )

						return {
							usuario: sAMAccountName,
							email: mail,
							nombre: displayName.toUpperCase(),
							ubicacion: {
								division: dnData[3].toUpperCase(),
								departamento: dnData[2].toUpperCase(),
								seccion: dnData[1].toUpperCase(),
							}
						}

					} else {
						return false;
					}
				}
			)
			
		} catch (error) {
			return false;
		}
	}
}