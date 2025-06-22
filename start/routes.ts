const AuthController = () => import('#controllers/auth_controller')
const NewsController = () => import('#controllers/news_controller')
const NewsCategoriesController = () => import('#controllers/news_categories_controller')
const KategoriController = () => import('#controllers/http/kategori_controller')
const ProdukController = () => import('#controllers/http/produk_controller')
const SupplierController = () => import('#controllers/http/supplier_controller')
const SalesInventoryController = () => import('#controllers/http/salesinventory_controller')

router.on('/home').renderInertia('home')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Auth Routes
router.get('/register', [AuthController, 'showRegister']).as('auth.register.show')
router.post('/register', [AuthController, 'register']).as('auth.register')
router.get('/login', [AuthController, 'showLogin']).as('auth.login.show')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.post('/logout', [AuthController, 'logout']).as('auth.logout')

// Protected routes
router
  .group(() => {
    router
      .get('/dashboard', async ({ view }) => {
        return view.render('dashboard')
      })
      .as('dashboard')

    // Books routes
    router.resource('news', NewsController)

    // Supplier routes
    router.resource('supplier', SupplierController)

    // Produk routes
    router.resource('produk', ProdukController)

    // Kategori routes
    router.resource('kategori', KategoriController)

    // Book Categories routes
    router.resource('news-categories', NewsCategoriesController)

    router.get('/salesinventory', [SalesInventoryController, 'index']).as('salesinventory')
  })
  .use(middleware.auth())

// Redirect root to login
router.get('/', ({ response }) => {
  return response.redirect('/login')
})


