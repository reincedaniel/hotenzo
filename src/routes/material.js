import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {
    
    // List Material/service
    app.get('/api/materials',verifyToken,(req, res) => {
/*         {include:[{model: models.Category},{model: models.User}]} */

        models.Material.findAll({include:[{model: models.User}]}).then((materials) => {
            res.json({
                materials
            })
        })
    }),
    // REGISTER Material V
    app.post('/api/materials', (req, res) => {

        // Params
        var Material = req.body


        // Verify if exist into models.materials
/*         models.Material.findOne({
            attributes: ["internal_code"],
            where: { key: Material.internal_code }
        })
            .then((MaterialFound) => {
                if (!MaterialFound) { */
                    /* (materials) => {
                            return res.json({ materials, 'code': 1 })
                        } */
                    models.Material.create(Material)
                        .then(materials => materials.update({internal_code:'EQP'+materials.id}).then(d=>{
                            return res.json({ materials, 'code': 1 })
                        }).catch((err)=>{
                            return res.json({ 'error': 'Cannot add Material, error internal code', 'code': 0 })
                        }))
                        .catch((err) => {
                            return res.json({ 'error': 'Cannot add Material', 'code': 0 })
                        })
/*                 } else {
                    return res.json({ 'error': 'Material already exist', 'code': 11 })
                }

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Material', err, 'code': -1 })
            }) */
    })

    // UPDATE Material
    app.put('/api/materials/:id', (req, res) => {

        // Params
        var Material = req.body

        // Verify if exist into models.materials

        models.Material.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((MaterialFound2) => {
                MaterialFound2.update(Material)
                    .then((materials) => {
                        return res.json({ materials, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update Material', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Material', err, 'code': 0 })
            })

    })

     // Delete Material
     app.delete('/api/materials/:id',(req, res) => {

        // Params
        var Material = { id:req.params.id}

        // Verify if exist into models.materials

        models.Material.findOne({
            attributes: ["id"],
            where: { id: Material.id }
        })
            .then((MaterialFound2) => {
                MaterialFound2.destroy(Material)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete Material', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Material', err, 'code': 0 })
            })

    })
   }
