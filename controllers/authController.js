const User = require('../models/User')

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
        res.status(201).json(user)
    }catch(error){
        res.status(400).send('hata oluştu, kullanıcı oluşturulamadı ' + error)
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