import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Event, PriorityType, StatusType, Task } from '../../generated/graphql';
import { ItemType } from '../../types/managementTableTypes';
import { ChangeCircleRounded } from '@mui/icons-material';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { onClickFilter } from "../../feature/dashboardFiltersSlice"

interface DashboardTableToggleFiltersProps {
    setDataTable(newData: (Event | Task)[]): void;
    data: { tasks: Task[], events: Event[] };
}

const DashboardTableToggleFilters = ({ setDataTable, data }: DashboardTableToggleFiltersProps) => {
    const allTodayEventsAndTasks = [...data.events, ...data.tasks];
    const filters = useSelector((state: RootState) => state.dashboardFilters.filters);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setDataTable(filteredData())
    }, [filters, data])

    const filteredData = (): (Event | Task)[] =>
        allTodayEventsAndTasks.filter(isItemMatchFilters)

    const isItemMatchFilters = (item: (Task | Event)): boolean => {
        let matchFilter = true;
        filters.map((filter) => {
            if (filter.active) {
                matchFilter = matchFilter && filter.checkMatch(item);
            }
        })
        return matchFilter;
    }

    return (
        <Box display="flex">
            {
                filters.map((filter) =>
                    <Button sx={{ mr: "1%", fontSize: "12px", height: "80%", backgroundColor: filter.active ? "#b599b0" : "#78536d" }} variant="contained"
                        onClick={() => dispatch(onClickFilter(filter))}>{filter.filter}</Button>
                )
            }
        </Box>
    );
};

export default DashboardTableToggleFilters;

