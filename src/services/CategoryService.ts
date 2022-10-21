import { Category } from "../entities/Category";
import { connectionSource } from "../../ormconfig";
import { Repository} from "typeorm";

export class CategoryService {
    private repository: Repository<Category>

    constructor() {
        this.repository = connectionSource.getRepository(Category);
    }

    async create({ name, products }: Partial<Category>) {
        if (!name) {
            throw new Error("Por favor llena el campo nombre");
        }
        const categoryAlreadyExists = await this.repository.findOne({ where: { name } });
        if (categoryAlreadyExists) {
            throw new Error("La categoria ya esta registrada");
        }
        return this.repository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values({ name, products})
            .execute()
    }

    async list(): Promise<Category[]> {
        return this.repository.find({
            relations: ['products']
        })
    }

    async delete(id: string) {
        return this.repository
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where("id = :id", {id})
            .execute();
    }

    async getData(id: string) {
        return this.repository.findOne({
            where: { id }
        });
    }

    async update({ id, name, products }: Partial<Category>) {
        if (!name) {
            throw new Error("Por favor llena el campo nombre");
        }
        return this.repository
            .createQueryBuilder()
            .update(Category)
            .set({ name, products })
            .where("id = :id", {id})
            .execute();

    }
}
