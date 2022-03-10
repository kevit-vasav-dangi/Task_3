//import express from 'express';
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cookieParser = require('cookie-parser')
//import mongoose from 'mongoose';
const mongoose = require('mongoose')
//import Config from './src/environment/index.js';
const Config = require('./src/environment/index.js')
//import dbConnection from './src/databases/mongoDbConnnection.js';
const dbConnection = require('./src/databases/mongoDbConnnection')

class App {
    constructor(routes) {
        this.app = express();
        // this.app.use()
        // this.app.use(express.urlencoded({ extended: true }));
        //this.logg
        this.env = Config.NODE_ENV
        this.port = Config.APP_PORT;

        this.databaseConnection();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log(`=================================`);
        })
    }

    databaseConnection() {
        mongoose.connection.on('connected', () => {
            console.log('🔥 DATABASE - Connected');
        })
        mongoose.connection.on('error', err => {
            console.log(`DATABASE - Error:${err}`);
        })
    }

    initializeRoutes(routes ) {
         routes.forEach(route => {
             this.app.use('/', route.router)
         });
    }
    initializeMiddlewares(){
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded());

    }
}

module.exports = App;

