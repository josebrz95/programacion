import {Router} from "express";
import {generateUserRoutes} from "./UserRoutes";
import {generateProductRoutes} from "./ProductRoutes";
import {generateGenericRoutes} from "./GenericRoutes";
import {generateCategoryRoutes} from "./CategoryRoutes";
import {isAutenticated} from "../middleware";

const router = Router()

function generateRoutes(): Router {
    router.get("/login", (req, res) => {
        res.render("login.ejs")
    })

    router.use(isAutenticated)
    generateGenericRoutes(router);
    generateUserRoutes(router);
    generateProductRoutes(router);
    generateCategoryRoutes(router);

    return router;
}

export default generateRoutes();
