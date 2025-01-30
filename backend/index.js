//index.js
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000;

//middelware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

//Routes
const bookRoutes = require('./src/books/book.route')
const orderRoute = require('./src/orders/order.route')

app.use('/api/books', bookRoutes)
app.use('/api/orders', orderRoute)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Welcome to Booklers Server')
    })
}
main().then(() => console.log('connected to database')).catch(err => console.log(err));


app.listen(port, () => {
  console.log(`Booklers listening on port ${port}`)
})