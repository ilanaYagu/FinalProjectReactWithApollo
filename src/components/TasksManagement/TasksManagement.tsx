import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Task, useGetTasksQuery } from "../../generated/graphql";
import TasksTableFilters from "../TasksTableFilters/TasksTableFilters";
import { columnsForTasksTable } from "../../table-constants";
import { ItemType } from "../../types/managementTableTypes";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useLoadingDataHook } from "../../custom-listeners-hooks/useLoadingDataHook";

interface TasksManagementProps {
    search: string;
    setTaskForm(taskFormDetails: { open: Boolean, item?: Task }): void;
}

const TasksManagement = ({ search, setTaskForm }: TasksManagementProps) => {
    const tasksFetchRes = useGetTasksQuery()
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasksFetchRes.data?.tasks || []);
    const [loading, setLoading] = useState<boolean>(tasksFetchRes.loading);
    useLoadingDataHook({ loading: tasksFetchRes.loading, setLoading });

    const getTasksView = () =>
        loading ?
            <LoadingSpinner />
            :
            <>
                <h4>Total Tasks: {tasksFetchRes.data?.tasks.length}</h4>
                <ItemsTable handleEditItem={(task: Task) => setTaskForm({ open: true, item: task })} type={ItemType.Task} headers={columnsForTasksTable} items={filteredTasks}
                    setItems={(newItems: Task[]) => setFilteredTasks(newItems)} search={search} />
            </>

    return <Box>
        <TasksTableFilters setTasks={setFilteredTasks} data={tasksFetchRes.data?.tasks} />
        {getTasksView()}
    </Box>

};

export default TasksManagement;

