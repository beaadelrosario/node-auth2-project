const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("./users/users-router");
const dbConnection = require("./data/db-config");

const server = express();

const sessionConfig = {
  name: "monster",
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
  resave: false,
  saveUnintialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30,
    secure: process.env.USE_SECURE_COOKIES || false,
    httpOnly: true,
  },
  store: new knexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use("/api", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
