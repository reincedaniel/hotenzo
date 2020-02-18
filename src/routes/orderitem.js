import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {
    
    // List orderitem/service
    app.get('/api/orderitems',verifyToken,(req, res) => {

        models.OrderItem.findAll({include: [{model:models.Article},{model:models.Category},{model: models.Order}]}).then((orderitems) => {
            res.json({
                orderitems
            })
        })
    }),
    // REGISTER USER V
    app.post('/api/orderitems', (req, res) => {

        // Params
        var orderitem = req.body


        // Verify if exist into models.orderitems

        models.OrderItem.create(orderitem)
            .then((orderitems) => {
                return res.json({ orderitems, 'code': 1 })
            })
            .catch((err) => {
                return res.json({ 'error': 'Cannot add orderitem', 'code': 0 })
            })
           
    })

    // UPDATE orderitem
    app.put('/api/orderitems/:id', (req, res) => {

        // Params
        var orderitem = req.body

        // Verify if exist into models.orderitems

        models.OrderItem.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((orderitemFound2) => {
                orderitemFound2.update(orderitem)
                    .then((orderitems) => {
                        return res.json({ orderitems, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update orderitem', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify orderitem', err, 'code': 0 })
            })

    })

     // Delete orderitem
     app.delete('/api/orderitems/:id',(req, res) => {

        // Params
        var orderitem = { id:req.params.id}

        // Verify if exist into models.orderitems

        models.OrderItem.findOne({
            attributes: ["id"],
            where: { id: orderitem.id }
        })
            .then((orderitemFound2) => {
                orderitemFound2.destroy(orderitem)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete orderitem', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify orderitem', err, 'code': 0 })
            })

    })
   }
