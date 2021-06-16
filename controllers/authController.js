const User = require('../models/User')
const jwt = require('jsonwebtoken')

//valid hatalarını yakalayacağımız fonksiyon
const hataYakala = (err) => {

    let errors = {email:'',parola:''}
  
    //err.code bilgisi ile hata yakalama
    if(err.code === 11000){
        errors.email = 'Bu mail adresi daha önce kayıt edilmiş!'
        return errors
    }

    //err.message içerisinde geçen ifadeden hata yakalama
    if(err.message.includes('user validation failed')){
        //hatalar içerisinde dönelim
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
    
} 

const maxAge = 3*24*60*60*100 //3 gün

//token oluşturma işlemi
const createToken = (id) => {
    return jwt.sign({id},'yenilikci',{expiresIn:maxAge}) //payload, secret key, kaç gün
}

//signup get işlemi için controller
module.exports.signup_get = (req,res) => {
    res.render('signup')
}

//login get işlemi için controller
module.exports.login_get = (req,res) => {
    res.render('login')
}

//signup post işlemi için controller
module.exports.signup_post = async (req,res) => {

    //email ve parola yakala
    const {email,parola} = req.body

    //console.log(email,parola)
    try{
        const user = await User.create({email,parola})
        //token
        const token = createToken(user._id)
        //cookie set
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge})
        res.status(201).json(user)
    }catch(error){
        //res.status(400).send('hata oluştu, kullanıcı oluşturulamadı ' + error)
        const errors = hataYakala(error)
        res.status(400).json({errors})
    }
    //res.send('yeni kullanıcı olusturuldu')
}

//login post işlemi için controller
module.exports.login_post = async (req,res) => {
    
    //email ve parola yakala
    const {email,parola} = req.body

    console.log(email,parola)
    res.send('kullanıcı giriş')
    
}