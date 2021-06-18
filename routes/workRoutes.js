//route işlemleri için
const {Router} = require('express')
//iş ekleme controller çalıştırmak için
const workController = require('../controllers/workController')
//oturum kontrolleri
const {authControl, userControl} = require('../middleware/authMiddleware')

const router = Router()


//iş ekleme sayfası, oturum kontrolü ile birlikte
router.get('/work-add', authControl, workController.work_add_get)
//iş ekleme işlemi, kullanıcı kontrolü ile birlikte
router.post('/work-add', userControl, workController.work_add_post)

module.exports = router