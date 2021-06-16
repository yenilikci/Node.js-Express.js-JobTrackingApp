const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

//express uygulaması 
const app = express()

//config
dotenv.config()

//statik dosya çalıştırma middleware
app.use(express.static('public'))

//express json middleware -> req.body kullanımı için
app.use(express.json())

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


app.get('/', (req,res) => {
    res.render('home')
})

app.get('/works', (req,res) => {
    res.render('works')
})

//routerları middleware olarak tanımlama
app.use(authRoutes)