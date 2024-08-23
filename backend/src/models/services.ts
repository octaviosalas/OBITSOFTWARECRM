import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default} from "sequelize-typescript"
import ProjectServiceModel from "./projectServices";

@Table({ 
    tableName: "services",
})

class ServicesModel extends Model { 
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

    @HasMany(() => ProjectServiceModel, { foreignKey: 'serviceId' }) 
    projects: ProjectServiceModel[]; 

}

export default ServicesModel