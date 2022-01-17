import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dw = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_ENGINE,
		logging: false,
	}
)

export default {
	dw
}