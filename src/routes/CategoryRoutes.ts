import {Request, Response, Router} from "express";
import CategoryController from "../controllers/CategoryController";

const route = Router();

export function generateCategoryRoutes(app: Router): void {
    app.use('/categories', route);

    route.get("/", CategoryController.listCategories.bind(CategoryController));
    route.get("/add", (request: Request, response: Response) => response.render("category-views/add"));
    route.get("/edit", CategoryController.getCategoryData.bind(CategoryController));

    route.post("/edit", CategoryController.updateCategory.bind(CategoryController));
    route.post("/add", CategoryController.createCategory.bind(CategoryController));
    route.post("/delete", CategoryController.deleteCategory.bind(CategoryController));
}
