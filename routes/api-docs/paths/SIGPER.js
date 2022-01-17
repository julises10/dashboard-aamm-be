import httpErrors from '../httpErrors.js'
import apiKeySpec from '../apikey.js'

export default {
	'/funcionarios/find-by-rut': {
		get: {
			tags: ['SIGPER'],
			summary: 'Retorna datos de un funcionario en específico',
			description: `
			Dado un RUT más su Dígito Verificador, devuelve la información asociada a un funcionario de la institución
			`,
			produces: ['application/json'],
			consumes: ['application/json'],
			parameters: [
				//apiKeySpec,	
				{ 
					in: 'query', 
					name: 'rut', 
					type: 'number', 
					description: 'RUT del funcionario',
					required: true,
					example: 15248963
				},
				{ 
					in: 'query', 
					name: 'dv', 
					type: 'string', 
					description: 'Dígito Verificador',
					required: true,
					example: '8'
				},
			],
			responses: {
				200: {
					description: 'Datos del funcionario',
					content: {
						'application/json': {
							schema: {
								properties: {
									rut: {
										type: 'number',
										example: 15248963
									},
									dv: {
										type: 'string',
										example: "8"
									},
									nombres: {
										type: 'string',
										example: "PEDRO PABLO"
									},
									apellido_paterno: {
										type: 'string',
										example: "PEREZ"
									},
									apellido_materno: {
										type: 'string',
										example: "PEREIRA"
									},
									email: {
										type: 'string',
										example: "ppereira@defensa.cl"
									},
									fecha_nacimiento: {
										type: 'string',
										example: "1988-08-14"
									},
									edad: {
										type: 'number',
										example: 39
									},
									genero: {
										type: 'string',
										example: "Masculino"
									},
									division: {
										type: 'string',
										example: "DIVISION ADMIN."
									},
									dependencia: {
										type: 'string',
										example: "DEPTO. TECNOLOGÍA DE LA INFORMACIÓN Y COMUNICACIONES"
									},
									calidad_juridica: {
										type: 'string',
										example: "TITULAR"
									},
									escalafon: {
										type: 'string',
										example: "ADMINISTRATIVO"
									},
									grado: {
										type: 'string',
										example: "15"
									},
									usuario_ad: {
										type: 'string',
										example: "ppereira"
									},
									estado_laboral: {
										type: 'string',
										example: "Activo"
									},
									jefatura: {
										type: 'object',
										properties: {
											rut: {
												type: 'number',
												example: 15248963
											},
											dv: {
												type: 'string',
												example: "8"
											},
											nombres: {
												type: 'string',
												example: "PEDRO PABLO"
											},
											apellido_paterno: {
												type: 'string',
												example: "PEREZ"
											},
											apellido_materno: {
												type: 'string',
												example: "PEREIRA"
											},
										}
									}
								}
							}
						}
					},
				},
				...httpErrors
			}
		}
	},
	'/funcionarios/birthdates': {
		get: {
			tags: ['SIGPER'],
			summary: 'Retorna los funcionarios que cumplen año el mes actual',
			description: `
			Retorna los funcionarios activos en sistema que cumplen año el mes actual ordenados por su día de nacimiento
			`,
			produces: ['application/json'],
			consumes: ['application/json'],
			parameters: [],
			responses: {
				200: {
					description: 'Funcionarios',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									properties: {
										nombres: {
											type: 'string',
											example: "PEDRO PABLO"
										},
										apellido_paterno: {
											type: 'string',
											example: "PEREZ"
										},
										apellido_materno: {
											type: 'string',
											example: "PEREIRA"
										},
										fecha_nacimiento: {
											type: 'string',
											example: "14/05/1985"
										},
										division: {
											type: 'string',
											example: "DIVISION ADMIN."
										},
										dependencia: {
											type: 'string',
											example: "DEPTO. TECNOLOGÍA DE LA INFORMACIÓN Y COMUNICACIONES"
										},
										
									}
								}
							}
						}
					},
				},
				...httpErrors
			}
		}
	},
	'/funcionarios/escalafones': {
		get: {
			tags: ['SIGPER'],
			summary: 'Retorna los escalafones disponibles en sistema',
			description: `
			Retorna los escalafones disponibles en sistema que contengan funcionarios activos en la plataforma
			`,
			produces: ['application/json'],
			consumes: ['application/json'],
			parameters: [],
			responses: {
				200: {
					description: 'Escalafones',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									properties: {
										escalafon: {
											type: 'string',
											example: "ADMINISTRATIVO"
										},									
									}
								}
							}
						}
					},
				},
				...httpErrors
			}
		}
	},
	'/funcionarios/active-employees': {
		get: {
			tags: ['SIGPER'],
			summary: 'Retorna los funcionario activos en SIGPER',
			description: `
			Retorna los funcionario activos en SIGPER
			`,
			produces: ['application/json'],
			consumes: ['application/json'],
			parameters: [],
			responses: {
				200: {
					description: 'Listado de funcionarios',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									properties: {
										rut: {
											type: 'number',
											example: 15248963
										},
										dv: {
											type: 'string',
											example: "8"
										},
										nombres: {
											type: 'string',
											example: "PEDRO PABLO"
										},
										apellido_paterno: {
											type: 'string',
											example: "PEREZ"
										},
										apellido_materno: {
											type: 'string',
											example: "PEREIRA"
										},
										email: {
											type: 'string',
											example: "ppereira@defensa.cl"
										},
										division: {
											type: 'string',
											example: "DIVISION ADMIN."
										},
										dependencia: {
											type: 'string',
											example: "DEPTO. TECNOLOGÍA DE LA INFORMACIÓN Y COMUNICACIONES"
										},
										calidad_juridica: {
											type: 'string',
											example: "TITULAR"
										},
										escalafon: {
											type: 'string',
											example: "ADMINISTRATIVO"
										},
										grado: {
											type: 'string',
											example: "15"
										},
										usuario_ad: {
											type: 'string',
											example: "ppereira"
										}
									}
								}
							}
						}
					},
				},
				...httpErrors
			}
		}
	},
}