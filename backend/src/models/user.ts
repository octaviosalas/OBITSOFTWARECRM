import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"


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

}

export default UserModel

/*User tendra un modelo mas llamada userAcces, que contendra: 

userId,
projectd

userId hara referencia al usuario que tiene acceso a projectId, que logicamenete sera  el ID del proyecto.
osea  que userId hara BelongsTo to User y porjectId to project. Entonces, cuando traiga data del usuario tmb pimero consumiero
el modelo userAcces, y hare hare la relacion al proyecto.
*/