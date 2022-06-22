import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TodayTableFilterType {
    TasksOnly = "Tasks",
    EventsOnly = "Events",
    UncompletedTasks = "Uncompleted tasks",
    HighPriorityTasks = "High priority tasks",
    All = "All"
}

export enum StatusFilterType {
    Open = "Open",
    Proceeding = "Proceeding",
    Done = "Done",
    All = "All Statuses"
}

export enum PriorityFilterType {
    Top = "Top",
    Regular = "Regular",
    Low = "Low",
    All = "All Priorities"
}

export enum BeginningTimeEventFilterType {
    TodayEvents = "Today Events",
    FutureEvents = "Future Events",
    All = "All Events"
}

interface ActiveFiltersState {
    dashboardFilter: TodayTableFilterType;
    statusTasksFilter: StatusFilterType;
    priorityTasksFilter: PriorityFilterType;
    beginningTimeEventsFilter: BeginningTimeEventFilterType;
}

const initialActiveFiltersState: ActiveFiltersState = {
    dashboardFilter: TodayTableFilterType.All,
    statusTasksFilter: StatusFilterType.All,
    priorityTasksFilter: PriorityFilterType.All,
    beginningTimeEventsFilter: BeginningTimeEventFilterType.All
};


const ActiveFiltersSlice = createSlice({
    name: 'ActiveFilters',
    initialState: initialActiveFiltersState,
    reducers: {
        chooseDashboardFilter: (state, action: PayloadAction<TodayTableFilterType>): void => {
            if (state.dashboardFilter === action.payload) {
                state.dashboardFilter = TodayTableFilterType.All
            } else {
                state.dashboardFilter = action.payload
            }
        },
        chooseStatusTasksFilter: (state, action: PayloadAction<StatusFilterType>): void => {
            state.statusTasksFilter = action.payload;
        },
        choosePriorityTasksFilter: (state, action: PayloadAction<PriorityFilterType>): void => {
            state.priorityTasksFilter = action.payload;
        },
        chooseBeginningTimeEventsFilter: (state, action: PayloadAction<BeginningTimeEventFilterType>): void => {
            state.beginningTimeEventsFilter = action.payload;
        }
    }
})

export const { chooseDashboardFilter, choosePriorityTasksFilter, chooseStatusTasksFilter, chooseBeginningTimeEventsFilter } = ActiveFiltersSlice.actions;
export default ActiveFiltersSlice.reducer;