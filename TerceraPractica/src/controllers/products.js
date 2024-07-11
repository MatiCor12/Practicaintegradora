import { request, response} from 'express'
import { ProductsRepository } from '../repositories/index.js';

export const getProducts = async (req = request, res = response) => {
    try {
        //const result = await getProductsModerate({...req.query})
        const result = await ProductsRepository.getProducts({ ...req.query })
        return res.json({ result })
    } catch (error) {
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const getProductById = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        //const product = await getProductByIdModerate(pid)
        const product = await ProductsRepository.getProductById(pid)
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
        const { title, description, price, code, stock, category} = req.body;
        if(!title, !description, !price, !code, !stock, !category)
            return res.status(404).json({ msg: 'Fields [title,description,price,code,stock,category] they are mandatory'})
        const existeCode = await ProductsRepository.getProductByCode(code)
        if(existeCode)
            return res.status(400).json({msg:'El codigo ingresado ya existe en un producto'})
        //const product = await addProductModerate({...req.body})
        const product = await ProductsRepository.addProduct({ ...req.body })
        return res.json({ product })
    } catch (error) {
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const {_id, ...rest} = req.body
        const producto = await ProductsRepository.getProductById(pid)
        if(!producto)
            return res.status(404),json({msg:`El producto con id ${pid} no existe`})
        const product = await ProductsRepository.updateProduct(pid, rest)
        if(product)
            return res.json({msg:'Updated product', product})
        return res.status(404),json({msg:`Could not update product with id ${id}`})
    } catch (error) {
        return res.status(500).json({msg:'Talk to administrator'})
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params
        //const product = await deleteProductModerate(pid)
        const product = await ProductsRepository.deleteProduct(pid)
        if(product)
            return res.json({msg:'Removed product', product})
        return res.status(404),json({msg:`Could not delete product with id ${pid}`})
    } catch (error) {
        console.log('deleteProduct ->', error)
        return res.status(500).json({msg:'Talk to administrator'})
    }
}
