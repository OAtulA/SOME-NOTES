const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors({
    allowedHeaders: "*", allowedMethods: "*", origin: "*"
}));

// app.use(cors({ origin: '*' }));

// app.use(cors({ origin: 'http://localhost:5500', credentials: true }));
app.get('/', (req, res)=>{
    res.send("Yeah connected.")
})

// Connect to MongoDB
let dbURL=  process.env.MONGO_URL ;

const connectDB = async()=>{
    try{
        await mongoose.connect(dbURL);
        console.log('Connected to MongoDB')
    } 
    catch(err){
        console.error('Error connecting to MongoDB', err);
    }
}
connectDB();
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
