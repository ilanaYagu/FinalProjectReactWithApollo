import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardTableToggleFilters from "../components/DashboardTableToggleFilters/DashboardTableToggleFilters";
import EventsTableFilters from "../components/EventsTableFilters/EventsTableFilters";
import TasksTableFilters from "../components/TasksTableFilters/TasksTableFilters";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ItemForm from "../components/ItemForm/ItemForm";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import DeleteForm from "../components/DeleteForm/DeleteForm";
import { TableHeaders, ItemType } from "../types/managementTableTypes";
import { makeStyles } from "@mui/styles";
import SearchField from "../components/SearchField/SearchField";
import { Event, Task } from "../generated/graphql";
import * as Apollo from '@apollo/client';
import { GET_ALL_TASKS, GET_ALL_EVENTS, GET_TODAY_TASKS_AND_EVENTS } from "../graphql/Queries";
import { useEnterEscButtonsHook } from "../custom-hooks/useEnterEscButtonsHook";
import { useSearchShourtCutHook } from "../custom-hooks/useSearchShourtCut";

const searchableProperties: (keyof (Event | Task))[] = ["title"];
const useStyles = makeStyles({
    filtersTitle: {
        marginTop: "0.7%",
        marginRight: "0.5%"
    },
    filterBox: {
        marginTop: "2%"
    }
});

interface ManagementPageProps {
    type?: ItemType;
    headers: TableHeaders<Task> | TableHeaders<Event>;
}

const ManagementPage = ({ type, headers }: ManagementPageProps) => {
    const classes = useStyles();
    const dataFetchRes = Apollo.useQuery(type ? type === ItemType.Task ? GET_ALL_TASKS : GET_ALL_EVENTS : GET_TODAY_TASKS_AND_EVENTS)
    const [allData, setAllData] = useState<{ tasks: Task[], events: Event[] }>({ tasks: [], events: [] });
    const [filteredData, setFilteredData] = useState<(Event | Task)[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [itemToDelete, setItemToDelete] = useState<Event | Task | "">("");
    const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
    const [itemToUpdate, setItemToUpdate] = useState<Event | Task | "">("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (dataFetchRes.data) {
            const events: Event[] = (type === ItemType.Event) ? (dataFetchRes.data?.events) : (!type ? dataFetchRes.data?.todayEvents : []);
            const tasks: Task[] = (type === ItemType.Task) ? (dataFetchRes.data?.tasks) : (!type ? dataFetchRes.data?.todayTasks : []);
            setFilteredData([...tasks, ...events]);
            setAllData({ tasks: tasks, events: events });
        }
    }, [dataFetchRes])

    useEffect(() => {
        setLoading(dataFetchRes.loading)
    }, [dataFetchRes.loading])

    const handleCloseItemForm = (): void => {
        setItemToUpdate("");
        setIsFormDialogOpen(false);
    }

    const handleOpenCreateForm = (): void => {
        setIsFormDialogOpen(true);
    }

    const handleOpenUpdateForm = (itemToUpdate: Event | Task): void => {
        setItemToUpdate(itemToUpdate);
        setIsFormDialogOpen(true);
    }

    const handleOpenDeleteDialog = (itemToDelete: Event | Task): void => {
        setIsDeleteDialogOpen(true);
        setItemToDelete(itemToDelete);
    }
    const handleCloseDeleteDialog = (): void => {
        setIsDeleteDialogOpen(false);
        setItemToDelete("");
    }

    useSearchShourtCutHook();

    const getFilters = () =>
        <Box display="flex" className={classes.filterBox}>
            <div className={classes.filtersTitle}>Quick Filters:</div>
            {
                !type ?
                    <DashboardTableToggleFilters setDataTable={setFilteredData} data={allData} />
                    :
                    type === ItemType.Task ?
                        <TasksTableFilters setTasks={(tasks: Task[]) => setFilteredData(tasks)} data={allData.tasks} />
                        :
                        <EventsTableFilters setEvents={(events: Event[]) => setFilteredData(events)} data={allData.events} />
            }
        </Box>

    const getSubtitle = () =>
        type ?
            <h4>Total {type}s: {filteredData.length}</h4>
            :
            <h4>Total Tasks: {allData.tasks.length}, Total Events: {allData.events.length}</h4>

    const getItemsView = () =>
        <>
            {
                loading ?
                    <Box sx={{ mt: "10%", textAlign: "center", color: "#F6E7E4" }}>
                        <h1>LOADING...</h1>
                    </Box>
                    :
                    <>
                        {getSubtitle()}
                        <ItemsTable headers={headers} items={filteredData} setItems={(newItems: (Event | Task)[]) => setFilteredData(newItems)}
                            handleEditItem={handleOpenUpdateForm} handleDeleteItem={handleOpenDeleteDialog}
                            search={search} searchableProperties={searchableProperties} />
                    </>
            }
        </>

    return (
        <Box>
            <h1>{type ? `${type}s` : "Today"} Management</h1>
            <SearchField id="search" setSearch={setSearch} />
            <Button variant="contained" sx={{ fontWeight: 'bold', m: '1%' }} onClick={handleOpenCreateForm} startIcon={type === ItemType.Event ? <CalendarMonthRoundedIcon /> : <AddTaskIcon />}>
                Add {type}
            </Button>
            {getFilters()}
            {isFormDialogOpen &&
                <ItemForm type={type ? type : (itemToUpdate ? (itemToUpdate.__typename === ItemType.Task ? ItemType.Task : ItemType.Event) : ItemType.Task)} enableSwitchType={type ? false : true} open={isFormDialogOpen} handleClose={handleCloseItemForm} itemToUpdate={itemToUpdate ? itemToUpdate : undefined} />}
            {getItemsView()}
            {isDeleteDialogOpen && itemToDelete !== "" &&
                <DeleteForm item={itemToDelete} open={isDeleteDialogOpen} handleClose={handleCloseDeleteDialog} />}
        </Box>
    );
};

export default ManagementPage;

