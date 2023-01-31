import { Invoice } from "../entities/Invoice";
import { connectionSource } from "../../ormconfig";
import {Repository} from "typeorm";

export class InvoiceService {
    private repository: Repository<Invoice>

    constructor() {
        this.repository = connectionSource.getRepository(Invoice);
    }

    async create({ products, client, type }: Partial<Invoice>) {
        const invoice = this.repository.create({ products, client, type })
        await this.repository.save(invoice);
        return invoice
    }

    async list(): Promise<Invoice[]> {
        return this.repository.find({
            relations: ['products', 'client']
        })
    }

    async count(): Promise<number> {
        return this.repository.count()
    }

    async search(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
        return this.repository
            .createQueryBuilder('i')
            .leftJoin('i.client', 'c')
            .where("c.cuit like :search", {search: `%${search}%`})
            .andWhere("c.phone like :search", {search: `%${search}%`})
            .andWhere("c.email like :search", {search: `%${search}%`})
            .getMany();
    }

    async getData(register: number) {
        return this.repository.findOne({
            relations: {
                client: true,
                products: true
            },
            where: {
                register
            }
        });
    }
}
