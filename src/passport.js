"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var authUser = function (user, password, done) {
    var authenticated_user = { id: 123, name: "Kyle" };
    return done(null, authenticated_user);
};
exports.authUser = authUser;
passport_1.default.use(new passport_local_1.Strategy(exports.authUser));
passport_1.default.serializeUser(function (userObj, done) {
    done(null, userObj);
});
passport_1.default.deserializeUser(function (userObj, done) {
    done(null, userObj);
});
exports.default = passport_1.default;
