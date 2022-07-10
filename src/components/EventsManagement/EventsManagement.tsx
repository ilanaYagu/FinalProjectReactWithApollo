import { Box } from "@mui/material";
import { useState } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Event, useGetEventsQuery } from "../../generated/graphql";
import { columnsForEventsTable } from "../../table-constants";
import EventsTableFilters from "../EventsTableFilters/EventsTableFilters";
import { ItemType } from "../../types/managementTableTypes";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useLoadingDataHook } from "../../custom-listeners-hooks/useLoadingDataHook";

interface EventsManagementProps {
    search: string;
    setEventForm(eventFormDetails: { open: Boolean, item?: Event }): void;
}

const EventsManagement = ({ search, setEventForm }: EventsManagementProps) => {
    const eventsFetchRes = useGetEventsQuery();
    const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsFetchRes.data?.events || []);
    const [loading, setLoading] = useState<boolean>(eventsFetchRes.loading);
    useLoadingDataHook({ loading: eventsFetchRes.loading, setLoading });

    const getEventsView = () =>
        loading ?
            <LoadingSpinner />
            :
            <>
                <h4>Total Events: {eventsFetchRes.data?.events?.length}</h4>
                <ItemsTable handleEditItem={(event: Event) => setEventForm({ open: true, item: event })} type={ItemType.Event} headers={columnsForEventsTable} items={filteredEvents} setItems={(newItems: Event[]) => setFilteredEvents(newItems)}
                    search={search} />
            </>

    return <Box>
        <EventsTableFilters setEvents={setFilteredEvents} data={eventsFetchRes.data?.events} />
        {getEventsView()}
    </Box>
};

export default EventsManagement;

