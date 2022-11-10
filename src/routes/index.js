"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserRoutes_1 = require("./UserRoutes");
var ProductRoutes_1 = require("./ProductRoutes");
var GenericRoutes_1 = require("./GenericRoutes");
var CategoryRoutes_1 = require("./CategoryRoutes");
var middleware_1 = require("../middleware");
var router = (0, express_1.Router)();
function generateRoutes() {
    router.get("/login", function (req, res) {
        res.render("login.ejs");
    });
    router.use(middleware_1.isAutenticated);
    (0, GenericRoutes_1.generateGenericRoutes)(router);
    (0, UserRoutes_1.generateUserRoutes)(router);
    (0, ProductRoutes_1.generateProductRoutes)(router);
    (0, CategoryRoutes_1.generateCategoryRoutes)(router);
    return router;
}
exports.default = generateRoutes();
