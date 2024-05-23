import { request, response} from 'express'
import { productModel } from '../models/product.model.js'

export const getProducts = async (req = request, res = response) => {
    try {
        const { limit } = req.query
        const products = await productModel.find().limit(Number(limit))
        const total = await productModel.countDocuments()
        return res.json({ total, products })
    } catch (error) {
        console.log('getProducts -> ', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const getProductById = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const product = productModel.findById(pid)
        if(!product)
            return res.status(404).json({ msg: `The product with id${pid} not found`})
        return res.json({ product })
    } catch (error) {
        console.log('getProductById -> ', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, description, price, thumbnails, code, stock, category, status} = req.body;
        if(!title, !description, !price, !code, !stock, !category)
            return res.status(404).json({ msg: `Fields [title,description,price,code,stock,category] they are mandatory`})
        const product = await productModel.create({title, description, price, thumbnails, code, stock, category, status})
        return res.json({ product })
    } catch (error) {
        console.log('addProduct ->', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params
        const product = await productModel.findByIdAndDelete(pid)
        if(product)
            return res.json({msg:'Removed product', product})
        return res.status(404),json({msg:`Could not delete product with id ${pid}`})
    } catch (error) {
        console.log('deleteProduct ->', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const {_id, ...rest} = req.body
        const product = await productModel.findByIdAndUpdate(pid,{ ...rest },{ new: true })
        if(product)
            return res.json({msg:'Updated product', product})
        return res.status(404),json({msg:`Could not update product with id ${id}`})
    } catch (error) {
        console.log('updateProduct ->', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}