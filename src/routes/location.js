
import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {

    // List Location/service
    app.get('/api/locations', verifyToken, (req, res) => {
        models.Location.findAll().then((locations) => {

            res.json({
                locations
            })
        })
    }),
    // REGISTER V
    app.post('/api/locations', verifyToken, (req, res) => {
        // Params
        var Location = req.body

        // Verify if exist into models.locations
        models.Location.findOne({
            attributes: ["description"],
            where: { description: Location.description }
        })
            .then((LocationFound) => {
                if (!LocationFound) {
                    models.Location.create(Location)
                        .then((locations) => {
                            return res.json({ locations, 'code': 1 })
                        })
                        .catch((err) => {
                            return res.json({ 'error': 'Cannot add Location', 'code': 0 })
                        })
                } else {
                    return res.json({ 'error': 'product already exist', 'code': 11 })
                }

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Location', err, 'code': 0 })
            })

       
    })

    // UPDATE Location
    app.put('/api/locations/:id', verifyToken, (req, res) => {

        // Params
        var Location = req.body

        // Verify if exist into models.locations

        models.Location.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((LocationFound2) => {
                LocationFound2.update(Location)
                    .then((locations) => {
                        return res.json({ locations, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update Location', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Location', err, 'code': 0 })
            })

    })

     // Delete Location
     app.delete('/api/locations/:id', verifyToken, (req, res) => {

        // Params
        var Location = { id:req.params.id}

        // Verify if exist into models.locations

        models.Location.findOne({
            attributes: ["id"],
            where: { id: Location.id }
        })
            .then((LocationFound2) => {
                LocationFound2.destroy(Location)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete Location', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Location', err, 'code': 0 })
            })

    })
   }
