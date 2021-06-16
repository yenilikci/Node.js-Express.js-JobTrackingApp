const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs')

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

/*mongoose hooks ile kontrol, save işleminden sonra çalıştırılacak callback fonk
userSchema.post('save',function(doc,next){
    console.log('kaydedildikten sonra çalışacak',doc)
    next() //next() işlemi devam ettirmek içindi
})*/

//kaydedilmeden hemen önce çalışacak
userSchema.pre('save',async function(next){ //doc burada gelemez, this trick yaparız
    //console.log('kaydedilmeden önce çalışacak',this) //this ile kaydedilecek veriye erişiriz
    const salt = await bcrypt.genSalt()
    this.parola = await bcrypt.hash(this.parola,salt) //şifrelenecek data , salt
    next()
})

//statik metot , daha sonra authController içerisinde çalıştırılacak, email kayıt, parola eşleşme kontrolü
userSchema.statics.login = async function(email,parola){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(parola,user.parola)
        if(auth){
            return user
        }
        throw Error('parola-hatası')
    }
    throw Error('email-hatası')
}

const User = mongoose.model('user',userSchema)

module.exports = User