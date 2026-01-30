const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const appConfig = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: 'http://127.0.0.1:5173',
        credentials: true
    }));
    app.use(helmet({ crossOriginResourcePolicy: false }));
    app.use(morgan('dev'));
    app.use(cookieParser());
};

module.exports = { appConfig };
