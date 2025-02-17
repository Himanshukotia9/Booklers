//index.js
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000;
require('dotenv').config()

//middelware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://booklers.vercel.app"],
    credentials: true
}));

//Routes
const bookRoutes = require('./src/books/book.route')
const orderRoute = require('./src/orders/order.route')
const userRoute = require('./src/users/user.route')
const adminRoute = require('./src/stats/admin.stats')

app.use('/api/books', bookRoutes)
app.use('/api/orders', orderRoute)
app.use('/api/auth', userRoute)
app.use('/api/admin', adminRoute)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Welcome to Booklers Server')
    })
}
main().then(() => console.log('✅ Connected to database')).catch(err => console.error("❌ Database connection error:", err));


app.listen(port, () => {
  console.log(`🚀 Booklers server running on port ${port}`)
})