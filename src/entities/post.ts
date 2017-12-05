import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Category} from "./category";
import {Author} from "./author"

@Entity('post')
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    text: string;

    @ManyToMany(type => Category, {
        cascadeInsert: true
    })
    @JoinTable()
    categories: Category[];

    @ManyToOne(type => Author, author => author.posts, {
      cascadeInsert: true
    })
    author: Author;
}
