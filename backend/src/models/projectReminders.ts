import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"
import ProjectModel from "./projects";
import UserModel from "./user";

@Table({
    tableName: "projectReminders",
})

class ProjectRemindersModels extends Model { 
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @ForeignKey(() => ProjectModel)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare projectId: number
    @BelongsTo(() => ProjectModel)
    projectData: ProjectModel
    
    @ForeignKey(() => UserModel)
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number
    @BelongsTo(() => UserModel)
    userData: UserModel

    @Column ({ 
        type: DataType.DATE,
    })
    declare date: Date

    @Column ({ 
        type: DataType.STRING
    })
    declare reminderData: string
}

export default ProjectRemindersModels