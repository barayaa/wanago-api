import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom:string;

    @Column()
    prenom: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;
}
