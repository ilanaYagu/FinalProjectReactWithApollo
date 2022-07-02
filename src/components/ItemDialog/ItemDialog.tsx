import { useState } from 'react';
import { Box, Dialog, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import TaskForm from './TaskForm';
import EventForm from './EventForm';
import { ItemType } from '../../types/managementTableTypes';
import { Event, Task } from '../../generated/graphql';

interface ItemDialogProps {
    handleClose: () => void;
    itemToUpdate?: Event | Task;
    type?: formType;
}

type formType = 'Event' | 'Task';
const DEFAULT_FORM_TYPE: formType = 'Event';

const ItemDialog = ({ handleClose, itemToUpdate, type }: ItemDialogProps) => {
    let [formType, setFormType] = useState<formType | undefined>(type || itemToUpdate?.__typename || DEFAULT_FORM_TYPE);

    const getSwitchType = () =>
        <Box display="-ms-flexbox" sx={{ marginLeft: "5%", marginTop: "5%" }} >
            Choose Type:
            <Select sx={{ width: "30%", height: "70%", marginLeft: "5%" }} value={formType} label="Type" onChange={(event: SelectChangeEvent<string>) => setFormType(event.target.value as ItemType)}>
                {
                    Object.values(ItemType).map((typeOption) =>
                        <MenuItem key={typeOption} value={typeOption}>{typeOption}</MenuItem>
                    )
                }
            </Select>
        </Box>

    return <Dialog open={true} PaperProps={{ sx: { width: "20%", height: "60%" } }} scroll="paper">
        {
            !(itemToUpdate || type) &&
            getSwitchType()
        }
        {
            formType === ItemType.Task ?
                <TaskForm handleClose={handleClose} itemToUpdate={itemToUpdate?.__typename === ItemType.Task ? itemToUpdate : undefined} /> :
                <EventForm handleClose={handleClose} itemToUpdate={itemToUpdate?.__typename === ItemType.Event ? itemToUpdate : undefined} />
        }
    </Dialog>
};

export default ItemDialog;


