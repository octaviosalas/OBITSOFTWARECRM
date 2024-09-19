import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default} from "sequelize-typescript"
import FollowUpModel from "./projectPlanification"
import ProjectModel from "./projects"
import UserClientAccesModel from "./UserClientAcces"
import FollowUpClientsModel from "./followUpClients"

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
    
    @HasMany(() => UserClientAccesModel, { foreignKey: 'clientId' }) 
    userAcces: UserClientAccesModel[]; 

    @HasMany(() => FollowUpClientsModel, { foreignKey: 'client' }) 
    followUpsClientsData: FollowUpModel[]; 
}

export default ClientModel