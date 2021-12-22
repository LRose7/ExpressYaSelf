if (process.env.NODE_ENV = 'production') {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const chatsRoute = require('./routes/chats');

// set up express app
const app = express(); 

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()); // Passport middleware
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Passport config
require('./config/passport')(passport);

// multer to upload image files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully.')
    } catch (error) {
        console.log(error);
    }
});

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/chats', chatsRoute);

const connection_string = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

// connect to MongoDB
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connection Established..."))
.catch(error => console.error("MongoDB Connection Failed: ", error.message));