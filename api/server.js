const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');

const usersRouter = require('../users/users-router')
const authRouter = require('../auth/auth-router')

const server = expresss()

const sessionConfig = {
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.env.SECURE_COOKIE || false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name: 'session',
    secret: process.env.COOKIE_SECRET || 'keep this secret'
}

server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', usersRouter, authRouter)
// server.use('/api', authRouter)


modules.exports = server;