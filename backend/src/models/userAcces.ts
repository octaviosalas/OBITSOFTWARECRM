import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"
import UserModel from "./user";
import ProjectModel from "./projects";

@Table({ 
    tableName: "userAcces",
})

class UserAccesModel extends Model { 

    @ForeignKey(() => UserModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare userId: number;
    @BelongsTo(() => UserModel)
    userData: UserModel;


    @ForeignKey(() => ProjectModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare projectId: number;
    @BelongsTo(() => ProjectModel)
    projectData: ProjectModel;
}

export default UserAccesModel

