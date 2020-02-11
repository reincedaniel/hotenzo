
import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {

    // List client/service
    app.get('/api/clients', verifyToken, (req, res) => {
        models.Client.findAll({include: [models.Order]}).then((clients) => {

            res.json({
                clients
            })
        })
    }),
    // REGISTER USER V
    app.post('/api/clients', verifyToken, (req, res) => {
        // Params
        var client = req.body

        // Verify if exist into models.clients
        // Verify if exist into models.categories
        models.Client.findOne({
            attributes: ["name"],
            where: { name: client.name }
        })
            .then((clientFound) => {
                if (!clientFound) {     
                        models.Client.create(client)
                            .then(clients => clients.update({internal_code:'CLI'+clients.id}).then(d=>{
                                return res.json({ clients, 'code': 1 })
                            }).catch((err)=>{
                                return res.json({ 'error': 'Cannot add clients, error internal code', 'code': 0 })
                            }))
                            .catch((err) => {
                                return res.json({ 'error': 'Cannot add Client', 'code': 0 })
                            })
                        } else {
                            return res.json({ 'error': 'Client already exist', 'code': 11 })
                        }
        
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Unable to verify Client', err, 'code': 0 })
                    })
    })

    // UPDATE client
    app.put('/api/clients/:id', verifyToken, (req, res) => {

        // Params
        var client = req.body

        // Verify if exist into models.clients

        models.Client.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((clientFound2) => {
                clientFound2.update(client)
                    .then((clients) => {
                        return res.json({ clients, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update client', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify client', err, 'code': 0 })
            })

    })

     // Delete client
     app.delete('/api/clients/:id', verifyToken, (req, res) => {

        // Params
        var client = { id:req.params.id}

        // Verify if exist into models.clients

        models.Client.findOne({
            attributes: ["id"],
            where: { id: client.id }
        })
            .then((clientFound2) => {
                clientFound2.destroy(client)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete client', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify client', err, 'code': 0 })
            })

    })
   }
