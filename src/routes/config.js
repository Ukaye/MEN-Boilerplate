 //
 // ─── SETUP DEPENDENCIES ────────────────────────────────────────────────────────
 //

 import express from "express";
 import swaggerUi from "swagger-ui-express";
 import userRouter from "./user.route";

 const Router = express.Router();
 const swaggerDocument = require("../../swagger.json");


//
// ─── API DOCUMENTATION ──────────────────────────────────────────────────────────
//

Router.use('/api-docs', swaggerUi.serve);
Router.get('/api-docs', swaggerUi.setup(swaggerDocument, { explorer: true }));

 //
 // ─── HANDLES VALID ROUTES ───────────────────────────────────────────────────────
 //

Router.use('/users', userRouter);

Router.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'Welcome to v1.0'
    })
});

 //
 // ─── HANDLES UNEXPECTED ROUTES ──────────────────────────────────────────────────
 //

     
 Router.use((req, res, next) => {
     let error = new error('Invalid resource url');
     error.status = 404;
     next(error);
 })

 Router.use((error, req, res, next) => {
     res.status(error.status || 500).json({
         message: error.message || 'Internal server error'
     });
 })

 export default Router;
