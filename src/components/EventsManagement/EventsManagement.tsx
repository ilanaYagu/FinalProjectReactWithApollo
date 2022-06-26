import { Box } from "@mui/material";
import { useState } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Event, useGetEventsQuery } from "../../generated/graphql";
import { columnsForEventsTable } from "../../constants";
import EventsTableFilters from "../EventsTableFilters/EventsTableFilters";
import { ItemType } from "../../types/managementTableTypes";

interface EventsManagementProps {
    search: string;
}

const EventsManagement = ({ search }: EventsManagementProps) => {
    const eventsFetchRes = useGetEventsQuery()
    const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsFetchRes.data?.events || []);

    const getItemsView = () =>
        <>
            {
                eventsFetchRes.loading ?
                    <Box sx={{ mt: "10%", textAlign: "center", color: "#F6E7E4" }}>
                        <h1>LOADING...</h1>
                    </Box>
                    :
                    <>
                        <h4>Total Events: {eventsFetchRes.data?.events?.length}</h4>
                        <ItemsTable type={ItemType.Event} headers={columnsForEventsTable} items={filteredEvents} setItems={(newItems: Event[]) => setFilteredEvents(newItems)}
                            search={search} />
                    </>
            }
        </>

    return (
        <Box>
            <EventsTableFilters setEvents={setFilteredEvents} data={eventsFetchRes.data?.events} />
            {getItemsView()}
        </Box>
    );
};

export default EventsManagement;

