import { Table, Model, Column, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, AllowNull } from "sequelize-typescript";
import UserModel from "./user";
import ProjectModel from "./projects";

@Table({ 
    tableName: "userNotifications",
})
class UserNotificationModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ 
        type: DataType.INTEGER
    })
    declare id: number

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;
    @BelongsTo(() => UserModel)
    userData: UserModel;

    @AllowNull(true)
    @ForeignKey(() => ProjectModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    declare projectId?: number;
    @BelongsTo(() => ProjectModel)
    projectData?: ProjectModel;

    @Column({
        type: DataType.ENUM('PROJECT_REMINDER', 'PROJECT_MESSAGE', 'PERSONAL_MESSAGE')
    })
    declare notificationType: 'PROJECT_REMINDER' | 'PROJECT_MESSAGE' | 'PERSONAL_MESSAGE';

    @Column(DataType.STRING)
    declare message: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare read: boolean;

}

export default UserNotificationModel;

