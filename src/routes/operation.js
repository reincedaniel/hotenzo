
import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {

    // List Operation/service
    app.get('/api/operations', verifyToken, (req, res) => {
        models.Operation.findAll().then((operations) => {

            res.json({
                operations
            })
        })
    }),
    // REGISTER V
    app.post('/api/operations', verifyToken, (req, res) => {
        // Params
        var Operation = req.body

        // Verify if exist into models.operations
        models.Operation.findOne({
            attributes: ["name"],
            where: { name: Operation.name }
        })
            .then((OperationFound) => {
                if (!OperationFound) {
                    models.Operation.create(Operation)
                        .then((operations) => {

                            operations.update({internal_code: 'OPE'+operations.id})
                            .then(f=>{
                                return res.json({ operations, 'code': 1 })
                            })
                            .catch((err) => {
                                return res.json({ 'error': 'Cannot add Operation', 'code': 0 })
                            })
                        })
                        .catch((err) => {
                            return res.json({ 'error': 'Cannot add Operation', 'code': 0 })
                        })
                } else {
                    return res.json({ 'error': 'product already exist', 'code': 11 })
                }

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Operation', err, 'code': 0 })
            })

       
    })

    // UPDATE Operation
    app.put('/api/operations/:id', verifyToken, (req, res) => {

        // Params
        var Operation = req.body

        // Verify if exist into models.operations

        models.Operation.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((OperationFound2) => {
                OperationFound2.update(Operation)
                    .then((operations) => {
                        return res.json({ operations, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update Operation', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Operation', err, 'code': 0 })
            })

    })

     // Delete Operation
     app.delete('/api/operations/:id', verifyToken, (req, res) => {

        // Params
        var Operation = { id:req.params.id}

        // Verify if exist into models.operations

        models.Operation.findOne({
            attributes: ["id"],
            where: { id: Operation.id }
        })
            .then((OperationFound2) => {
                OperationFound2.destroy(Operation)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete Operation', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Operation', err, 'code': 0 })
            })

    })
   }
