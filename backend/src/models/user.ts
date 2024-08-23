import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"
import ClientModel from "./clients";

@Table({ 
    tableName: "user",
})

class UserModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column({ 
        type: DataType.STRING
    })
    declare name: string

    @Column({ 
        type: DataType.STRING
    })
    declare email: string

    @Column({ 
        type: DataType.STRING
    })
    declare password: string

    @ForeignKey(() => ClientModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare client: number; 
    @BelongsTo(() => ClientModel)
    clientData: ClientModel;


}

export default UserModel