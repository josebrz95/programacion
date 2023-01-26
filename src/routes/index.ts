import {Router} from "express";
import {generateUserRoutes} from "./UserRoutes";
import {generateProductRoutes} from "./ProductRoutes";
import {generateGenericRoutes} from "./GenericRoutes";
import {generateCategoryRoutes} from "./CategoryRoutes";
import {generateAuthenticationRoutes} from "./AuthenticationRoutes";
import {Auth} from "../lib/auth";

const router = Router()

function generateRoutes(): Router {

    generateAuthenticationRoutes(router)

    router.use('', Auth.isLoggedIn)
    generateUserRoutes(router);
    generateProductRoutes(router);
    generateGenericRoutes(router);
    generateCategoryRoutes(router);

    return router;
}

export default generateRoutes();
