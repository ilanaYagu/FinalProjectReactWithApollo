import { Box, Button } from "@mui/material";
import { useRef, useState } from "react";
import { ItemType } from "../types/managementTableTypes";
import SearchField from "../components/SearchField/SearchField";
import { useSearchShortcutHook } from "../custom-listeners-hooks/useSearchShortcut";
import TasksManagement from "../components/TasksManagement/TasksManagement";
import EventsManagement from "../components/EventsManagement/EventsManagement";
import TodayManagement from "../components/TodayManagement/TodayManagement";
import { Event, Task } from "../generated/graphql";
import ItemDialog from "../components/ItemDialog/ItemDialog";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const addButtonStyle = { fontWeight: 'bold', m: '1%' };

interface ManagementPageProps {
    type?: ItemType;
}

const ManagementPage = ({ type }: ManagementPageProps) => {
    const [search, setSearch] = useState<string>("");
    const [itemForm, setItemForm] = useState<{ open: Boolean, item?: Task | Event }>();
    const searchInputRef = useRef<HTMLDivElement>(null);
    useSearchShortcutHook({ searchInputRef });

    const getManagementPage = () =>
        !type ?
            <TodayManagement setItemForm={setItemForm} search={search} />
            :
            type === ItemType.Event ?
                <EventsManagement setEventForm={setItemForm} search={search} />
                :
                <TasksManagement setTaskForm={setItemForm} search={search} />

    return <Box marginLeft="22%">
        <h1>{type ? `${type}s` : "Today"} Management</h1>
        <SearchField inputRef={searchInputRef} setSearch={setSearch} />
        <Button variant="contained" sx={addButtonStyle} onClick={() => setItemForm({ open: true })} startIcon={type === ItemType.Event ? <CalendarMonthRoundedIcon /> : <AddTaskIcon />}>
            Add {type}
        </Button>
        {getManagementPage()}
        {
            itemForm?.open &&
            <ItemDialog handleClose={() => setItemForm({ open: false })} itemToUpdate={itemForm?.item} type={type} />
        }
    </Box>
};

export default ManagementPage;

