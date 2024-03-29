import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import routes from "./routes";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import './lib/passport'

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(session({
  secret: 'faztmysqlnodesession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.login_user = req.user;
  next();
});

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(routes);

app.listen(3000, () => {
  console.log("Server is running at port http://localhost:3000");
});
