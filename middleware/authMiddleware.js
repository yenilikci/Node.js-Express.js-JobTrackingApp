//user model
const User = require('../models/User')
//token yakalama işlemi
const jwtoken = require('jsonwebtoken')
const authControl = (req,res,next) => {
    const token = req.cookies.jwt //jwt olarak saklamıştık ona erişelim
    //eğer token varsa
    if(token){
        //verify ile bu token'ı açalım
        jwtoken.verify(token,'yenilikci',(err,result) => {
            if(err){
                //hata varsa giriş sayfasına geri yönlendir
                //console.log(err.message)
                res.redirect('/login')
            }else {
                //console.log(result)
                next()
            }
        })
    }else { //token bulunamadıysa
        res.redirect('/login')
    }
}

//kullanıcı kontrolü için yazdığım fonksiyon
const userControl = (req,res,next) => {
    //tokendaki id ile modeli de kullanarak kullanıcı var mı diye bakacağız
    const token = req.cookies.jwt //jwt cookie'sine erişelim
    if(token){
        //cookie'de saklanan token'ı çözümleme
        jwtoken.verify(token,'yenilikci',async (err,result) => {
            if(err){ //hata kontrolü
                //lokal değişken tanımlama, null ata
                res.locals.user = null //user lokal değişkeni
                next() //işlem devam
            } else { //eğer hata almadıysak
                let user = await User.findById(result.id)
                res.locals.user = user //kullanıcı bulunursa local user değişkenine veriyi atadık (user bilgisini)
                next()
            }
        })
    }else { //eğer token yoksa
        res.locals.user = null
        next()
    }

}

module.exports = {authControl,userControl}