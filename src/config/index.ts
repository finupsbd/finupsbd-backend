import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(process.cwd(), '.env')
})


export const ConfigFile = {
    NODE_ENV: process.env.NODE_ENV,
    post: process.env.PORT, 
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    NODE_MAILER_EMAIL: process.env.NODE_MAILER_EMAIL,
    NODE_MAILER_PASS: process.env.NODE_MAILER_PASS, 
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET, 
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET, 
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD, 
}