import "reflect-metadata";
import "express-async-errors";
import express from "express";
import './database';
import path from "path";
import routes from "./routes";
import {handleErrorMiddleware} from "./middleware";
import session from "express-session";
import passport from "./passport";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(handleErrorMiddleware);

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(routes);

app.listen(3000, () => {
  console.log("Server is running at port http://localhost:3000");
});
