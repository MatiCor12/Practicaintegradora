import {dirname} from "path"
import { fileURLToPath } from "url"
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

export default __dirname

export const createHash = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const passHash = bcrypt.hashSync(password, salt)
    return passHash
}

export const isValidPassword = (password, userPassword) => {
    const passValid = bcrypt.compareSync(password, userPassword )
    return passValid
}