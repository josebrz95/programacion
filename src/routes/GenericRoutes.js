"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGenericRoutes = void 0;
var express_1 = require("express");
var GenericController_1 = __importDefault(require("../controllers/GenericController"));
var passport_1 = __importDefault(require("../passport"));
var route = (0, express_1.Router)();
function generateGenericRoutes(app) {
    app.use('', route);
    route.post("/login", passport_1.default.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
    }));
    route.get("/", GenericController_1.default.index.bind(GenericController_1.default));
    route.get("/search", GenericController_1.default.searchEntity.bind(GenericController_1.default));
}
exports.generateGenericRoutes = generateGenericRoutes;
