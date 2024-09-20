import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"


@Table({ 
    tableName: "token",
})

class TokenModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column({ 
        type: DataType.INTEGER
    })
    declare token: number
}

export default TokenModel

