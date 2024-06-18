import { Router } from 'express';

import { homeView, realTimeProductsView, productsView, cartIdView, loginView, registerView, loginSend, registerSend, logout} from '../controllers/views.js';
import { admin, auth } from '../middleware/auth.js'
import passport from 'passport';

const router = Router()

router.get('/',homeView)
router.get('/realtimeproducts', [auth, admin] , realTimeProductsView)
router.get('/products', auth, productsView)
router.get('/cart/:cid', auth, cartIdView)
router.get('/login', loginView)
router.post('/login', passport.authenticate('login',{failureRedirect:'/login'}), loginSend)
router.get('/register', registerView)
router.post('/register', passport.authenticate('register',{failureRedirect:'/register'}), registerSend)
router.get('/logout', logout)

export default router