import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default} from "sequelize-typescript"

@Table({ 
    tableName: "clients",
})

class ClientModel extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @Column ({ 
        type: DataType.STRING
    })
    declare name: string

    @Column ({ 
        type: DataType.BIGINT
    })
    declare phone: number

    @Column ({ 
        type: DataType.STRING
    })
    declare email: string

    @Column ({ 
        type: DataType.DATE
    })
    declare dischargeDate: Date

        
    /*@HasMany(() => ComplexModel, { foreignKey: 'adminId' }) 
    complexData: ComplexModel[]; */
}

export default ClientModel