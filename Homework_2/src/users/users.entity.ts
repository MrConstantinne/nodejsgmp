import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('users')
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @Column()
    isDeleted: boolean
}
