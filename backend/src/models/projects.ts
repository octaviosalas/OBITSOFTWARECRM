import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey, Default, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript"
import ClientModel from "./clients"
import ProjectServiceModel from "./projectServices"

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
    declare projectType: string

    @Column ({ 
        type: DataType.DATE
    })
    declare startDate: Date

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

}

export default ProjectModel

