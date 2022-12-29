const express = require('express')
const dotenv = require('dotenv').config()

const app = express()

app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`))