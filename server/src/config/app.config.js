const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const appConfig = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true
    }));
    app.use(helmet({ crossOriginResourcePolicy: false }));
    app.use(morgan('dev'));
    app.use(cookieParser());
    
    // Static Files
    app.use('/public', express.static(path.join(__dirname, '../../public')));
    app.use('/private', express.static(path.join(__dirname, '../../private')));
};

module.exports = { appConfig };
