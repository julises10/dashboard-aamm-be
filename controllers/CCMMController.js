import sequelize from 'sequelize'
import Messages from '../helpers/messages.js'
import sql from '../services/SQLService.js'

export default {
	QtyConcesionesUbicacion: async (req, res) => {
		try {
			const options = { 
				replacements: {}, 
				type: sequelize.QueryTypes.SELECT
			}

			const query = `
				Select dim.region,
							 dim.provincia,
							 dim.comuna,
							 Count( ft.id_solicitud ) As q_concesiones
				From dw.DIM_UBICACION dim

					   Inner Join dw.FT_SOLICITUDES ft
						 On ft.sk_ubicacion = dim.sk_ubicacion

				Where ft.ind_borrador = 'NO'
				Group By dim.region,
								 dim.provincia,
								 dim.comuna
				Having Count( ft.id_solicitud ) > 0
			`

			const data = await sql.dw.query( query, options )

			const regiones = [...new Set( data.map( record => record.region ) )]

			const records = regiones.map( region => ({
				region,
				provincias: [...new Set( 
					data
						.filter( record => record.region === region )
						.map( record => record.provincia )
				)].map( provincia => ({
					provincia,
					comunas: data.filter( record => record.provincia === provincia )
											 .map(record => ({
												 comuna: record.comuna,
												 q_concesiones: record.q_concesiones
											 }))
				}))
			}))
			
			return res.status(200).json(records)
		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: Messages.error500 })
		}
	},
	QtyConcesionesEstado: async (req, res) => {
		try {
			const options = { 
				replacements: {}, 
				type: sequelize.QueryTypes.SELECT
			}

			const query = `
			Select dim.agrupacion,
						 Count( ft.id_solicitud ) As q_concesiones
			From dw.DIM_ESTADO dim
			
					 Inner Join dw.FT_SOLICITUDES ft
					 On ft.sk_estado = dim.sk_estado

			Group By dim.agrupacion
			Having Count( ft.id_solicitud ) > 0
			`

			const data = await sql.dw.query( query, options )

			const record = data.reduce( (obj, item) => {
				obj[item.agrupacion] = item.q_concesiones

				return {...obj}
			}, {} )
			
			return res.status(200).json(record)
		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: Messages.error500 })
		}
	},
	QtyConcesionesUsuario: async (req, res) => {
		try {
			const options = { 
				replacements: {}, 
				type: sequelize.QueryTypes.SELECT
			}

			const query = `
			Select usrs.id_usuario,
						 usrs.nombre,		
						 Count(slct.id_solicitud) As q_concesiones
			From dw.DIM_USUARIO usrs

					 Inner Join dw.FT_SOLICITUDES slct
					 On usrs.sk_usuario = slct.sk_usuario
					
					 Inner Join dw.DIM_ESTADO estd
					 On estd.sk_estado = slct.sk_estado
				
			Where estd.agrupacion = 'EN TRAMITE'
			Group By usrs.id_usuario,
				   	   usrs.nombre
			Having Count(slct.id_solicitud) > 0
			Order By 3 Asc
			`

			const data = await sql.dw.query( query, options )
			
			return res.status(200).json(data)
		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: Messages.error500 })
		}
	},
	QtyConcesionesTipoSolicitud: async (req, res) => {
		try {
			const options = { 
				replacements: {}, 
				type: sequelize.QueryTypes.SELECT
			}

			const query = `
			Select dim.descripcion,
						 Count(ft.id_solicitud) As q_concesiones
			From dw.DIM_TIPO_SOLICITUD dim

					 Inner Join dw.FT_SOLICITUDES ft
					 On ft.sk_tipo_solicitud = dim.sk_tipo_solicitud
				
			Group By dim.descripcion
			Having Count(ft.id_solicitud) > 0
			Order By 2 Desc
			`
			const data = await sql.dw.query( query, options )
			
			return res.status(200).json(data)
		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: Messages.error500 })
		}
	},
	QtyConcesionesTipoConcesion: async (req, res) => {
		try {
			const options = { 
				replacements: {}, 
				type: sequelize.QueryTypes.SELECT
			}

			const query = `
			Select dim.descripcion,
						 Count(ft.id_solicitud) As q_concesiones
			From dw.DIM_TIPO_CONCESION dim

					 Inner Join dw.FT_SOLICITUDES ft
					 On ft.sk_tipo_concesion = dim.sk_tipo_concesion
				
			Group By dim.descripcion
			Having Count(ft.id_solicitud) > 0
			Order By 2 Desc
			`
			const data = await sql.dw.query( query, options )
			
			return res.status(200).json(data)
		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: Messages.error500 })
		}
	},
	SolicitudesUsuario: async (req, res) => {
		try {
			const options = { 
				replacements: { id_usuario: req.query.id_usuario }, 
				type: sequelize.QueryTypes.SELECT
			}

			const query = `
				Select slct.nro_solicitud,
							 tpsl.descripcion As tipo_solicitud,
							 tpcn.descripcion As tipo_concesion,
							 slct.fecha_ingreso,
							 slct.dias_tramite,
							 slct.dias_estado,
							 estd.descripcion	As estado
				From dw.DIM_USUARIO usrs

						Inner Join dw.FT_SOLICITUDES slct
						On usrs.sk_usuario = slct.sk_usuario
						
						Inner Join dw.DIM_ESTADO estd
						On estd.sk_estado = slct.sk_estado
					
						Inner Join dw.DIM_TIPO_SOLICITUD tpsl
						On tpsl.sk_tipo_solicitud = slct.sk_tipo_solicitud
					
						Inner Join dw.DIM_TIPO_CONCESION tpcn
						On tpcn.sk_tipo_concesion = slct.sk_tipo_concesion
					
				Where usrs.id_usuario = :id_usuario
				And estd.agrupacion = 'EN TRAMITE'
				Order By slct.dias_estado
			`
			const data = await sql.dw.query( query, options )
			
			return res.status(200).json(data)
		} catch (error) {
			console.log(error);
			return res.status(500).send({ message: Messages.error500 })
		}
	},
}