import {Router} from "express";
import productController from "../controllers/ProductController";

const route = Router();

export function generateProductRoutes(app: Router): void {
    app.use('/products', route);

    route.get("/", productController.listProducts.bind(productController));
    route.get("/add", productController.renderCreationView.bind(productController));
    route.get("/edit", productController.getProductData.bind(productController));

    route.post("/edit", productController.updateProduct.bind(productController));
    route.post("/add", productController.createProduct.bind(productController));
    route.post("/delete", productController.deleteProduct.bind(productController));
}

