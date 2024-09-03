import { request, response} from 'express'
import { CartsRepository ,ProductsRepository } from '../repositories/index.js'

export const homeView = async (req = request, res = response) => {
    const limit = 10
    const {payload} = await ProductsRepository.getProducts({limit})
    const user =  req.session.user
    return res.render('home', { productos: payload, title: 'Home', user })
}

export const realTimeProductsView = async (req = request, res = response) => {
    return res.render('realTimeProducts', { title: 'Real time' })
}

export const productsView = async (req = request, res = response) => {
    const result = await ProductsRepository.getProducts({...req.query})
    return res.render('products', { title:'productos', result })
}

export const cartIdView = async (req = request, res = response) => {
    const {cid} = req.params
    const carrito = await CartsRepository.getCartById(cid);
    const user =  req.session.user
    return res.render('cart', {title: 'carrito', carrito, user})
}

export const loginView= async (req = request, res = response) => {
    if(req.session.user)
        return res.redirect('/')
    return res.render('login', {title: 'Login'})
}

export const login= async (req = request, res = response) => {
    if(!req.user)
        return res.redirect('/login')
    req.session.user = {
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
        rol: req.user.rol,
        image: req.user.image
    }
    return res.redirect('/')
}

export const registerView = async (req = request, res = response) => {
    if(req.session.user)
        return res.redirect('/')
    return res.render('register', {title: 'Register'})
}

export const registerSend= async (req = request, res = response) => {
    if(!req.user)
        return res.redirect('/register')
    return res.redirect('/login')
}

export const logout = async (req = request, res = response) => {
    req.session.destroy((err)=> {
        if (err) return res.status(500).send('Error when closing session')
        res.redirect('/login')
    })
}