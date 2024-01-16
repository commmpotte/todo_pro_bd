const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

// Подключение к MongoDB
const dbURI = 'mongodb+srv://admin:admin@qr0.hsoth7y.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Разрешение CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors());


// Использование маршрутов задач
app.use('/api', tasksRoutes);

// Обработка корневого маршрута
app.get('/', (req, res) => {
    res.send('EasyQR Test Task!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});