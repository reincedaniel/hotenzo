
import verifyToken from '../utils/verifyToken'
import models from '../models'

module.exports = app => {

    // List provider/service
    app.get('/api/providers', verifyToken, (req, res) => {
        models.Provider.findAll().then((providers) => {

            res.json({
                providers
            })
        })
    }),
    // REGISTER provider
    app.post('/api/providers', verifyToken, (req, res) => {
        // Params
        var provider = req.body

        // Verify if exist into models.providers
        models.Provider.findOne({
            attributes: ["name"],
            where: { name: provider.name }
        })
            .then((providerFound) => {
                if (!providerFound) {
                    models.Provider.create(provider)
                        .then((providers) => providers.update({internal_code: 'FRNC'+providers.id})
                            .then(g=>{
                                return res.json({ providers, 'code': 1 })
                            })
                            .catch(err=> {return res.json({ 'error': 'Internal Code', 'code': 0 })})
                        )
                        
                        .catch((err) => {
                            return res.json({ 'error': 'Cannot add provider', 'code': 0 })
                        })
                    } else {
                        return res.json({ 'error': 'provider already exist', 'code': 11 })
                    }

                })
        .catch((err) => {
            return res.json({ 'error': 'Unable to verify provider', err, 'code': 0 })
        })

    })

    // UPDATE provider
    app.put('/api/providers/:id', verifyToken, (req, res) => {

        // Params
        var provider = req.body

        // Verify if exist into models.providers

        models.Provider.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((providerFound2) => {
                providerFound2.update(provider)
                    .then((providers) => {
                        return res.json({ providers, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update provider', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify provider', err, 'code': 0 })
            })

    })

     // Delete provider
     app.delete('/api/providers/:id', verifyToken, (req, res) => {

        // Params
        var provider = { id:req.params.id}

        // Verify if exist into models.providers

        models.Provider.findOne({
            attributes: ["id"],
            where: { id: provider.id }
        })
            .then((providerFound2) => {
                providerFound2.destroy(provider)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete provider', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify provider', err, 'code': 0 })
            })

    })
   }
