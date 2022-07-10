import { useState } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Event, Task, useGetTodayTasksAndEventQuery } from "../../generated/graphql";
import { columnsForTodayTasksAndEventsTable } from "../../table-constants";
import DashboardTableToggleFilters from "../DashboardTableToggleFilters/DashboardTableToggleFilters";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useLoadingDataHook } from "../../custom-listeners-hooks/useLoadingDataHook";

interface TodayManagementProps {
    search: string;
    setItemForm(itemFormDetails: { open: Boolean, item?: Task | Event }): void;
}

const TodayManagement = ({ search, setItemForm }: TodayManagementProps) => {
    const todayFetchRes = useGetTodayTasksAndEventQuery();
    const [filteredTodays, setFilteredTodays] = useState<(Event | Task)[] | undefined>(todayFetchRes.data ? [...todayFetchRes.data?.todayEvents, ...todayFetchRes.data?.todayTasks] : undefined);
    const [loading, setLoading] = useState<boolean>(todayFetchRes.loading);
    useLoadingDataHook({ loading: todayFetchRes.loading, setLoading });

    const getItemsView = () =>
        loading ?
            <LoadingSpinner />
            :
            <>
                <h4>Total Events: {todayFetchRes.data?.todayEvents?.length}, Total Tasks: {todayFetchRes.data?.todayTasks?.length}</h4>
                <ItemsTable handleEditItem={(item: Task | Event) => setItemForm({ open: true, item })} headers={columnsForTodayTasksAndEventsTable}
                    items={filteredTodays || []} setItems={setFilteredTodays} search={search} />
            </>


    return <>
        <DashboardTableToggleFilters setDataTable={setFilteredTodays} data={todayFetchRes.data} />
        {getItemsView()}
    </>
};

export default TodayManagement;

