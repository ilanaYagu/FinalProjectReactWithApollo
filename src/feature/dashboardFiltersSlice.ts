import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event, PriorityType, StatusType, Task } from "../generated/graphql";
import { ItemType } from "../types/managementTableTypes";

enum TodayTableFilterType {
    TasksOnly = "Tasks",
    EventsOnly = "Events",
    UncompletedTasks = "Uncompleted tasks",
    HighPriorityTasks = "High priority tasks"
}

interface DashboardTableFilter {
    active: boolean;
    filter: TodayTableFilterType;
    checkMatch: (item: Event | Task) => boolean;
}

interface DashboardFiltersState {
    filters: DashboardTableFilter[];
}

const initialDashboardFiltersState: DashboardFiltersState = {
    filters: [
        { active: false, filter: TodayTableFilterType.TasksOnly, checkMatch: (item: Event | Task) => item.__typename === ItemType.Task },
        { active: false, filter: TodayTableFilterType.EventsOnly, checkMatch: (item: Event | Task) => item.__typename === ItemType.Event },
        { active: false, filter: TodayTableFilterType.UncompletedTasks, checkMatch: (item: Event | Task) => item.__typename === ItemType.Task && item.status !== StatusType.Done },
        { active: false, filter: TodayTableFilterType.HighPriorityTasks, checkMatch: (item: Event | Task) => item.__typename === ItemType.Task && item.priority === PriorityType.Top }]
};


const DashboardFiltersSlice = createSlice({
    name: 'DashboardFilters',
    initialState: initialDashboardFiltersState,
    reducers: {
        onClickFilter: (state, action: PayloadAction<DashboardTableFilter>): void => {
            const newActiveStatus = !action.payload.active;
            const nfilters = state.filters.slice();
            nfilters.forEach((nfilter: DashboardTableFilter) => {
                nfilter.active = action.payload.filter === nfilter.filter ? newActiveStatus : false;
            });
            state.filters = nfilters;
        }
    }
})

export const { onClickFilter } = DashboardFiltersSlice.actions;
export default DashboardFiltersSlice.reducer;