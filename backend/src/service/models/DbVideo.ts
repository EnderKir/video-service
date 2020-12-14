import {Column, Model, Table} from "sequelize-typescript";
import {Video} from "../../model/Video";

@Table
export class DbVideo extends Model<DbVideo> implements Video {

    @Column({primaryKey: true})
    id: string;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    url: string;
}

