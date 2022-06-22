import { Box } from "@mui/material";
import { useState } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Event, Task, useGetTasksQuery } from "../../generated/graphql";
import TasksTableFilters from "../TasksTableFilters/TasksTableFilters";
import { columnsForTasksTable } from "../../constants";
import { ItemType } from "../../types/managementTableTypes";

const searchableProperties: (keyof (Event | Task))[] = ["title"];

interface TasksManagementProps {
    search: string;
}

const TasksManagement = ({ search }: TasksManagementProps) => {
    const tasksFetchRes = useGetTasksQuery()
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasksFetchRes.data?.tasks || []);

    const getItemsView = () =>
        <>
            {
                tasksFetchRes.loading ?
                    <Box sx={{ mt: "10%", textAlign: "center", color: "#F6E7E4" }}>
                        <h1>LOADING...</h1>
                    </Box>
                    :
                    <>
                        <h4>Total Tasks: {tasksFetchRes.data?.tasks.length}</h4>
                        <ItemsTable type={ItemType.Task} headers={columnsForTasksTable} items={filteredTasks} setItems={(newItems: Task[]) => setFilteredTasks(newItems)}
                            search={search} searchableProperties={searchableProperties} />
                    </>
            }
        </>

    return (
        <Box>
            <TasksTableFilters setTasks={setFilteredTasks} data={tasksFetchRes.data?.tasks} />
            {getItemsView()}
        </Box>
    );
};

export default TasksManagement;

