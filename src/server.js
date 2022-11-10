"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("express-async-errors");
var express_1 = __importDefault(require("express"));
require("./database");
var path_1 = __importDefault(require("path"));
var routes_1 = __importDefault(require("./routes"));
var middleware_1 = require("./middleware");
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("./passport"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(middleware_1.handleErrorMiddleware);
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.use(routes_1.default);
app.listen(3000, function () {
    console.log("Server is running at port http://localhost:3000");
});
