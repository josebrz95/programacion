import { Router } from "express";
import genericController from "../controllers/GenericController";

const route = Router();

export function generateGenericRoutes(app: Router): void {
    app.use('', route);
    route.get("/", genericController.index.bind(genericController));
    route.get("/search", genericController.searchEntity.bind(genericController))
}
