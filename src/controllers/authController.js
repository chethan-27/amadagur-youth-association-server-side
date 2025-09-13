const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: "User already exists" });

        const user = await User.create({ name, email, password, avatar });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
