
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        console.log('New user is: ', newUser)        
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log();
    console.log("User trying to login is: ");
    console.log();
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Here, you might consider using sessions or generating tokens for authentication
        // For simplicity, sending a success message for now
        // res.header('Access-Control-Allow-Origin', "http://localhost:5500"); 
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
