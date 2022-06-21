import { Event, Task } from "./generated/graphql";
import { TableHeaders } from "./types/managementTableTypes";

export const columnsForTasksTable: TableHeaders<Task> = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    status: "Status",
    estimatedTime: "Estimated Time",
    other: "Other",
    actions: "Actions"
};

export const columnsForTodayTasksAndEventsTable: TableHeaders<Task> | TableHeaders<Event> = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    other: "Other",
    actions: "Actions"
};

export const columnsForEventsTable: TableHeaders<Event> = {
    color: "Color",
    title: "Title",
    beginningTime: "From",
    endingTime: "Until",
    location: "Location",
    actions: "Actions"
};





