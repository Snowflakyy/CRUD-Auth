import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    

    @Column({default:''})
    description:string;
    
    @Column({default:0})
    price:number;

    @Column({default:0})
    stock:number;

    @ManyToOne(()=> CategoryEntity)
    @JoinColumn({name:"category_id"})
    category:CategoryEntity;

    @Column({name:"category_id"})
    categoryId:number;

    @Column()
    userId:number;
}
