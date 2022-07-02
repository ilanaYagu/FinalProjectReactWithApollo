import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEnterButtonHook } from "../../listeners-hooks/useEnterButtonHook";
import { useEscButtonHook } from "../../listeners-hooks/useEscButtonHook";
import { Event, Task, useDeleteEventMutation, useDeleteTaskMutation } from "../../generated/graphql";
import { GET_ALL_EVENTS, GET_ALL_TASKS, GET_TODAY_TASKS_AND_EVENTS } from "../../graphql/Queries";
import { ItemType } from "../../types/managementTableTypes";

interface DeleteItemFormProps {
    item: Event | Task;
    open: boolean;
    handleClose: () => void;
}

function DeleteItemForm({ item, open, handleClose }: DeleteItemFormProps) {

    const [deleteEvent] = useDeleteEventMutation({
        update: (cache, { data }) => {
            const cacheDataAllEvents = cache.readQuery({ query: GET_ALL_EVENTS }) as { events: Event[]; };
            const cacheTodayData = cache.readQuery({ query: GET_TODAY_TASKS_AND_EVENTS }) as { todayEvents: Event[]; todayTasks: Task[]; };
            if (data) {
                cacheDataAllEvents && cache.writeQuery({ query: GET_ALL_EVENTS, data: { events: cacheDataAllEvents.events.filter((event) => event._id !== data.deleteEvent?._id) } });
                cacheTodayData && cache.writeQuery({
                    query: GET_TODAY_TASKS_AND_EVENTS,
                    data: { todayEvents: cacheTodayData.todayEvents.filter((todayEvent) => todayEvent._id !== data.deleteEvent?._id), todayTasks: cacheTodayData.todayTasks }
                });
            }
        }
    });
    const [deleteTask] = useDeleteTaskMutation({
        update: (cache, { data }) => {
            const cacheDataAllTasks = cache.readQuery({ query: GET_ALL_TASKS }) as { tasks: Task[]; };
            const cacheTodayData = cache.readQuery({ query: GET_TODAY_TASKS_AND_EVENTS }) as { todayEvents: Event[]; todayTasks: Task[]; };
            if (data) {
                cacheDataAllTasks && cacheDataAllTasks && cache.writeQuery({ query: GET_ALL_TASKS, data: { tasks: cacheDataAllTasks.tasks.filter((task) => task._id !== data.deleteTask?._id) } });
                cacheTodayData && cache.writeQuery({
                    query: GET_TODAY_TASKS_AND_EVENTS,
                    data: { todayTasks: cacheTodayData.todayTasks.filter((todayTask) => todayTask._id !== data.deleteTask?._id), todayEvents: cacheTodayData.todayEvents }
                });
            }
        }
    });

    const handleDelete = (): void => {
        item.__typename === ItemType.Task ?
            deleteTask({ variables: { id: item._id } }) : deleteEvent({ variables: { id: item._id } });
        handleClose();
    }

    useEnterButtonHook({ handleConfirm: handleDelete });
    useEscButtonHook({ handleCancel: handleClose });

    return <Dialog open={open} >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete "{item.title}"?
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mt: "8%" }}>
            <Button onClick={handleClose} variant="outlined" color="secondary" >
                Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={() => handleDelete()} >
                Delete
            </Button>
        </DialogActions>
    </Dialog>
};

export default DeleteItemForm;