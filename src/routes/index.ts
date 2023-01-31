import {Router} from "express";
import {generateUserRoutes} from "./UserRoutes";
import {generateProductRoutes} from "./ProductRoutes";
import {generateGenericRoutes} from "./GenericRoutes";
import {generateCategoryRoutes} from "./CategoryRoutes";
import {generateAuthenticationRoutes} from "./AuthenticationRoutes";
import {generateInvoiceRoutes} from "./InvoiceRoutes";
import {generateClientRoutes} from "./ClientRoutes";
import {Auth} from "../lib/auth";

const router = Router()

function generateRoutes(): Router {

    generateAuthenticationRoutes(router)

    router.use('', Auth.isLoggedIn)
    generateUserRoutes(router);
    generateProductRoutes(router);
    generateGenericRoutes(router);
    generateCategoryRoutes(router);
    generateInvoiceRoutes(router);
    generateClientRoutes(router);

    return router;
}

export default generateRoutes();
