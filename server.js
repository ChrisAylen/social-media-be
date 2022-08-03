require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const mongoode = require('mongoose');

mongoose.connect(process.env.DATABASE_URL + 'socialmedia', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json());

// Routes
const userRoutes = require('./routes/api/userRoute');
app.use('/api/users', userRoutes);


app.listen(3000, () => console.log('server is running on port 3000'));


