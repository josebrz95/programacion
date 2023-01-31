import {NextFunction, Request, Response} from "express";


export const handleErrorMiddleware = (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message,
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
}

export const isAutenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) { return next() }
    return res.redirect("/login")
}



