import { Request, Response } from "express";

import {ProductService} from "../services/ProductService";
import { UserService } from "../services/UserService";
import {InvoiceService} from "../services/InvoiceService";
import {ClientService} from "../services/ClientService";

class GenericController {
    private productService: ProductService;
    private userService: UserService;
    private invoiceService: InvoiceService;
    private clientService: ClientService;

    constructor() {
        this.productService = new ProductService();
        this.userService = new UserService();
        this.invoiceService = new InvoiceService();
        this.clientService = new ClientService();
    }

    async index(req: Request, res: Response){
        res.render("common-views/index")
    }

    async searchEntity(req: Request, res: Response) {
        let { search } = req.query;
        search = search.toString();

        try {
            const products = await this.productService.search(search);
            const users = await this.userService.search(search);
            const invoices = await this.invoiceService.search(search);
            const clients = await this.clientService.search(search);
            res.render("common-views/search", {
                products,
                users,
                invoices,
                clients,
                search
            });
        } catch (err) {
            res.render("common-views/message", {
                message: `Error al buscar: ${err.message}`
            });
        }
    }

    async renderShop(req: Request, res: Response){
        //busco los productos agregados en el localstorage, los puedo enviar en req
        res.render("common-views/shopping")
    }
}

export default new GenericController()
