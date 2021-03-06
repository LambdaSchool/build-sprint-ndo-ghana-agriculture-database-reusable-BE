const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const secret = require('../data/secret').jwtSecret;
const lastEmployye = require('../data/employeeModel');

module.exports = {
    authenticate, generateToken, validUser
};

function authenticate(req, res, next) {
    const token = req.get('Authorization');

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return res.status(401).json({ error: err });
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(401).json({
            error: 'No token provided, must be set on the Authorization Header',
        });
    }
}
async function lastStaffmember(token) {
    let decodedData = jwt_decode(token);
    try {
        console.log("decodedData", decodedData)
        await lastEmployye.addLastEmployee(decodedData)

    } catch (err) {
        console.log("Inserting failed")
    }
}


function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: "1h",
    }
    return jwt.sign(payload, secret, options)

}

async function validUser(req, res, next) {
    try {
        const userId = req.decoded.subject;
        const urlId = parseInt(req.params.id);
        if (userId !== urlId) {
            res.status(403).json({ error: 'You are not authorized ' })
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occured', err })
    }
}