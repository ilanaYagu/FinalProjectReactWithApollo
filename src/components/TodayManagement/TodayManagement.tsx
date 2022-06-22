import { Box } from "@mui/material";
import { useState } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Event, Task, useGetEventsQuery, useGetTodayTasksAndEventQuery } from "../../generated/graphql";
import { columnsForEventsTable, columnsForTodayTasksAndEventsTable } from "../../constants";
import EventsTableFilters from "../EventsTableFilters/EventsTableFilters";
import DashboardTableToggleFilters from "../DashboardTableToggleFilters/DashboardTableToggleFilters";
import { ItemType } from "../../types/managementTableTypes";

const searchableProperties: (keyof (Event | Task))[] = ["title"];

interface TodayManagementProps {
    search: string;
}

const TodayManagement = ({ search }: TodayManagementProps) => {
    const todayFetchRes = useGetTodayTasksAndEventQuery();
    const [filteredTodays, setFilteredTodays] = useState<(Event | Task)[] | undefined>(todayFetchRes.data ? [...todayFetchRes.data?.todayEvents, ...todayFetchRes.data?.todayTasks] : undefined);

    const getItemsView = () =>
        <>
            {
                todayFetchRes.loading ?
                    <Box sx={{ mt: "10%", textAlign: "center", color: "#F6E7E4" }}>
                        <h1>LOADING...</h1>
                    </Box>
                    :
                    <>
                        <h4>Total Events: {todayFetchRes.data?.todayEvents?.length}, Total Tasks: {todayFetchRes.data?.todayTasks?.length}</h4>
                        <ItemsTable headers={columnsForTodayTasksAndEventsTable} items={filteredTodays || []} setItems={setFilteredTodays}
                            search={search} searchableProperties={searchableProperties} />
                    </>
            }
        </>

    return (
        <Box>
            <DashboardTableToggleFilters setDataTable={setFilteredTodays} data={todayFetchRes.data} />
            {getItemsView()}
        </Box>
    );
};

export default TodayManagement;

