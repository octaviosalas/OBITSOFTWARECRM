import {Table, Model, Column, DataType, AutoIncrement, PrimaryKey,  HasMany, Default, ForeignKey, BelongsTo} from "sequelize-typescript"
import UserRemindersModel from "./userReminders"
import FollowUpModel from "./projectPlanification"
import UserAccesModel from "./userAcces"
import UserNotificationModel from "./userNotifications"
import ProjectMessagesModel from "./projectMessages"
import UserClientAccesModel from "./UserClientAcces"
import AlertsModel from "./alerts"


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
    declare rol: string

    @Column({ 
        type: DataType.STRING
    })
    declare password: string

    @Column({ 
        type: DataType.STRING,
        allowNull: true, 
    })
    declare profileImage: string | null;

    @HasMany(() => UserRemindersModel, {foreignKey: 'userId' })
    reminders: UserRemindersModel[]

    @HasMany(() => UserAccesModel, {foreignKey: 'userId' })
    userAcces: UserAccesModel[]

    @HasMany(() => FollowUpModel, {foreignKey: 'userId' })
    user: FollowUpModel[]

    @HasMany(() => UserNotificationModel, {foreignKey: 'userId' })
    userNotifications: UserNotificationModel[]

    @HasMany(() => ProjectMessagesModel, {foreignKey: 'userId' })
    projectMessages: ProjectMessagesModel[]

    @HasMany(() => UserClientAccesModel, {foreignKey: 'userId' })
    userData: UserClientAccesModel[]

    @HasMany(() => AlertsModel, {foreignKey: 'userId' })
    userDataAlerts: AlertsModel[]
}

export default UserModel

