const express = require('express');
const cors = require('cors');
const fileupload = require("express-fileupload");

const connectToMongo = require('./db');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo();

// Middlewares
app.use(fileupload({ useTempFiles: true }));
app.use(express.json());
app.use(cors({ origin: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/category', require('./routes/category'));
app.use('/api/subcategory', require('./routes/subcat'));
app.use('/api/product', require('./routes/products'));

// Root route
app.get("/", (req, res) => {
    console.log("App is running");
    res.send("App is running!");
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});