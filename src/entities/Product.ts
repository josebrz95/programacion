import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import {Category} from "./Category";

@Entity("products")
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @Column('int')
    amount: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
