import {Request, Response, Router} from "express";
import invoiceController from "../controllers/InvoiceController";

const route = Router();

export function generateInvoiceRoutes(app: Router): void {
    app.use('/invoices', route);

    route.get("/", invoiceController.listInvoices.bind(invoiceController));
    route.get("/add", invoiceController.renderCreationView.bind(invoiceController));
    route.get("/show", invoiceController.getInvoiceData.bind(invoiceController));
    route.post("/add", invoiceController.createInvoice.bind(invoiceController));
}
