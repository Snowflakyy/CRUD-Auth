import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId:number;

    @Column({unique:true})
    email:string;

    @Column({default:''})
    password:string;
}
