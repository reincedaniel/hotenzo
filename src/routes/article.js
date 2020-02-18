import verifyToken from '../utils/verifyToken'
import models from '../models'


module.exports = app => {
    
    // List Article/service
    app.get('/api/articles',verifyToken,(req, res) => {

        models.Article.findAll({include:[{model: models.Input},{model: models.Provider},{model: models.User}]}).then((articles) => {
            res.json({
                articles
            })
        })
    }),
    // REGISTER Article V
    app.post('/api/articles', (req, res) => {

        // Params
        var Article = req.body.Article


        // Verify if exist into models.articles
/*         models.Article.findOne({
            attributes: ["internal_code"],
            where: { key: Article.internal_code }
        })
            .then((ArticleFound) => {
                if (!ArticleFound) { */
                    /* (articles) => {
                            return res.json({ articles, 'code': 1 })
                        } */
                    models.Article.create(Article)
                        .then(articles => articles.update({internal_code:'ATG'+articles.id}).then(d=>{
                            return res.json({ articles, 'code': 1 })
                        }).catch((err)=>{
                            return res.json({ 'error': 'Cannot add Article, error internal code', 'code': 0 })
                        }))
                        .catch((err) => {
                            return res.json({ 'error': 'Cannot add Article', 'code': 0 })
                        })
/*                 } else {
                    return res.json({ 'error': 'Article already exist', 'code': 11 })
                }

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Article', err, 'code': -1 })
            }) */
    })

    // UPDATE Article
    app.put('/api/articles/:id', (req, res) => {

        // Params
        var Data = req.body

        // Verify if exist into models.articles

        models.Article.findOne({
            attributes: ["id"],
            where: { id: req.params.id }
        })
            .then((ArticleFound2) => {
                ArticleFound2.update(Data.Article)
                    .then((articles) => {

                        return res.json({ articles, 'code': 1 })
 
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Update Article', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Article', err, 'code': 0 })
            })

    })

     // Delete Article
     app.delete('/api/articles/:id',(req, res) => {

        // Params
        var Article = { id:req.params.id}

        // Verify if exist into models.articles

        models.Article.findOne({
            attributes: ["id"],
            where: { id: Article.id }
        })
            .then((ArticleFound2) => {
                ArticleFound2.destroy(Article)
                    .then(() => {
                        return res.json({ 'status':'success', 'code': 1 })
                    })
                    .catch((err) => {
                        return res.json({ 'error': 'Cannot Delete Article', 'code': 0 })
                    })

            })
            .catch((err) => {
                return res.json({ 'error': 'Unable to verify Article', err, 'code': 0 })
            })

    })
   }
