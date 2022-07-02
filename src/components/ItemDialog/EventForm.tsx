import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Color, ColorPicker, createColor } from "material-ui-color";
import InvitedGuestsField from "./custom-form-fields/InvitedGuestsField";
import { makeStyles } from "@mui/styles";
import DateTextField from "./custom-form-fields/DateTextField";
import { Event, Task, useCreateEventMutation, useUpdateEventMutation } from "../../generated/graphql";
import { filterTodayItems } from "../../date-utils";
import { GET_ALL_EVENTS, GET_TODAY_TASKS_AND_EVENTS } from "../../graphql/Queries";
import { useState } from "react";
import { pink } from "@mui/material/colors";
import { useEnterButtonHook } from "../../listeners-hooks/useEnterButtonHook";
import { useEscButtonHook } from "../../listeners-hooks/useEscButtonHook";
import { validateEventInputs } from "./item-form-utils";
import BasicItemFields from "./BasicItemFields";
import FormTextField from "./custom-form-fields/FormTextFiled";

interface EventFormProps {
    itemToUpdate?: Event;
    classField?: string;
    handleClose: () => void;
}

const useStyles = makeStyles({
    colorPicker: {
        display: "flex",
        marginBottom: "5%"
    },
    colorPickerTitle: {
        marginTop: "2%",
        marginRight: "3%"
    }
});

const EventForm = ({ itemToUpdate, classField, handleClose }: EventFormProps) => {
    const classes = useStyles();

    const [createEvent] = useCreateEventMutation({
        update: (cache, { data }) => {
            const cacheDataAllEvents = cache.readQuery({ query: GET_ALL_EVENTS }) as { events: Event[]; };
            const cacheTodayData = cache.readQuery({ query: GET_TODAY_TASKS_AND_EVENTS }) as { todayTasks: Task[]; todayEvents: Event[] };
            if (data?.createEvent) {
                cacheDataAllEvents && cache.writeQuery({ query: GET_ALL_EVENTS, data: { events: [...cacheDataAllEvents.events, data.createEvent] } });
                if (cacheTodayData && filterTodayItems([data.createEvent]).length) {
                    cache.writeQuery({
                        query: GET_TODAY_TASKS_AND_EVENTS,
                        data: { todayTasks: cacheTodayData.todayTasks, todayEvents: [...cacheTodayData.todayEvents, data.createEvent], }
                    });
                }
            }
        }
    });

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

    const getDialogActions = (): JSX.Element =>
        <DialogActions sx={{ justifyContent: "center", mt: "8%" }}>
            <Button onClick={handleClose} color="secondary" variant="outlined"> Cancel </Button>
            <Button onClick={formSubmit} color="primary" type="submit" variant="contained"> {itemToUpdate ? "Update" : "Create"} </Button>
        </DialogActions>


    return <>
        <DialogTitle>{`${itemToUpdate ? "Update" : "Create"} Event`} </DialogTitle>
        <DialogContent>
            <DialogContentText> Details: </DialogContentText>
            <BasicItemFields inputs={eventInputs} setInputs={(inputs: Event) => setEventInputs(inputs)} />
            <DateTextField label="Beginning Date" value={eventInputs.beginningTime} setInput={(newBeginningTime) => setEventInputs({ ...eventInputs, beginningTime: newBeginningTime })} />
            <DateTextField label="Ending Time" value={eventInputs.endingTime} setInput={(newEndingTime) => setEventInputs({ ...eventInputs, endingTime: newEndingTime })} />
            <DateTextField label="Notification Time" value={eventInputs.notificationTime} setInput={(newnNotificationTime) => setEventInputs({ ...eventInputs, notificationTime: newnNotificationTime })} />
            <FormTextField margin="normal" className={classField} label="Location" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventInputs({ ...eventInputs, location: event.target.value })} value={eventInputs.location} />
            <div className={classes.colorPicker}>
                <div className={classes.colorPickerTitle}>Color:</div> <ColorPicker hideTextfield value={createColor(eventInputs.color)} onChange={(newColor: Color) => setEventInputs({ ...eventInputs, color: `#${newColor.hex}` })} />
            </div>
            <div>Invited Guests: </div> <InvitedGuestsField invitedGuests={eventInputs.invitedGuests} setInvitedGuests={(newInvitedGuests: string[]) => setEventInputs({ ...eventInputs, invitedGuests: newInvitedGuests })} />
        </DialogContent>
        {getDialogActions()}
    </>
};

export default EventForm;