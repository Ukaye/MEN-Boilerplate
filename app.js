//
// ─── REQUIRE DEPENDENCIES ───────────────────────────────────────────────────────
//
    
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { errors } from "celebrate";
import session from "express-session";
import cookieParser from "cookie-parser";
import userAgent from "useragent";

dotenv.config();
import { Connection } from "./src/config/mongoose";
import routeHandler from "./src/routes/config";
import { fetchData } from "./src/utils/scrape";

//
// ─── INITIALISE APP ─────────────────────────────────────────────────────────────
//
const app = express();
const port = 4000;

//
// ─── HANDLE SESSIONS ────────────────────────────────────────────────────────────
//

app.use(session({
    secret: '12345',
    saveUninitialized: true,
    resave: true
}));

//
// ─── HANDLE COOKIE FOR OTHER MIDDLEWARES ────────────────────────────────────────
//

app.use(cookieParser());

//
// ─── SETUP MIDDLEWARES ──────────────────────────────────────────────────────────
//
app.use(express.json());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors('*'));
app.use(helmet());
app.use(errors());

//
// ─── HANDLE CORS ────────────────────────────────────────────────────────────────
//

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).send('');
    }

    next();
})

// Init Scrape Fetch Data
// fetchData();


//
// ─── SETUP ROUTES ───────────────────────────────────────────────────────────────
//
app.use('/v1', routeHandler);

app.get('/', (req, res) => {
    let agent = userAgent.parse(req.headers['user-agent']).toString();
    console.log(agent);
    return res.send(agent);
})
//
// ─── START APP ──────────────────────────────────────────────────────────────────
//

if(!module.parent) {
    app.listen(port, async() => {
        console.log('app running on port %s', port);
    })
}