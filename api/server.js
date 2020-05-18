const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require('../users/users-router')
const authRouter = require('../auth/auth-router')

const server = expresss()

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', usersRouter)
server.use('/api', authRouter)


modules.exports = server;