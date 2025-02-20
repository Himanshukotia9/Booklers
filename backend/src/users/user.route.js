const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET_KEY in environment variables");
}

router.post('/admin', async(req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin || admin.role !== 'admin') {
            return res.status(404).json({ message: "Admin not found!" });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid password!" });
        }
        const token = jwt.sign(
            {id: admin._id, username: admin.username, role: admin.role},
             JWT_SECRET,
             { expiresIn: '1h' }
            );
            return res.status(200).json({
                message: 'Authentication successful',
                token,
                user: {
                    username: admin.username,
                    role: admin.role
                }
            });
    } catch (error) {
        console.error("Failed to login as admin", error);
        return res.status(500).json({message: "Failed to login as admin - Invalid Credentials"})
    }
});

module.exports = router;