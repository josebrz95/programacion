import {Request, Response, Router} from "express";
import clientController from "../controllers/ClientController";

const route = Router();

export function generateClientRoutes(app: Router): void {
    app.use('/clients', route);

    route.get("/", clientController.listClients.bind(clientController));
    route.get("/add", (request: Request, response: Response) => response.render("client-views/add"));
    route.get("/edit", clientController.getClientData.bind(clientController));

    route.post("/edit", clientController.updateClient.bind(clientController));
    route.post("/add", clientController.createClient.bind(clientController));
    route.post("/delete", clientController.deleteClient.bind(clientController));
}
