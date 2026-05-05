const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const appConfig = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Security Middlewares
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: false, // Set to false if using external CDN assets
    }));
    
    app.use(cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                'http://localhost:5173', 
                'http://127.0.0.1:5173',
                'http://localhost:3000'
            ];
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }));

    app.use(morgan('dev'));
    app.use(cookieParser());
    
    // Static Files
    app.use('/public', express.static(path.join(__dirname, '../../public')));
    app.use('/private', express.static(path.join(__dirname, '../../private')));
};

module.exports = { appConfig };
