import { connectionSource } from "../../ormconfig";
import {Repository} from "typeorm";
import {Client} from "../entities/Clients";

export class ClientService {
    private repository: Repository<Client>

    constructor() {
        this.repository = connectionSource.getRepository(Client);
    }

    async create({ name, lastname, email, phone, city, state, cuit, address }: Partial<Client>) {
        if (!name || !email || !phone || !state || !lastname || !city || !cuit || !address) {
            throw new Error("Por favor llena todos los campos");
        }
        return this.repository
            .createQueryBuilder()
            .insert()
            .into(Client)
            .values({ name, lastname, email, phone, city, state, cuit, address })
            .execute()
    }

    async list(): Promise<Client[]> {
        return this.repository.find()
    }

    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
        return this.repository
            .createQueryBuilder()
            .andWhere("cuit like :search", {search: `%${search}%`})
            .andWhere("phone like :search", {search: `%${search}%`})
            .andWhere("email like :search", {search: `%${search}%`})
            .getMany();
    }

    async delete(id: string) {
        return this.repository
            .createQueryBuilder()
            .delete()
            .from(Client)
            .where("id = :id", {id})
            .execute();
    }

    async getData(id: string) {
        return this.repository.findOne({
            where: { id }
        });
    }

    async update(properties: Partial<Client>) {
        return this.repository
            .createQueryBuilder()
            .update(Client)
            .set(properties)
            .where("id = :id", {id: properties.id})
            .execute();
    }
}
