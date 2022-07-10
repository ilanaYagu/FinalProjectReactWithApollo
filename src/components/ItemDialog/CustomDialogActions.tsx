import { Button, DialogActions, SxProps } from "@mui/material";

const customDialogActionsStyle: SxProps = { justifyContent: "center", mt: "8%" };

interface CustomDialogActionsProps {
    formSubmit(event?: React.SyntheticEvent): void;
    handleClose: () => void;
    action: string;
}

const CustomDialogActions = ({ formSubmit, handleClose, action }: CustomDialogActionsProps) =>
    <DialogActions sx={customDialogActionsStyle}>
        <Button onClick={handleClose} color="secondary" variant="outlined"> Cancel </Button>
        <Button onClick={formSubmit} color="primary" type="submit" variant="contained"> {action} </Button>
    </DialogActions>


export default CustomDialogActions;