import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ItemsTable from "../ItemsTable/ItemsTable";
import { Event, useGetEventsQuery } from "../../generated/graphql";
import { columnsForEventsTable } from "../../constants";
import EventsTableFilters from "../EventsTableFilters/EventsTableFilters";
import { ItemType } from "../../types/managementTableTypes";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ItemDialog from "../ItemDialog/ItemDialog";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface EventsManagementProps {
    search: string;
}

const EventsManagement = ({ search }: EventsManagementProps) => {
    const eventsFetchRes = useGetEventsQuery()
    const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsFetchRes.data?.events || []);
    const [isOpenEventForm, setIsOpenEventForm] = useState<boolean>(false);
    const [eventToUpdate, setEventToUpdate] = useState<Event>();
    const [loading, setLoading] = useState<boolean>(eventsFetchRes.loading);

    useEffect(() => {
        setTimeout(() => {
            setLoading(eventsFetchRes.loading)
        }, 200)
    }, [eventsFetchRes.loading])

    const getEventsView = () =>
        loading ?
            <LoadingSpinner />
            :
            <>
                <h4>Total Events: {eventsFetchRes.data?.events?.length}</h4>
                <ItemsTable handleEditItem={handleEditEvent} type={ItemType.Event} headers={columnsForEventsTable} items={filteredEvents} setItems={(newItems: Event[]) => setFilteredEvents(newItems)}
                    search={search} />
            </>

    const handleCloseEventForm = () => {
        setIsOpenEventForm(false);
        setEventToUpdate(undefined);
    }

    const handleEditEvent = (event: Event) => {
        setIsOpenEventForm(true);
        setEventToUpdate(event);
    }

    return <>
        <Button variant="contained" sx={{ fontWeight: 'bold', m: '1%' }} onClick={() => setIsOpenEventForm(true)} startIcon={<CalendarMonthRoundedIcon />}>
            Add Event
        </Button>
        <Box>
            <EventsTableFilters setEvents={setFilteredEvents} data={eventsFetchRes.data?.events} />
            {getEventsView()}
        </Box>
        {
            isOpenEventForm &&
            <ItemDialog handleClose={handleCloseEventForm} itemToUpdate={eventToUpdate} type={ItemType.Event} />
        }
    </>
};

export default EventsManagement;

