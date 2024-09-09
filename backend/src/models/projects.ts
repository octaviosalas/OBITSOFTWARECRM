import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, Default, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript"
import ClientModel from "./clients"
import ProjectServiceModel from "./projectServices"
import ProjectPlanificationModel from "./projectPlanification"
import ProjectRemindersModels from "./projectReminders"
import ProjectMessagesModel from "./projectMessages"

@Table({ 
    tableName: "projects",
    indexes: [
        { fields: ['client'] } 
    ]
})


class ProjectModel extends Model { 
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
        type: DataType.STRING
    })
    declare description: string

    @Column ({ 
        type: DataType.DATE
    })
    declare startDate: Date

    @Column ({ 
        type: DataType.INTEGER
    })
    declare amount: number

    @ForeignKey(() => ClientModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare client: number;
    @BelongsTo(() => ClientModel)
    clientData: ClientModel;

    @HasMany(() => ProjectServiceModel, { foreignKey: 'projectId' }) 
    services: ProjectServiceModel[]; 

    @HasMany(() => ProjectPlanificationModel, { foreignKey: 'projectId' }) 
    follows: ProjectPlanificationModel[]; 

    @HasMany(() => ProjectRemindersModels, { foreignKey: 'projectId' }) 
    reminders: ProjectRemindersModels[]; 

    @HasMany(() => ProjectMessagesModel, {foreignKey: 'projectId' })
    projectMessages: ProjectMessagesModel[]
    
}

export default ProjectModel

