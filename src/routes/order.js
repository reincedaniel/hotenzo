
import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {

    // List order/service
    app.get('/api/orders', verifyToken, (req, res) => {
        models.Order.findAll(
            {include: [models.Client,models.Operation,models.Material, {association: models.Order.OrderItems, include: [models.OrderItem.Article]}]})
            .then((orders) => {

            res.json({
                orders
            })
        })
    }),
    // REGISTER Orders
    app.post('/api/orders', verifyToken, (req, res) => {
        // Params


        // Verify if exist into models.orders

        models.Order.create(req.body, {include: [models.OrderItem]})
            .then((orders) => {
                orders.update({internal_code: "OUT"+orders.id, internal_code_order:"OUTPUT"}).then(e=>{

                    return res.json({ orders, 'code': 1 })
                })
                
                
            })
            .catch((err) => {
                return res.json({ 'error': 'Cannot add order', 'code': 0 })
            })
            

       
    })

    // UPDATE order
    app.put('/api/orders/:id', verifyToken, (req, res) => {

        // Params
        var order = req.body

        // Verify if exist into models.orders

        models.Order.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((orderFound2) => {
                orderFound2.update(order)
                    .then((orders) => {
                        return res.json({ orders, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update order', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify order', err, 'code': 0 })
            })

    })

     // Delete order
     app.delete('/api/orders/:id', verifyToken, (req, res) => {

        // Params
        var order = { id:req.params.id}

        // Verify if exist into models.orders

        models.Order.findOne({
            attributes: ["id"],
            where: { id: order.id }
        }).then((orderFound2) => {
                orderFound2.destroy(order)
                    .then(() => {
                        models.OrderItem.destroy({
                            attributes: ["orderId"],
                            where: { orderId: order.id }
                        }).then(()=>{
                            return res.json({ 'status':'success', 'code': 1 })
                        }) 
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete order', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify order', err, 'code': 0 })
            })

    })
   }
