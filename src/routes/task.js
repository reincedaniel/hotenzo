
import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {

    // List Task
    app.get('/api/tasks', verifyToken, (req, res) => {
        models.Task.findAll(
            {include: [models.User]})
            .then((tasks) => {

            res.json({
                tasks
            })
        })
    }),
    // REGISTER tasks
    app.post('/api/tasks', verifyToken, (req, res) => {
        // Params


        // Verify if exist into models.tasks

        models.Task.create(req.body)
            .then((tasks) => {
                return res.json({ tasks, 'code': 1 })
            })
            .catch((err) => {
                return res.json({ 'error': 'Cannot add Task', 'code': 0 })
            })
            

       
    })

    // UPDATE Task
    app.put('/api/tasks/:id', verifyToken, (req, res) => {

        // Params
        var Task = req.body

        // Verify if exist into models.tasks

        models.Task.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((TaskFound2) => {
                TaskFound2.update(Task)
                    .then((tasks) => {
                        return res.json({ tasks, 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update Task', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Task', err, 'code': 0 })
            })

    })

     // Delete Task
     app.delete('/api/tasks/:id', verifyToken, (req, res) => {

        // Params
        var Task = { id:req.params.id}

        // Verify if exist into models.tasks

        models.Task.findOne({
            attributes: ["id"],
            where: { id: Task.id }
        }).then((TaskFound2) => {
                TaskFound2.destroy(Task)
                    return res.json({ 'status':'success', 'code': 1 })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Task', err, 'code': 0 })
            })

    })
   }
