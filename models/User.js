const mongoose = require('mongoose')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Mail adresini girmeniz zorunludur'], //mongoose validation
        unique:true,
        lowercase:true,
        validate:[isEmail,'Lütfen geçerli bir email adresi giriniz']
    },
    parola:{
        type:String,
        required:[true,'Parolayı girmeniz zorunludur'], //mongoose validation
        minlength:[6,'Minimum 6 karakterlik parola giriniz'] //mongoose validation
    }
})

//mongoose hooks ile kontrol, save işleminden sonra çalıştırılacak callback fonk
userSchema.post('save',function(doc,next){
    console.log('kaydedildikten sonra çalışacak',doc)
    next() //next() işlemi devam ettirmek içindi
})
//kaydedilmeden hemen önce çalışacak
userSchema.pre('save',function(next){ //doc burada gelemez, this trick yaparız
    console.log('kaydedilmeden önce çalışacak',this) //this ile kaydedilecek veriye erişiriz
    next()
})

const User = mongoose.model('user',userSchema)

module.exports = User