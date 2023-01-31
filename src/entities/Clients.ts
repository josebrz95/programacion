import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Invoice} from "./Invoice";

@Entity("clients")
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    cuit: string;

    @Column()
    state: string;

    @Column({nullable: true})
    city: string;

    @Column()
    address: string;

    @OneToMany(() => Invoice, invoice => invoice.client)
    invoices: Invoice[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
