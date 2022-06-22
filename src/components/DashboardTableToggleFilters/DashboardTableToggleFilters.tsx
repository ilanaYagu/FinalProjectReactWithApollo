import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Event, PriorityType, StatusType, Task } from '../../generated/graphql';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { chooseDashboardFilter, TodayTableFilterType } from "../../feature/activeFiltersSlice"
import { ItemType } from '../../types/managementTableTypes';

interface DashboardTableFilter {
    active: boolean;
    filter: TodayTableFilterType;
    checkMatch: (item: Event | Task) => boolean;
}

interface DashboardTableToggleFiltersProps {
    setDataTable(newData: (Event | Task)[]): void;
    data?: { todayTasks: Task[], todayEvents: Event[] };
}

const DashboardTableToggleFilters = ({ setDataTable, data }: DashboardTableToggleFiltersProps) => {
    const allTodayEventsAndTasks = data ? [...data.todayEvents, ...data.todayTasks] : [];
    const activeFilter = useSelector((state: RootState) => state.activeFilters.dashboardFilter);
    const [filters, setFilters] = useState<DashboardTableFilter[]>([
        { active: activeFilter === TodayTableFilterType.TasksOnly, filter: TodayTableFilterType.TasksOnly, checkMatch: (item: Event | Task) => item.__typename === ItemType.Task },
        { active: activeFilter === TodayTableFilterType.EventsOnly, filter: TodayTableFilterType.EventsOnly, checkMatch: (item: Event | Task) => item.__typename === ItemType.Event },
        { active: activeFilter === TodayTableFilterType.UncompletedTasks, filter: TodayTableFilterType.UncompletedTasks, checkMatch: (item: Event | Task) => item.__typename === ItemType.Task && item.status !== StatusType.Done },
        { active: activeFilter === TodayTableFilterType.HighPriorityTasks, filter: TodayTableFilterType.HighPriorityTasks, checkMatch: (item: Event | Task) => item.__typename === ItemType.Task && item.priority === PriorityType.Top }])

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setDataTable(allTodayEventsAndTasks.filter(isItemMatchFilters))
    }, [filters, data])

    const isItemMatchFilters = (item: (Task | Event)): boolean => {
        let matchFilter = true;
        filters.map((filter) => {
            if (filter.active) {
                matchFilter = matchFilter && filter.checkMatch(item);
            }
        })
        return matchFilter;
    }

    const onClickFilter = (filter: DashboardTableFilter): void => {
        const newActiveStatus = !filter.active;
        setFilters(filters.map((nfilter: DashboardTableFilter) => {
            nfilter.active = filter.filter === nfilter.filter ? newActiveStatus : false;
            return nfilter;
        }));
        dispatch(chooseDashboardFilter(filter.filter));
    }

    return (
        <Box display="flex" marginTop={"2%"}>
            {
                filters.map((filter) =>
                    <Button key={filter.filter} sx={{ mr: "1%", fontSize: "14px", height: "80%", backgroundColor: filter.active ? "#b599b0" : "#78536d" }} variant="contained"
                        onClick={() => onClickFilter(filter)}>{filter.filter}</Button>
                )
            }
        </Box>
    );
};

export default DashboardTableToggleFilters;

