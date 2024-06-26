//
// ─── SETUP DEPENDENCIES ─────────────────────────────────────────────────────────
//

import express from "express";
import UserController from "../controllers/user.controller";

const { listUsers } = new UserController;
const Router = express.Router();

Router.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'Welcome to user service!'
    })
});

Router.get('/listAllUsers', listUsers);

module.exports = Router;