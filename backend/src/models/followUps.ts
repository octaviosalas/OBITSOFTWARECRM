import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"
import ClientModel from "./clients";
import ProjectModel from "./projects";
import UserModel from "./user";

@Table({ 
    tableName: "followUp",
})

class FollowUpModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @ForeignKey(() => ClientModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare clientId: number; 
    @BelongsTo(() => ClientModel)
    clientData: ClientModel;

    @ForeignKey(() => ProjectModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare projectId: number; 
    @BelongsTo(() => ProjectModel)
    projectData: ProjectModel;

    @ForeignKey(() => UserModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare userId: number; 
    @BelongsTo(() => UserModel)
    userData: UserModel;

    @Column ({ 
        type: DataType.DATE
    })
    declare date: Date

    @Column ({ 
        type: DataType.STRING
    })
    declare note: string

}

export default FollowUpModel