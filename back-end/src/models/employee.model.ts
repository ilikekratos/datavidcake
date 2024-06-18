import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['firstName', 'lastName', 'city'])
export class Employee {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    birthDate!: Date;

    @Column()
    country!: string;

    @Column()
    city!: string;
}