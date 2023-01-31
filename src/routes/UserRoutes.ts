import { Router, Request, Response } from "express";
import userController from "../controllers/UserController";
import {Auth} from "../lib/auth";

const route = Router();

export function generateUserRoutes(app: Router): void {
    app.use('/users', route);

    route.get("/", Auth.isLoggedIn, userController.listUsers.bind(userController));
    route.get("/add", (request: Request, response: Response) => response.render("user-views/add"));
    route.get("/edit", userController.getUserData.bind(userController));

    route.post("/edit", userController.updateUser.bind(userController));
    route.post("/add", userController.createUser.bind(userController));
    route.post("/delete", userController.deleteUser.bind(userController));
}

