"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCategoryRoutes = void 0;
var express_1 = require("express");
var CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
var route = (0, express_1.Router)();
function generateCategoryRoutes(app) {
    app.use('/categories', route);
    route.get("/", CategoryController_1.default.listCategories.bind(CategoryController_1.default));
    route.get("/add", function (request, response) { return response.render("category-views/add"); });
    route.get("/edit", CategoryController_1.default.getCategoryData.bind(CategoryController_1.default));
    route.post("/edit", CategoryController_1.default.updateCategory.bind(CategoryController_1.default));
    route.post("/add", CategoryController_1.default.createCategory.bind(CategoryController_1.default));
    route.post("/delete", CategoryController_1.default.deleteCategory.bind(CategoryController_1.default));
}
exports.generateCategoryRoutes = generateCategoryRoutes;
