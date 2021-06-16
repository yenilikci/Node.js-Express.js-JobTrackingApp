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
    const {email,parola} = req.body
    console.log(email,parola)
    res.send('yeni kullanıcı olusturuldu')
}

//login post işlemi için controller
module.exports.login_post = async (req,res) => {
    const {email,parola} = req.body
    console.log(email,parola)
    res.send('kullanıcı giriş')
}