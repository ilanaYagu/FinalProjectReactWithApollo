import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Event, Task, useGetTodayTasksAndEventQuery } from "../../generated/graphql";
import { columnsForTodayTasksAndEventsTable } from "../../constants";
import DashboardTableToggleFilters from "../DashboardTableToggleFilters/DashboardTableToggleFilters";
import AddTaskIcon from '@mui/icons-material/AddTask';
import ItemDialog from "../ItemDialog/ItemDialog";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface TodayManagementProps {
    search: string;
}

const TodayManagement = ({ search }: TodayManagementProps) => {
    const todayFetchRes = useGetTodayTasksAndEventQuery();
    const [filteredTodays, setFilteredTodays] = useState<(Event | Task)[] | undefined>(todayFetchRes.data ? [...todayFetchRes.data?.todayEvents, ...todayFetchRes.data?.todayTasks] : undefined);
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const [itemToUpdate, setItemToUpdate] = useState<Task | Event>();
    const [loading, setLoading] = useState<boolean>(todayFetchRes.loading);

    useEffect(() => {
        setTimeout(() => {
            setLoading(todayFetchRes.loading)
        }, 200)
    }, [todayFetchRes.loading])

    const getItemsView = () =>
        loading ?
            <LoadingSpinner />
            :
            <>
                <h4>Total Events: {todayFetchRes.data?.todayEvents?.length}, Total Tasks: {todayFetchRes.data?.todayTasks?.length}</h4>
                <ItemsTable handleEditItem={handleEditItem} headers={columnsForTodayTasksAndEventsTable}
                    items={filteredTodays || []} setItems={setFilteredTodays} search={search} />
            </>

    const handleCloseTodayForm = () => {
        setIsOpenForm(false);
        setItemToUpdate(undefined);
    }

    const handleEditItem = (item: Task | Event) => {
        setIsOpenForm(true);
        setItemToUpdate(item);
    }

    return <>
        <Button variant="contained" sx={{ fontWeight: 'bold', m: '1%' }} onClick={() => setIsOpenForm(true)} startIcon={<AddTaskIcon />}>
            Add
        </Button>
        <Box>
            <DashboardTableToggleFilters setDataTable={setFilteredTodays} data={todayFetchRes.data} />
            {getItemsView()}
        </Box>
        {
            isOpenForm &&
            <ItemDialog handleClose={handleCloseTodayForm} itemToUpdate={itemToUpdate} />
        }
    </>
};

export default TodayManagement;

