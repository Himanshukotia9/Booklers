const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');

const app = express()

const port = process.env.PORT || 5000;


async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Welcome to Booklers Server')
    })
}
main().then(() => console.log('connected to database')).catch(err => console.log(err));

//Routes


app.listen(port, () => {
  console.log(`Booklers listening on port ${port}`)
})