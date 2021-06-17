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

module.exports = {authControl}