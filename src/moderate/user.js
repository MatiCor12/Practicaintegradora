import { userModel } from "../models/users.js"

export const getUserById =  async (id) =>{
    try{
        return await userModel.findById(id)
    } catch (error) {
        console.log('getUserById ->', error)
        throw error
    }
}

export const getUser =  async (email) =>{
    try{
        return await userModel.findOne({ email })
    } catch (error) {
        console.log('getUser ->', error)
        throw error
    }
}

export const registerUser =  async (user) =>{
    try{
        return await userModel.create({ ...user })
    } catch (error) {
        console.log('registerUser ->', error)
        throw error
    }
}