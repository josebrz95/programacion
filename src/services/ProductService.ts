import { Product } from "../entities/Product";
import { connectionSource } from "../../ormconfig";
import {Repository} from "typeorm";

export class ProductService {
    private repository: Repository<Product>

    constructor() {
        this.repository = connectionSource.getRepository(Product);
    }

    async create({ name, description, amount, category }: Partial<Product>) {
        if (!name || !description || !amount || !category) {
            throw new Error("Por favor llena todos los campos");
        }
        const productAlreadyExists = await this.repository.findOne({ where: { name } });
        if (productAlreadyExists) {
            throw new Error("El Producto ya esta registrado");
        }
        return this.repository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values({ name, description, amount, category})
            .execute()
    }

    async list(): Promise<Product[]> {
        return this.repository.find({
            relations: [ 'category' ]
        })
    }

    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
        return this.repository
            .createQueryBuilder()
            .where("name like :search", {search: `%${search}%`})
            .getMany();
    }

    async delete(id: string) {
        return this.repository
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where("id = :id", {id})
            .execute();
    }

    async getData(id: string) {
        return this.repository.findOne({
            where: { id },
            relations: ['category']
        });
    }

    async update({ id, name, description, amount, category }: Partial<Product>) {
        return this.repository
            .createQueryBuilder()
            .update(Product)
            .set({ name, description, amount, category })
            .where("id = :id", {id})
            .execute();

    }
}
