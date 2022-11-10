"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserRoutes = void 0;
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var route = (0, express_1.Router)();
function generateUserRoutes(app) {
    app.use('/users', route);
    route.get("/", UserController_1.default.listUsers.bind(UserController_1.default));
    route.get("/add", function (request, response) { return response.render("user-views/add"); });
    route.get("/edit", UserController_1.default.getUserData.bind(UserController_1.default));
    route.post("/edit", UserController_1.default.updateUser.bind(UserController_1.default));
    route.post("/add", UserController_1.default.createUser.bind(UserController_1.default));
    route.post("/delete", UserController_1.default.deleteUser.bind(UserController_1.default));
}
exports.generateUserRoutes = generateUserRoutes;
