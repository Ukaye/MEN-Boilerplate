//
// ─── SETUP DEPENDENCIES ─────────────────────────────────────────────────────────
//

import express from "express";
import TripsController from "../controllers/trips.controller";

const { getTrips, getHosts } = new TripsController;
const Router = express.Router();

Router.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'Welcome to trips service!'
    })
});

Router.get('/get', getTrips);

Router.get('/hosts/get', getHosts);

module.exports = Router;