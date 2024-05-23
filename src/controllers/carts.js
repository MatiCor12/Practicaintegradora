import { request, response} from 'express'
import { cartModel } from '../models/cart.model.js'

export const getCartById = async (req = request, res = response) => {
    try{
        const { cid } = req.params
        const carrito =  await cartModel.findById(cid)

        if(carrito)
            return res.json({ carrito })

        return res.status(404).json({msg:`Cart with id ${cid} not found`})
    } catch (error) {
        console.log('getCartById ->', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const createCart = async (req = request, res = response) => {
    try{
        const carrito = await cartModel.create({})
        return res.json({msg:'Cart created', carrito })
    } catch (error) {
        console.log('createCart ->', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const addProductInCart = async (req = request, res = response) => {
    try{
        const { cid, pid } = req.params

        const carrito = await cartModel.findById(cid)

        if(!carrito)
            return res.status(404).json({msg: `Cart with id ${cid} not found`})

        const productoInCart = carrito.products.find(p=> p.id.toSting() === pid)

        if(productoInCart)
            productoInCart.quantity++
        else
        carrito.products.push({id:pid, quantity: 1})

        carrito.save()

        return res.json({msg: 'Updated cart', carrito})
    } catch (error) {
        console.log('addProductInCart ->', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}