import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Task, useGetTasksQuery } from "../../generated/graphql";
import TasksTableFilters from "../TasksTableFilters/TasksTableFilters";
import { columnsForTasksTable } from "../../constants";
import { ItemType } from "../../types/managementTableTypes";
import AddTaskIcon from '@mui/icons-material/AddTask';
import ItemDialog from "../ItemDialog/ItemDialog";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface TasksManagementProps {
    search: string;
}

const TasksManagement = ({ search }: TasksManagementProps) => {
    const tasksFetchRes = useGetTasksQuery()
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasksFetchRes.data?.tasks || []);
    const [isOpenTaskForm, setIsOpenTaskForm] = useState<boolean>(false);
    const [taskToUpdate, setTaskToUpdate] = useState<Task>();
    const [loading, setLoading] = useState<boolean>(tasksFetchRes.loading);

    useEffect(() => {
        setTimeout(() => {
            setLoading(tasksFetchRes.loading)
        }, 200)
    }, [tasksFetchRes.loading])

    const getTasksView = () =>
        loading ?
            <LoadingSpinner />
            :
            <>
                <h4>Total Tasks: {tasksFetchRes.data?.tasks.length}</h4>
                <ItemsTable handleEditItem={handleEditTask} type={ItemType.Task} headers={columnsForTasksTable} items={filteredTasks}
                    setItems={(newItems: Task[]) => setFilteredTasks(newItems)} search={search} />
            </>

    const handleCloseTaskForm = () => {
        setIsOpenTaskForm(false);
        setTaskToUpdate(undefined);
    }

    const handleEditTask = (task: Task) => {
        setIsOpenTaskForm(true);
        setTaskToUpdate(task);
    }

    return <>
        <Button variant="contained" sx={{ fontWeight: 'bold', m: '1%' }} onClick={() => setIsOpenTaskForm(true)} startIcon={<AddTaskIcon />}>
            Add Task
        </Button>
        <Box>
            <TasksTableFilters setTasks={setFilteredTasks} data={tasksFetchRes.data?.tasks} />
            {getTasksView()}
        </Box>
        {
            isOpenTaskForm &&
            <ItemDialog handleClose={handleCloseTaskForm} itemToUpdate={taskToUpdate} type={ItemType.Task} />
        }
    </>

};

export default TasksManagement;

