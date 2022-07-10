import { Box, DialogContent, DialogContentText, DialogTitle, SxProps } from "@mui/material";
import { Color, ColorPicker, createColor } from "material-ui-color";
import InvitedGuestsField from "./custom-form-fields/InvitedGuestsField";
import DateTextField from "./custom-form-fields/DateTextField";
import { Event, useCreateEventMutation, useUpdateEventMutation } from "../../generated/graphql";
import { GET_ALL_EVENTS, GET_TODAY_TASKS_AND_EVENTS } from "../../graphql/Queries";
import { useState } from "react";
import { pink } from "@mui/material/colors";
import { useEnterButtonHook } from "../../custom-listeners-hooks/useEnterButtonHook";
import { useEscButtonHook } from "../../custom-listeners-hooks/useEscButtonHook";
import { validateEventInputs } from "./item-form-utils";
import BasicItemFields from "./BasicItemFields";
import FormTextField from "./custom-form-fields/FormTextField";
import CustomDialogActions from "./CustomDialogActions";

interface EventFormProps {
    itemToUpdate?: Event;
    handleClose: () => void;
}

const colorPickerBox: SxProps = { display: "flex", marginBottom: "5%" };
const colorPickerTitle: SxProps = { marginTop: "2%", marginRight: "3%" };

const EventForm = ({ itemToUpdate, handleClose }: EventFormProps) => {
    const [createEvent] = useCreateEventMutation({ refetchQueries: [{ query: GET_TODAY_TASKS_AND_EVENTS }, { query: GET_ALL_EVENTS }] });
    const [updateEvent] = useUpdateEventMutation({ refetchQueries: [{ query: GET_TODAY_TASKS_AND_EVENTS }] });

    let [eventInputs, setEventInputs] = useState<Event>({
        _id: itemToUpdate?._id || "", description: itemToUpdate?.description || "", title: itemToUpdate?.title || "",
        beginningTime: itemToUpdate?.beginningTime || "", endingTime: itemToUpdate?.endingTime || "", color: itemToUpdate?.color || pink[200], location: itemToUpdate?.location || "",
        notificationTime: itemToUpdate?.notificationTime || "", invitedGuests: itemToUpdate?.invitedGuests || []
    })

    const formSubmit = (event?: React.SyntheticEvent): void => {
        event?.preventDefault();
        if (validateEventInputs(eventInputs)) {
            !itemToUpdate ?
                createEvent({ variables: { data: { ...eventInputs, _id: undefined } } })
                :
                updateEvent({ variables: { data: { ...eventInputs } } });
            handleClose();
        }
    }

    useEnterButtonHook({ handleConfirm: formSubmit });
    useEscButtonHook({ handleCancel: handleClose });

    return <>
        <DialogTitle>{`${itemToUpdate ? "Update" : "Create"} Event`} </DialogTitle>
        <DialogContent>
            <DialogContentText> Details: </DialogContentText>
            <BasicItemFields inputs={eventInputs} setInputs={(inputs: Event) => setEventInputs(inputs)} />
            <DateTextField label="Beginning Date" value={eventInputs.beginningTime} setInput={(newBeginningTime) => setEventInputs({ ...eventInputs, beginningTime: newBeginningTime })} />
            <DateTextField label="Ending Time" value={eventInputs.endingTime} setInput={(newEndingTime) => setEventInputs({ ...eventInputs, endingTime: newEndingTime })} />
            <DateTextField label="Notification Time" value={eventInputs.notificationTime} setInput={(newnNotificationTime) => setEventInputs({ ...eventInputs, notificationTime: newnNotificationTime })} />
            <FormTextField margin="normal" label="Location" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventInputs({ ...eventInputs, location: event.target.value })} value={eventInputs.location} />
            <Box sx={colorPickerBox}>
                <Box sx={colorPickerTitle}>Color:</Box> <ColorPicker hideTextfield value={createColor(eventInputs.color)} onChange={(newColor: Color) => setEventInputs({ ...eventInputs, color: `#${newColor.hex}` })} />
            </Box>
            <div>Invited Guests: </div> <InvitedGuestsField invitedGuests={eventInputs.invitedGuests} setInvitedGuests={(newInvitedGuests: string[]) => setEventInputs({ ...eventInputs, invitedGuests: newInvitedGuests })} />
        </DialogContent>
        <CustomDialogActions handleClose={handleClose} formSubmit={formSubmit} action={itemToUpdate ? "Update" : "Create"} />
    </>
};

export default EventForm;