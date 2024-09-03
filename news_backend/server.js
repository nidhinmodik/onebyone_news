const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const db_connect = require('./utils/db');

dotenv.config();

// Set up CORS
if (process.env.mode === 'production') {
    app.use(cors({
        origin: ["http://user.onebyonenews.com", "http://onebyonenews.com", "http://admin.onebyonenews.com"], // Allow both origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: [
            Origin,
            Content - Type,
            Accept,
            Authorization,
            X - Request - With,
        ],
    }));
} else {
    app.use(cors({
        origin: ["http://localhost:5173", "http://localhost:3000", "http://user.onebyonenews.com", "http://onebyonenews.com", "http://admin.onebyonenews.com"], // Allow both origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: [
            Origin,
            Content - Type,
            Accept,
            Authorization,
            X - Request - With,
        ],
    }));
}


// Set up body parsing middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies


// Define routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/newsRoutes'));
app.use('/', require('./routes/adRoutes'));
app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
const port = process.env.port || 5000; // Use a default port if not defined in .env
db_connect();
app.listen(port, () => console.log(`Server is running on port ${port}!`));

