import { Request, Response } from "express";
import {CategoryService} from "../services/CategoryService";

class CategoryController {
    private service: CategoryService;

    constructor() {
        this.service = new CategoryService()
    }

    async createCategory(req: Request, res: Response) {
        const { name, products }= req.body;
        try {
            await this.service.create({
                name,
                products
            }).then(() => {
                res.render("message", {
                    message: "Categoria creada"
                });
            });
        } catch (err) {
            res.render("message", {
                message: `Error al crear la categoria: ${err.message}`
            });
        }
    }

    async listCategories(req: Request, res: Response) {
        const categories = await this.service.list()
        return res.render("category-views/category_table", {
            categories
        });
    }

    async getCategoryData(req: Request, res: Response) {
        let { id } = req.query;
        id = id.toString();

        const category = await this.service.getData(id);

        return res.render("category-views/edit", {
            category
        });
    }

    async updateCategory(req: Request, res: Response) {
        const { id, name, products } = req.body;
        try {
            await this.service.update({ id, name, products }).then(() => {
                res.render("message", {
                    message: "Categoria actualizada"
                });
            });
        } catch (err) {
            res.render("message", {
                message: `Error al actualizar categoria: ${err.message}`
            });
        }

    }

    async deleteCategory(request: Request, res: Response) {
        const { id } = request.body;

        try {
            await this.service.delete(id).then(() => {
                res.render("message", {
                    message: "Categoria eliminada"
                });
            });
        } catch (err) {
            res.render("message", {
                message: `Error al eliminar categoria: ${err.message}`
            });
        }
    }
}

export default new CategoryController()
