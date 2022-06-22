import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ItemForm from "../components/ItemForm/ItemForm";
import { ItemType } from "../types/managementTableTypes";
import SearchField from "../components/SearchField/SearchField";
import { useSearchShortcutHook } from "../listeners-hooks/useSearchShortcut";
import TasksManagement from "../components/TasksManagement/TasksManagement";
import EventsManagement from "../components/EventsManagement/EventsManagement";
import TodayManagement from "../components/TodayManagement/TodayManagement";
import { AppDispatch, RootState } from "../app/store";
import { closeItemForm, openItemForm } from "../feature/modalsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface ManagementPageProps {
    type?: ItemType;
}

const ManagementPage = ({ type }: ManagementPageProps) => {
    const [search, setSearch] = useState<string>("");
    const showItemForm = useSelector((state: RootState) => state.modals.itemForm);
    const dispatch = useDispatch<AppDispatch>();
    useSearchShortcutHook();

    return (
        <Box>
            <>
                <h1>{type ? `${type}s` : "Today"} Management</h1>
                <SearchField id="search" setSearch={setSearch} />
                <Button variant="contained" sx={{ fontWeight: 'bold', m: '1%' }} onClick={() => dispatch(openItemForm({}))} startIcon={type === ItemType.Event ? <CalendarMonthRoundedIcon /> : <AddTaskIcon />}>
                    Add {type}
                </Button>
                {
                    !type ?
                        <TodayManagement search={search} />
                        :
                        type === ItemType.Event ?
                            <EventsManagement search={search} />
                            :
                            <TasksManagement search={search} />
                }
                {showItemForm.open &&
                    <ItemForm type={type ? type : (showItemForm.item ? (showItemForm.item.__typename === ItemType.Task ? ItemType.Task : ItemType.Event) : ItemType.Task)} enableSwitchType={type ? false : true} open={showItemForm.open} handleClose={() => dispatch(closeItemForm())} itemToUpdate={showItemForm.item} />}
            </>
        </Box>
    );
};

export default ManagementPage;

