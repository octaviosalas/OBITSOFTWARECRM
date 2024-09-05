import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import ProjectModel from "./projects";
import ServicesModel from "./services";

@Table({ tableName: "project_services" })

class ProjectServiceModel extends Model {

    @ForeignKey(() => ProjectModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare projectId: number;
    @BelongsTo(() => ProjectModel)
    project: ProjectModel;

    @ForeignKey(() => ServicesModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare serviceId: number;
    @BelongsTo(() => ServicesModel)
    service: ServicesModel;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare startDate?: Date | null;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare endDate?: Date | null;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    declare amount?: number | null;
}

export default ProjectServiceModel;