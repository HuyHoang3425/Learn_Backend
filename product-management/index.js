const express = require('express');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
const router = require("./routes/client/index.routes");
const routerAdmin = require("./routes/admin/index.routes");
require('dotenv').config();
const systemConfig = require("./config/systems");

const database = require("./config/database");
database.connect();

const app = express()
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT;

//flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());


app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

//create app Local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Routes
router(app);
routerAdmin(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})