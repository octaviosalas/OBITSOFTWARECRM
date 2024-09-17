import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo} from "sequelize-typescript"
import UserModel from "./user";

@Table({ 
    tableName: "alerts",
})

class AlertsModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @ForeignKey(() => UserModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare userId: number; 
    @BelongsTo(() => UserModel)
    userData: UserModel;

    @Column ({ 
        type: DataType.STRING
    })
    declare message: string

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare date?: Date;

}

export default AlertsModel