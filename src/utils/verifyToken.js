import jwt from 'jsonwebtoken'
import jwtUtil from './jwt.util'
const JWT_SIGN_SECRET = '8ogu4o8g0gg8043gg8g8ulg4go834uug4o303407743g7344380g01'

module.exports = function (req, res, next) {
    const token = req.headers['authorization']
    if(!token) return res.json({ 'error': 'Wrong Token', 'code': 200, 'access': false  })

    const userId = jwtUtil.getUserId(token)

    try {
    
        if (userId < 0)
            return res.json({ 'error': 'Wrong Token', 'code': 200, 'access': false })
        next()
    } catch (err) {
        return res.json({ 'error': 'Wrong Token', 'code': 200, 'access': false  })
    }
}