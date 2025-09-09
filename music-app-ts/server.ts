import express, { Request, Response, Express } from "express";

import router from "./routers";
import * as database from "./config/db";
import dotenv from "dotenv";
const port: number = 3000;
const app: Express = express();

dotenv.config();

database.connect();

app.use(express.static(`${__dirname}/public`));
//config pug
app.set("views", `${__dirname}/views`);
app.set("view engine","pug");

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`listen on port ${port}!`);
});
