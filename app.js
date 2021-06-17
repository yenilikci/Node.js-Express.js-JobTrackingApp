const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser =  require('cookie-parser')
const {authControl} = require('./middleware/authMiddleware')

//express uygulaması 
const app = express()

//config
dotenv.config()

//statik dosya çalıştırma middleware
app.use(express.static('public'))

//express json middleware -> req.body kullanımı için
app.use(express.json())

//cookie için middleware kullanımı
app.use(cookieParser())

//view engine ayarları
app.set('view engine','ejs')

//veritabanı bağlantısı
mongoose.connect(process.env.dbURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then((result) => app.listen(process.env.PORT,()=>{
        console.log('db bağlantısı başarılı');
    })) //bağlantı başarılı ise serverı dinle
  .catch((err) => console.log(err)) //hata varsa yazdır

//middeware ile birlikte / get 
app.get('/', authControl, (req,res) => {
    res.render('home')
})

//middeware ile birlikte /works get 
app.get('/works', authControl, (req,res) => {
    res.render('works')
})

//routerları middleware olarak tanımlama
app.use(authRoutes)

/*cookie oluşturma işlemi
app.get('/set-cookies',(req,res) => {
    res.setHeader('Set-Cookie','yeni=true') //expires~max-age -> session
    res.send('Cookie oluştu')
})*/

//cookie parser ile cookie oluşturma
app.get('/set-cookies',(req,res) => {
    res.cookie('yeni',false)
    //opsiyonel ayarlarla cookie oluşturma
    res.cookie('parola','12345',{maxAge:1000*60*60*24,httpOnly:true})
    res.send('cookie oluştu')
})

//cookie çağıralım
app.get('/get-cookies',(req,res) => {
    const cookies = req.cookies
    console.log(cookies.yeni);
    res.json(cookies)
})