import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"
import UserModel from "./user";
import ClientModel from "./clients";

@Table({ 
    tableName: "UserClientAcces",
})

class UserClientAccesModel extends Model { 
  
      @AutoIncrement
      @PrimaryKey
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      declare id: number;
      
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

export default UserClientAccesModel

