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

const User = mongoose.model('user',userSchema)

module.exports = User