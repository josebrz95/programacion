import { User } from "../entities/User";
import { Repository, getRepository } from "typeorm";

export class UserService {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ username, email, phone, city, state }: Partial<User>) {
        if (!username || !email || !phone || !city || !state) {
            throw new Error("Por favor llena todos los campos");
        }
        const usernameAlreadyExists = await this.repository.findOne({ where: { username } });
        const emailAlreadyExists = await this.repository.findOne({ where:{ email } });
        if (emailAlreadyExists || usernameAlreadyExists) {
            throw new Error("El usuario ya esta registrado");
        }
        return this.repository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ username, email, phone, city, state })
            .execute()
    }

    async list(): Promise<Partial<User>[]> {
        return this.repository.find();
    }


    async search(search: string): Promise<Partial<User>[]> {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
        return this.repository
            .createQueryBuilder()
            .where("username like :search", {search: `%${search}%`})
            .orWhere("email like :search", {search: `%${search}%`})
            .orWhere("phone like :search", {search: `%${search}%`})
            .orWhere("city like :search", {search: `%${search}%`})
            .orWhere("state like :search", {search: `%${search}%`})
            .getMany();
    }

    async delete(id: string) {
        return this.repository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", {id})
            .execute();
    }

    async getData(id: string): Promise<Partial<User>>{
        return this.repository.findOne({
            where: {id}
        });
    }

    async update({ id, username, email, phone, city, state }: Partial<User>) {
        return this.repository
            .createQueryBuilder()
            .update(User)
            .set({username, email, phone, city, state})
            .where("id = :id", {id})
            .execute();

    }
}
