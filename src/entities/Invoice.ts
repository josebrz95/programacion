import {
    CreateDateColumn,
    Entity,
    ManyToOne,
    JoinColumn,
    JoinTable,
    ManyToMany,
    Column, PrimaryGeneratedColumn,
} from "typeorm";
import {Product} from "./Product";
import {Client} from "./Clients";

enum InvoiceTypes {
    C = 'C',
    B = 'B',
    A = 'A',
}

@Entity("invoices")
export class Invoice {
    @PrimaryGeneratedColumn('increment')
    register?: number

    @Column()
    type: InvoiceTypes;

    @CreateDateColumn()
    created_at?: Date;

    @ManyToMany(() => Product, { cascade: true })
    @JoinTable()
    products: Product[];

    @ManyToOne(() => Client, client => client.invoices)
    @JoinColumn({name: "id"})
    client: Client;
}
