const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jwt-simple');
const db = require('../db');
const SECRET = 'your_jwt_secret';

exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = uuid.v4();

    db.run(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, 
        [userId, name, email, hashedPassword], 
        function(err) {
            if (err) return res.status(400).send(err.message);
            res.status(201).json({ message: 'User registered successfully' });
        }
    );
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.encode({ id: user.id }, SECRET);
        res.json({ token, userId: user.id, name: user.name, email: user.email });
    });
};

exports.updateProfile = (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.user.id;
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;

    db.run(`UPDATE users SET name = ?, email = ?, password = COALESCE(?, password) WHERE id = ?`, 
        [name, email, hashedPassword, userId],
        function(err) {
            if (err) return res.status(400).send(err.message);
            res.status(200).json({ message: 'Profile updated successfully' });
        }
    );
};
