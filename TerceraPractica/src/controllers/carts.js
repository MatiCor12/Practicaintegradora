import { request, response} from 'express'
import { CartsRepository } from '../repositories/index.js'

export const getCartById = async (req = request, res = response) => {
    try{
        const { cid } = req.params
        //const carrito =  await getCartByIdModerate(cid)
        const carrito =  await CartsRepository.getCartById(cid)
        if(carrito)
            return res.json({ carrito })
        return res.status(404).json({msg:`Cart with id ${cid} not found`})
    } catch (error) {
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const createCart = async (req = request, res = response) => {
    try{
        //const carrito = await createCartModerate()
        const carrito = await CartsRepository.createCart()
        return res.json({ msg:'Cart created', carrito })
    } catch (error) {
        console.log('createCart ->', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const addProductInCart = async (req = request, res = response) => {
    try{
        const { cid, pid } = req.params

        //const carrito = await addProductInCartModerate(cid, pid)
        const carrito = await CartsRepository.addProductInCart(cid, pid)

        if(!carrito)
            return res.status(404).json({msg: `Cart with id ${cid} not found`})

        return res.json({msg: 'Updated cart', carrito})
    } catch (error) {
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const deleteProductsInCart = async (req = request, res = response) => {
    try{
        const {cid, pid} = req.params;
        //const carrito = await deleteProductsInCartModerate(cid, pid)
        const carrito = await CartsRepository.deleteProductsInCart(cid, pid)
        if(!carrito)
            return res.status(404).json({msg: 'Cannot perform deletion'})
        return res.json({msg: 'Product removed from cart', carrito})
    } catch (error) {
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const updateProductsInCart = async (req = request, res = response) => {
    try{
        const {cid, pid} = req.params;
        const {quantity} = req.body;
        if(!quantity || !Number.isInteger(quantity))
            return res.json({msg: 'The quantity property is mandatory and must be an integer'})
        //const carrito = await updateProductsInCartModerate(cid, pid, quantity)
        const carrito = await CartsRepository.updateProductsInCart(cid, pid, quantity)
        if(!carrito)
            return res.status(404).json({msg: 'I cannot update the product'})
        return res.json({msg: 'Updated product from cart', carrito})
    } catch (error) {
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const deleteCart = async (req = request, res = response) => {
    try{
        const {cid} = req.params;

        //const carrito = await deleteCartModerate(cid)
        const carrito = await CartsRepository.deleteCart(cid)
        if(!carrito)
            return res.status(404).json({msg: 'Could not delete cart'})
        return res.json({msg: 'Cart deleted', carrito})
    } catch (error) {
        return res.status(500).json({msg:'Talk to administrator'})
    }
}