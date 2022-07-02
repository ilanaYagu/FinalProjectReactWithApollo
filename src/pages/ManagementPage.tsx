import { Box } from "@mui/material";
import { useState } from "react";
import { ItemType } from "../types/managementTableTypes";
import SearchField from "../components/SearchField/SearchField";
import { useSearchShortcutHook } from "../listeners-hooks/useSearchShortcut";
import TasksManagement from "../components/TasksManagement/TasksManagement";
import EventsManagement from "../components/EventsManagement/EventsManagement";
import TodayManagement from "../components/TodayManagement/TodayManagement";

interface ManagementPageProps {
    type?: ItemType;
}

const ManagementPage = ({ type }: ManagementPageProps) => {
    const [search, setSearch] = useState<string>("");
    useSearchShortcutHook();

    return <Box marginLeft="22%">
        <h1>{type ? `${type}s` : "Today"} Management</h1>
        <SearchField id="search" setSearch={setSearch} />
        {
            !type &&
            <TodayManagement search={search} />
        }
        {
            type === ItemType.Event &&
            <EventsManagement search={search} />
        }
        {
            type === ItemType.Task &&
            <TasksManagement search={search} />
        }
    </Box>
};

export default ManagementPage;

