import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import {InvoiceService} from "../services/InvoiceService";
import {ClientService} from "../services/ClientService";

class InvoiceController {
    private productService: ProductService;
    private invoiceService: InvoiceService;
    private clientService: ClientService;

    constructor() {
        this.productService = new ProductService();
        this.invoiceService = new InvoiceService();
        this.clientService = new ClientService();
    }

    async createInvoice(req: Request, res: Response): Promise<void> {
        try {
            let { products, client, type } = req.body;
            if (!products || !client || !type) {
                throw new Error("Por favor llena todos los campos");
            }
            products = typeof products === 'string' ? [JSON.parse(products)] : products.map(product => JSON.parse(product))
            client = JSON.parse(client)
            await this.invoiceService.create({
                products, client, type
            }).then(() => {
                res.render("common-views/message", {
                    message: "Factura creada"
                });
            });
        } catch (err) {
            console.log(err)
            res.render("common-views/message", {
                message: `Error al crear la factura: ${err.message}`
            });
        }

    }

    async listInvoices(req: Request, res: Response) {
        const invoices = await this.invoiceService.list()
        return res.render("invoice-views/invoice_table", {
            invoices
        });
    }

    async getInvoiceData(req: Request, res: Response) {
        let { register } = req.query;
        const invoice = await this.invoiceService.getData(Number(register));
        return res.render("invoice-views/show", {
            invoice,
        });
    }

    async renderCreationView(req: Request, res: Response) {
        const products = await this.productService.list();
        const clients = await this.clientService.list()
        res.render("invoice-views/add", {
            products,
            clients
        })
    }
}

export default new InvoiceController()
