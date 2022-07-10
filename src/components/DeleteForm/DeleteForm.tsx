import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SxProps } from "@mui/material";
import { useEnterButtonHook } from "../../custom-listeners-hooks/useEnterButtonHook";
import { useEscButtonHook } from "../../custom-listeners-hooks/useEscButtonHook";
import { Event, Task, useDeleteEventMutation, useDeleteTaskMutation } from "../../generated/graphql";
import { GET_ALL_EVENTS, GET_ALL_TASKS, GET_TODAY_TASKS_AND_EVENTS } from "../../graphql/Queries";
import { ItemType } from "../../types/managementTableTypes";


const dialogActionsStyle: SxProps = { justifyContent: "center", mt: "8%" };

interface DeleteItemFormProps {
    item: Event | Task;
    open: boolean;
    handleClose: () => void;
}

function DeleteItemForm({ item, open, handleClose }: DeleteItemFormProps) {
    const [deleteEvent] = useDeleteEventMutation({ refetchQueries: [{ query: GET_TODAY_TASKS_AND_EVENTS }, { query: GET_ALL_EVENTS }] });
    const [deleteTask] = useDeleteTaskMutation({ refetchQueries: [{ query: GET_TODAY_TASKS_AND_EVENTS }, { query: GET_ALL_TASKS }] });

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
        <DialogActions sx={dialogActionsStyle}>
            <Button onClick={handleClose} variant="outlined" color="secondary" >
                Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleDelete}>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
};

export default DeleteItemForm;