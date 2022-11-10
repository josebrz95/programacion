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
exports.UserService = void 0;
var User_1 = require("../entities/User");
var typeorm_1 = require("typeorm");
var UserService = /** @class */ (function () {
    function UserService() {
        this.repository = (0, typeorm_1.getRepository)(User_1.User);
    }
    UserService.prototype.create = function (_a) {
        var username = _a.username, email = _a.email, phone = _a.phone, city = _a.city, state = _a.state;
        return __awaiter(this, void 0, void 0, function () {
            var usernameAlreadyExists, emailAlreadyExists;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!username || !email || !phone || !city || !state) {
                            throw new Error("Por favor llena todos los campos");
                        }
                        return [4 /*yield*/, this.repository.findOne({ where: { username: username } })];
                    case 1:
                        usernameAlreadyExists = _b.sent();
                        return [4 /*yield*/, this.repository.findOne({ where: { email: email } })];
                    case 2:
                        emailAlreadyExists = _b.sent();
                        if (emailAlreadyExists || usernameAlreadyExists) {
                            throw new Error("El usuario ya esta registrado");
                        }
                        return [2 /*return*/, this.repository
                                .createQueryBuilder()
                                .insert()
                                .into(User_1.User)
                                .values({ username: username, email: email, phone: phone, city: city, state: state })
                                .execute()];
                }
            });
        });
    };
    UserService.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.find()];
            });
        });
    };
    UserService.prototype.search = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!search) {
                    throw new Error("Por favor complete el campo de búsqueda");
                }
                return [2 /*return*/, this.repository
                        .createQueryBuilder()
                        .where("username like :search", { search: "%".concat(search, "%") })
                        .orWhere("email like :search", { search: "%".concat(search, "%") })
                        .orWhere("phone like :search", { search: "%".concat(search, "%") })
                        .orWhere("city like :search", { search: "%".concat(search, "%") })
                        .orWhere("state like :search", { search: "%".concat(search, "%") })
                        .getMany()];
            });
        });
    };
    UserService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository
                        .createQueryBuilder()
                        .delete()
                        .from(User_1.User)
                        .where("id = :id", { id: id })
                        .execute()];
            });
        });
    };
    UserService.prototype.getData = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.findOne({
                        where: { id: id }
                    })];
            });
        });
    };
    UserService.prototype.update = function (_a) {
        var id = _a.id, username = _a.username, email = _a.email, phone = _a.phone, city = _a.city, state = _a.state;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.repository
                        .createQueryBuilder()
                        .update(User_1.User)
                        .set({ username: username, email: email, phone: phone, city: city, state: state })
                        .where("id = :id", { id: id })
                        .execute()];
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
