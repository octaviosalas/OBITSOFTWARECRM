import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, Default, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript"
import ClientModel from "./clients"
import ProjectServiceModel from "./projectServices"
import FollowUpModel from "./followUps"

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
    projects: ProjectServiceModel[]; 

    @HasMany(() => FollowUpModel, { foreignKey: 'projectId' }) 
    follows: FollowUpModel[]; 


}

export default ProjectModel

