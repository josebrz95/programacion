import { Router } from "express";
import genericController from "../controllers/GenericController";
import passport from "../passport";

const route = Router();

export function generateGenericRoutes(app: Router): void {
    app.use('', route);
    route.post ("/login", passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
    }))
    route.get("/", genericController.index.bind(genericController));
    route.get("/search", genericController.searchEntity.bind(genericController))
    route.get("/shopping", genericController.renderShop.bind(genericController))
}
