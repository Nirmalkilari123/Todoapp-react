const jwt = require('jwt-simple');
const SECRET = 'your_jwt_secret';

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Unauthorized');

    try {
        const decoded = jwt.decode(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).send('Invalid Token');
    }
};

module.exports = auth;
