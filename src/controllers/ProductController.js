"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProductService_1 = require("../services/ProductService");
var CategoryService_1 = require("../services/CategoryService");
var ProductController = /** @class */ (function () {
    function ProductController() {
        this.productService = new ProductService_1.ProductService();
        this.categoryService = new CategoryService_1.CategoryService();
    }
    ProductController.prototype.createProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, amount, category, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, description = _a.description, amount = _a.amount, category = _a.category;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productService.create({
                                name: name,
                                description: description,
                                amount: parseInt(amount),
                                category: category
                            }).then(function () {
                                res.render("message", {
                                    message: "Producto creado"
                                });
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        res.render("message", {
                            message: "Error al crear el producto: ".concat(err_1.message)
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.listProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productService.list()];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, res.render("product-views/product_table", {
                                products: products
                            })];
                }
            });
        });
    };
    ProductController.prototype.getProductData = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, product, categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        id = id.toString();
                        return [4 /*yield*/, this.productService.getData(id)];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, this.categoryService.list()];
                    case 2:
                        categories = _a.sent();
                        return [2 /*return*/, res.render("product-views/edit", {
                                product: product,
                                categories: categories
                            })];
                }
            });
        });
    };
    ProductController.prototype.updateProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, description, amount, category, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, name = _a.name, description = _a.description, amount = _a.amount, category = _a.category;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productService.update({ id: id, name: name, description: description, amount: amount, category: category }).then(function () {
                                res.render("message", {
                                    message: "Producto actualizado"
                                });
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        res.render("message", {
                            message: "Error al actualizar producto: ".concat(err_2.message)
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.deleteProduct = function (request, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.body.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productService.delete(id).then(function () {
                                res.render("message", {
                                    message: "Producto eliminado"
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        res.render("message", {
                            message: "Error al eliminar producto: ".concat(err_3.message)
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.renderCreationView = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryService.list()];
                    case 1:
                        categories = _a.sent();
                        res.render("product-views/add", {
                            categories: categories
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports.default = new ProductController();
