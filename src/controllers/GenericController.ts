import { Request, Response } from "express";

import {ProductService} from "../services/ProductService";
import { UserService } from "../services/UserService";

class GenericController {
    private productService: ProductService;
    private userService: UserService;

    constructor() {
        this.productService = new ProductService()
        this.userService = new UserService()
    }

    async index(req: Request, res: Response){
        res.render("index")
    }

    async searchEntity(req: Request, res: Response) {
        let { search } = req.query;
        search = search.toString();

        try {
            const products = await this.productService.search(search);
            const users = await this.userService.search(search);
            res.render("search", {
                products,
                users,
                search
            });
        } catch (err) {
            res.render("message", {
                message: `Error al buscar: ${err.message}`
            });
        }
    }
}

export default new GenericController()
