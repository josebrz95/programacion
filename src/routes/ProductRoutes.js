"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductRoutes = void 0;
var express_1 = require("express");
var ProductController_1 = __importDefault(require("../controllers/ProductController"));
var route = (0, express_1.Router)();
function generateProductRoutes(app) {
    app.use('/products', route);
    route.get("/", ProductController_1.default.listProducts.bind(ProductController_1.default));
    route.get("/add", ProductController_1.default.renderCreationView.bind(ProductController_1.default));
    route.get("/edit", ProductController_1.default.getProductData.bind(ProductController_1.default));
    route.post("/edit", ProductController_1.default.updateProduct.bind(ProductController_1.default));
    route.post("/add", ProductController_1.default.createProduct.bind(ProductController_1.default));
    route.post("/delete", ProductController_1.default.deleteProduct.bind(ProductController_1.default));
}
exports.generateProductRoutes = generateProductRoutes;
