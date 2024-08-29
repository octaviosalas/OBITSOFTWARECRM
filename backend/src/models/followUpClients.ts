import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"
import ClientModel from "./clients";
import ProjectModel from "./projects";
import UserModel from "./user";

@Table({ 
    tableName: "followUpClients"
})

class FollowUpClientsModel extends Model { 
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
    declare contactDate: Date

    @Column ({ 
        type: DataType.DATE
    })
    declare nextContactDate: Date

    @Column ({ 
        type: DataType.STRING
    })
    declare note: string


}

export default FollowUpClientsModel;