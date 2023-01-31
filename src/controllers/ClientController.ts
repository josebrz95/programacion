import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";

class ClientController {
    private service: ClientService;

    constructor() {
        this.service = new ClientService()
    }

    async createClient(req: Request, res: Response) {
        const { name, lastname, email, phone, city, state, cuit, address } = req.body;
        try {
            await this.service.create({
                name,
                email,
                phone,
                city,
                state,
                cuit,
                lastname,
                address
            }).then(() => {
                res.render("common-views/message", {
                    message: "Cliente registrado"
                });
            });
        } catch (err) {
            res.render("common-views/message", {
                message: `Error al registrar cliente: ${err.message}`
            });
        }

    }

    async listClients(req: Request, res: Response) {
        const clients = await this.service.list()
        return res.render("client-views/client_table", {
            clients
        });
    }

    async getClientData(req: Request, res: Response) {
        let { id } = req.query;
        id = id.toString();

        const clientSelected = await this.service.getData(id);
        return res.render("client-views/edit", {
            clientSelected
        });
    }

    async updateClient(req: Request, res: Response) {
        const { id, name, lastname, email, phone, city, state, cuit, address } = req.body;

        try {
            await this.service.update({
                id,
                name,
                email,
                phone,
                city,
                state,
                cuit,
                lastname,
                address
            }).then(() => {
                res.render("common-views/message", {
                    message: "Cliente actualizado"
                });
            });
        } catch (err) {
            res.render("common-views/message", {
                message: `Error al actualizar cliente: ${err.message}`
            });
        }

    }

    async deleteClient(request: Request, res: Response) {
        const { id } = request.body;

        try {
            await this.service.delete(id).then(() => {
                res.render("common-views/message", {
                    message: "Cliente eliminado"
                });
            });
        } catch (err) {
            res.render("common-views/message", {
                message: `Error al eliminar cliente: ${err.message}`
            });
        }
    }
}

export default new ClientController()
