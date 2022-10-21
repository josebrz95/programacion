import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {Product} from "./Product";

@Entity("categories")
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar')
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
