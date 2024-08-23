import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"
import ClientModel from "./clients";

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
    declare client: number; 
    @BelongsTo(() => ClientModel)
    clientData: ClientModel;

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