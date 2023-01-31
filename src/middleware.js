"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAutenticated = exports.handleErrorMiddleware = void 0;
var handleErrorMiddleware = function (err, request, response, next) {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};
exports.handleErrorMiddleware = handleErrorMiddleware;
var isAutenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/login");
};
exports.isAutenticated = isAutenticated;
