import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService()
    }

    async createUser(req: Request, res: Response) {
        const { username, email, phone, city, state } = req.body;
        try {
            await this.service.create({
                username,
                email,
                phone,
                city,
                state
            }).then(() => {
                res.render("common-views/message", {
                    message: "Usuario registrado"
                });
            });
        } catch (err) {
            res.render("common-views/message", {
                message: `Error al registrar usuario: ${err.message}`
            });
        }

    }

    async listUsers(req: Request, res: Response) {
        const users = await this.service.list()
        return res.render("user-views/user_table", {
            users: users
        });
    }

    async getUserData(req: Request, res: Response) {
        let { id } = req.query;
        id = id.toString();

        const user = await this.service.getData(id);

        return res.render("user-views/edit", {
            user: user
        });
    }

    async updateUser(req: Request, res: Response) {
        const { id, username, email, phone, city, state } = req.body;

        try {
            await this.service.update({ id, username, email, phone, city, state }).then(() => {
                res.render("common-views/message", {
                    message: "Usuário actualizado"
                });
            });
        } catch (err) {
            res.render("common-views/message", {
                message: `Error al actualizar usuario: ${err.message}`
            });
        }

    }

    async deleteUser(request: Request, res: Response) {
        const { id } = request.body;

        try {
            await this.service.delete(id).then(() => {
                res.render("common-views/message", {
                    message: "Usuario eliminado"
                });
            });
        } catch (err) {
            res.render("common-views/message", {
                message: `Error al eliminar usuario: ${err.message}`
            });
        }
    }
}

export default new UserController()
