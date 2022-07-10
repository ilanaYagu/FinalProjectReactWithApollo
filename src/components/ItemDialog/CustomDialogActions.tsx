import { Button, DialogActions } from "@mui/material";


interface CustomDialogActionsProps {
    formSubmit(event?: React.SyntheticEvent): void;
    handleClose: () => void;
    action: string;
}

const CustomDialogActions = ({ formSubmit, handleClose, action }: CustomDialogActionsProps) =>
    <DialogActions sx={{ justifyContent: "center", mt: "8%" }}>
        <Button onClick={handleClose} color="secondary" variant="outlined"> Cancel </Button>
        <Button onClick={formSubmit} color="primary" type="submit" variant="contained"> {action} </Button>
    </DialogActions>


export default CustomDialogActions;