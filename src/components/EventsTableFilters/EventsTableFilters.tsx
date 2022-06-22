import { useEffect, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { isFutureDate, isToday } from '../../date-utils';
import { Event } from '../../generated/graphql';
import { AppDispatch, RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { BeginningTimeEventFilterType, chooseBeginningTimeEventsFilter } from '../../feature/activeFiltersSlice';
import { useDispatch } from 'react-redux';

interface EventsTableFiltersProps {
    setEvents(events: Event[]): void;
    data?: Event[];
}

const EventsTableFilters = ({ setEvents, data }: EventsTableFiltersProps) => {
    const beginningTimeFilter = useSelector((state: RootState) => state.activeFilters.beginningTimeEventsFilter);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setEvents(filteredEvents() || []);
    }, [beginningTimeFilter, data])

    const filteredEvents = (): Event[] | undefined =>
        data?.filter((event: Event) => {
            const eventDate = new Date(event.beginningTime);
            if (beginningTimeFilter === BeginningTimeEventFilterType.All) {
                return true;
            }
            else if (beginningTimeFilter === BeginningTimeEventFilterType.TodayEvents) {
                return isToday(eventDate);
            }
            else {
                return isFutureDate(eventDate)
            }
        })

    return (
        <Select sx={{ mt: "1.5%" }} size="small" value={beginningTimeFilter} onChange={(event: SelectChangeEvent<string>) => dispatch(chooseBeginningTimeEventsFilter(event.target.value as BeginningTimeEventFilterType))}>
            {
                Object.values(BeginningTimeEventFilterType).map((value) => {
                    return <MenuItem key={value} value={value}>{value}</MenuItem>
                })
            }
        </Select>
    );
};

export default EventsTableFilters;

