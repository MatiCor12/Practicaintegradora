import { Router } from 'express';
import { homeView, realTimeProductsView, productsView, cartIdView, loginView, registerView, login, registerSend, logout} from '../controllers/views.js';
import { admin, auth } from '../middleware/auth.js'
import passport from 'passport';

const router = Router()

router.get('/',homeView)
router.get('/realtimeproducts', [auth, admin] , realTimeProductsView)
router.get('/products', auth, productsView)
router.get('/cart/:cid', auth, cartIdView)
router.get('/login', loginView)
router.post('/login', passport.authenticate('login',{failureRedirect:'/login'}), login)
router.get('/register', registerView)
router.post('/register', passport.authenticate('register',{failureRedirect:'/register'}), registerSend)
router.get('/logout', logout)

router.get('/github', passport.authenticate('github', { scope:['user:email'] }), async (req, res) => { })
router.get('/api/users/github', passport.authenticate('github', { failureRedirect:'/register'}), login)

router.get('/current', [auth], (req, res) => {
    res.render('current', { user: req.session.user });
});

export default router