const Work = require('../models/Work')

//iş ekleme view'ini render edecek metot
module.exports.work_add_get = (req, res) => {
    res.render('work-add')
}

//iş ekleme işlemini gerçekleştirecek metot
module.exports.work_add_post = async (req, res) => {
    const {baslik, aciklama, baslama, bitis} = req.body

    try {
        //yeni iş kayıtı
        const work = await Work.create({
            baslik,
            aciklama,
            baslamaZamani: new Date(baslama),
            bitisZamani: new Date(bitis),
            kullaniciId: res.locals.user._id
        })
        res.status(200).json({work: work._id})
    } catch (error) {
        res.status(400).json({error})
    }

}

//işleri listelemek için metot
module.exports.works_get = (req,res) => {
    Work.find({'kullaniciId':res.locals.user._id}).then((result) => {
        res.render('works',{isler:result})
    })
}