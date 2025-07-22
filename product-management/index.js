require("dotenv").config();
const express = require("express");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
const router = require("./routes/client/index.routes");
const routerAdmin = require("./routes/admin/index.routes");
const path = require("path");
const moment = require('moment');

const http = require("http");
const { Server } = require("socket.io");


const systemConfig = require("./config/systems");

const database = require("./config/database");
database.connect();

const app = express();
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;

//flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

//socketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;

//create app Local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
//tiny
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

//Routes
router(app);
routerAdmin(app);

app.get("*",(req,res)=>{
  res.render("client/pages/errors/404", {
    pageTitle: "404 Not Found",
  });
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
