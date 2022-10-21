import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { CategoryService } from "../services/CategoryService";

class ProductController {
    private productService: ProductService;
    private categoryService: CategoryService;

    constructor() {
        this.productService = new ProductService();
        this.categoryService = new CategoryService();
    }

    async createProduct(req: Request, res: Response) {
        const { name, description, amount, category } = req.body;
        try {
            await this.productService.create({
                name,
                description,
                amount: parseInt(amount),
                category
            }).then(() => {
                res.render("message", {
                    message: "Producto creado"
                });
            });
        } catch (err) {
            res.render("message", {
                message: `Error al crear el producto: ${err.message}`
            });
        }

    }

    async listProducts(req: Request, res: Response) {
        const products = await this.productService.list()
        return res.render("product-views/product_table", {
            products
        });
    }

    async getProductData(req: Request, res: Response) {
        let { id } = req.query;
        id = id.toString();

        const product = await this.productService.getData(id);
        const categories = await this.categoryService.list();

        return res.render("product-views/edit", {
            product,
            categories
        });
    }

    async updateProduct(req: Request, res: Response) {
        const { id, name, description, amount, category } = req.body;
        try {
            await this.productService.update({ id, name, description, amount, category }).then(() => {
                res.render("message", {
                    message: "Producto actualizado"
                });
            });
        } catch (err) {
            res.render("message", {
                message: `Error al actualizar producto: ${err.message}`
            });
        }

    }

    async deleteProduct(request: Request, res: Response) {
        const { id } = request.body;
        try {
            await this.productService.delete(id).then(() => {
                res.render("message", {
                    message: "Producto eliminado"
                });
            });
        } catch (err) {
            res.render("message", {
                message: `Error al eliminar producto: ${err.message}`
            });
        }
    }

    async renderCreationView(req: Request, res: Response) {
        const categories = await this.categoryService.list();
        res.render("product-views/add", {
            categories
        })
    }
}

export default new ProductController()
