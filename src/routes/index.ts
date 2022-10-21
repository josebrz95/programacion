import {Router} from "express";
import {generateUserRoutes} from "./UserRoutes";
import {generateProductRoutes} from "./ProductRoutes";
import {generateGenericRoutes} from "./GenericRoutes";
import {generateCategoryRoutes} from "./CategoryRoutes";

const router = Router()

function generateRoutes(): Router {

    generateUserRoutes(router);

    generateProductRoutes(router);
    generateGenericRoutes(router);
    generateCategoryRoutes(router);

    return router;
}

export default generateRoutes();
