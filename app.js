import express from "express";
import router from "./routes/web.js";
import connectDb from "./db/connectDb.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const PORT = 3000; 

//Connect to mongodb Database. 
connectDb();

// MongoDB Session
const sessionStorage = MongoStore.create({
    mongoUrl: "mongodb://localhost:27017",
    dbName: "Assignment",
    collectionName: "session",
    ttl: 5,
    autoRemove: "native"
})

//session
app.use(session({
    name: "sessionkey",
    secret: "iamkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 },
    store: sessionStorage
}))

app.use(express.urlencoded({ extended: false }));

//set view engine
app.set("view engine", "ejs");

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT} Port.`)
})