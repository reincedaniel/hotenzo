import jwt from 'jsonwebtoken'
const JWT_SIGN_SECRET = '8ogu4o8g0gg8043gg8g8ulg4go834uug4o303407743g7344380g01'
module.exports = {
    generateTokenForUser(userData) {
        return jwt.sign({
            userId: userData.id
        },
        JWT_SIGN_SECRET,
            {
                expiresIn: '5d'
            })
    },

    parseAuthorization(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null
    },
    getUserId(authorization) {
        var userId = -1
        var token = module.exports.parseAuthorization(authorization)
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
                if (jwtToken != null)
                    userId = jwtToken.userId
            } catch (err) {}
        }
        return userId
    },
    destroyToken(authorization) {
        var token = module.exports.parseAuthorization(authorization)
        return jwt.destroy(token)
    }
}