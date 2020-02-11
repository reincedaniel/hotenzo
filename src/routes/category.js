
import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {

    // List category/service
    app.get('/api/categories', verifyToken, (req, res) => {
        models.Category.findAll().then((categories) => {

            res.json({
                categories
            })
        })
    }),
    // REGISTER USER V
    app.post('/api/categories', verifyToken, (req, res) => {
        // Params
        var category = req.body

        // Verify if exist into models.categories
        models.Category.findOne({
            attributes: ["name"],
            where: { name: category.name }
        })
            .then((categoryFound) => {
                if (!categoryFound) {
                    models.Category.create(category)
                        .then((categories) => {
                            return res.json({ categories, 'code': 1 })
                        })
                        .catch((err) => {
                            return res.json({ 'error': 'Cannot add category', 'code': 0 })
                        })
                } else {
                    return res.json({ 'error': 'product already exist', 'code': 11 })
                }

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify category', err, 'code': 0 })
            })

       
    })

    // UPDATE category
    app.put('/api/categories/:id', verifyToken, (req, res) => {

        // Params
        var category = req.body

        // Verify if exist into models.categories

        models.Category.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((categoryFound2) => {
                categoryFound2.update(category)
                    .then((categories) => {
                        return res.json({ categories, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update category', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify category', err, 'code': 0 })
            })

    })

     // Delete category
     app.delete('/api/categories/:id', verifyToken, (req, res) => {

        // Params
        var category = { id:req.params.id}

        // Verify if exist into models.categories

        models.Category.findOne({
            attributes: ["id"],
            where: { id: category.id }
        })
            .then((categoryFound2) => {
                categoryFound2.destroy(category)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete category', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify category', err, 'code': 0 })
            })

    })
   }
