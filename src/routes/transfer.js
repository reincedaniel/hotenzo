
import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {

    // List Transfer/service
    app.get('/api/transfers', verifyToken, (req, res) => {
        models.Transfer.findAll({include:[{model:models.Order},{model: models.Client}]}).then((transfers) => {
            res.json({
                transfers
            })
        })
    }),
    // REGISTER USER V
    app.post('/api/transfers', verifyToken, (req, res) => {
        // Params
        var Transfer = req.body

        // Verify if exist into models.Transfers
        
        models.Transfer.create(Transfer)
            .then((transfers) => {
                return res.json({ transfers, 'code': 1 })
            })
            .catch((err) => {
                return res.json({ 'error': 'Cannot add Transfer', 'code': 0 })
            })
               

       
    })

    // UPDATE Transfer
    app.put('/api/transfers/:id', verifyToken, (req, res) => {

        // Params
        var Transfer = req.body

        // Verify if exist into models.Transfers

        models.Transfer.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((TransferFound2) => {
                TransferFound2.update(Transfer)
                    .then((transfers) => {
                        return res.json({ transfers, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update Transfer', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Transfer', err, 'code': 0 })
            })

    })

     // Delete Transfer
     app.delete('/api/transfers/:id', verifyToken, (req, res) => {

        // Params
        var Transfer = { id:req.params.id}

        // Verify if exist into models.Transfers

        models.Transfer.findOne({
            attributes: ["id"],
            where: { id: Transfer.id }
        })
            .then((TransferFound2) => {
                TransferFound2.destroy(Transfer)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete Transfer', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Transfer', err, 'code': 0 })
            })

    })
   }
