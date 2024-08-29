import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default} from "sequelize-typescript"
import FollowUpModel from "./followUps"
import ProjectModel from "./projects"

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

    @Column ({ 
        type: DataType.BOOLEAN
    })
    declare active: Boolean

    @Column({
        type: DataType.JSON,
    })
    declare socialNetworks: {
        instagram?: string | null;
        facebook?: string | null;
    };

    @HasMany(() => ProjectModel, { foreignKey: 'client' }) 
    projects: ProjectModel[]; 

    @HasMany(() => FollowUpModel, { foreignKey: 'client' }) 
    followUpsData: FollowUpModel[]; 
}

export default ClientModel