//route işlemleri için
const {Router} = require('express')
//iş ekleme controller çalıştırmak için
const workController = require('../controllers/workController')
//oturum kontrolleri
const {authControl} = require('../middleware/authMiddleware')

const router = Router()

router.get('/work-add', authControl, workController.work_add_get)

module.exports = router