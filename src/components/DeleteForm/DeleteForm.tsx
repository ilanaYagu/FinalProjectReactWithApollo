import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { BasicItem } from '../../classes/BasicItem';
import { Task } from '../../classes/Task';
import { useDeleteEventMutation, useDeleteTaskMutation } from "../../generated/graphql";
import { GET_ALL_EVENTS, GET_ALL_TASKS } from "../../graphql/Queries";

interface DeleteItemFormProps {
    item: BasicItem;
    open: boolean;
    handleClose: () => void;
}

function DeleteItemForm({ item, handleClose, open }: DeleteItemFormProps) {
    const [deleteEvent] = useDeleteEventMutation({
        refetchQueries: [
            { query: GET_ALL_EVENTS },
        ],
    });
    const [deleteTask] = useDeleteTaskMutation({
        refetchQueries: [
            { query: GET_ALL_TASKS }
        ],
    }
    );

    const handleDelete = (): void => {
        item instanceof Task ?
            deleteTask({ variables: { id: item._id } }) : deleteEvent({ variables: { id: item._id } });
        handleClose();
    }

    return (
        <Dialog open={open} >
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete "{item.title}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", mt: "8%" }}>
                <Button onClick={() => handleClose()} variant="outlined" color="secondary" >
                    Cancel
                </Button>
                <Button type="submit" variant="contained" onClick={() => handleDelete()} >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteItemForm;