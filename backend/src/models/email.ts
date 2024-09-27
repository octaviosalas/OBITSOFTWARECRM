import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"
import UserModel from "./user";
import ClientModel from "./clients";

@Table({ 
    tableName: "emails",
})

class EmailModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column ({ 
        type: DataType.STRING
    })
    declare emailMessage: string

    @Column ({ 
        type: DataType.STRING
    })
    declare emailTitle: string

    @Column ({ 
        type: DataType.DATE
    })
    declare emailDate: Date

    @Column ({ 
        type: DataType.STRING
    })
    declare destinationEmail: string

    @ForeignKey(() => UserModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare userId: number; 
    @BelongsTo(() => UserModel)
    userData: UserModel;

    @ForeignKey(() => ClientModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare clientId: number; 
    @BelongsTo(() => ClientModel)
    clientData: ClientModel;
}

export default EmailModel