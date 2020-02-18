
import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {

    // List Input/service
    app.get('/api/inputs', verifyToken, (req, res) => {
        models.Input.findAll({include:[{model:models.Article},{model: models.Provider},{model:models.Order}]}).then((inputs) => {
            res.json({
                inputs
            })
        })
    }),
    // REGISTER USER V
    app.post('/api/inputs', verifyToken, (req, res) => {
        // Params
        var Input = req.body

        // Verify if exist into models.inputs
        
        models.Input.create(Input)
            .then((inputs) => {
                inputs.update({internal_code: "IN"+inputs.id}).then(e=>{
                    models.Article.findOne({
                        where: { id: Input.articleId }
                    })
                        .then((inputsx) => {
                        return res.json({ inputsx, 'code': 1 })
                    })

                })
              
            })
            .catch((err) => {
                return res.json({ 'error': 'Cannot add Input', 'code': 0 })
            })
               

       
    })

    // UPDATE Input
    app.put('/api/inputs/:id', verifyToken, (req, res) => {

        // Params
        var Input = req.body

        // Verify if exist into models.inputs

        models.Input.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((InputFound2) => {
                InputFound2.update(Input)
                    .then((inputs) => {
                        return res.json({ inputs, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update Input', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Input', err, 'code': 0 })
            })

    })

     // Delete Input
     app.delete('/api/inputs/:id', verifyToken, (req, res) => {

        // Params
        var Input = { id:req.params.id}

        // Verify if exist into models.inputs

        models.Input.findOne({
            attributes: ["id"],
            where: { id: Input.id }
        })
            .then((InputFound2) => {
                InputFound2.destroy(Input)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete Input', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Input', err, 'code': 0 })
            })

    })
   }
