import express from 'express'
import consign from 'consign'
import bodyParser from 'body-parser'

const app = express()

//app.options('*', cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')

    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })) */
consign({
    cwd: __dirname
})
    .include('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app)

