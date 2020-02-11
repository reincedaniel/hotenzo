import models from '../models'

module.exports = app => {
    app.get('/api', (req, res) => {

        models.User.findByPk(1).then((users)=>{
            
            res.json({
                users
            })
        })
        
    })
}

/**
 * 
 * "development": {
    "username": "root",
    "password": "1212",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
 */