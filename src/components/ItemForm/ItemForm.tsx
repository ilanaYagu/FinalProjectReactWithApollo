import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select, SelectChangeEvent, TextareaAutosize } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TaskForm from './TaskForm';
import EventForm from './EventForm';
import validator from 'validator';
import { ItemType } from '../../types/managementTableTypes';
import { pink } from '@mui/material/colors';
import { validateEventInputs, validateTaskInputs } from './item-form-utils';
import { Event, PriorityType, StatusType, Task, useCreateEventMutation, useCreateTaskMutation, useUpdateEventMutation, useUpdateTaskMutation } from '../../generated/graphql';
import { GET_ALL_EVENTS, GET_ALL_TASKS, GET_TODAY_TASKS_AND_EVENTS } from '../../graphql/Queries';
import { filterTodayItems } from '../../date-utils';
import { useEnterEscButtonsHook } from '../../custom-hooks/useEnterEscButtonsHook';

export type TaskInputs = Omit<Task, "_id" | "title" | "description">;
export type EventInputs = Omit<Event, "_id" | "title" | "description">;

interface ItemFormProps {
    type: ItemType;
    enableSwitchType?: boolean;
    open: boolean;
    handleClose: () => void;
    itemToUpdate?: Event | Task;
}

const useStyles = makeStyles({
    dialog: {
        height: "60%",
        width: "20%"
    },
    chooseTypeTitle: {
        marginRight: "5%"
    },
    formField: {
        width: "85%",
        backgroundColor: "inherit",
        color: "white"
    }
});

const ItemForm = ({ type, enableSwitchType, open, handleClose, itemToUpdate }: ItemFormProps) => {
    const classes = useStyles();

    const [createEvent] = useCreateEventMutation({
        update: (cache, { data }) => {
            const cacheDataAllEvents = cache.readQuery({ query: GET_ALL_EVENTS }) as { events: Event[]; };
            const cacheDataTodayData = cache.readQuery({ query: GET_TODAY_TASKS_AND_EVENTS }) as { todayTasks: Task[]; todayEvents: Event[] };
            if (data?.createEvent) {
                cacheDataAllEvents && cache.writeQuery({ query: GET_ALL_EVENTS, data: { events: [...cacheDataAllEvents.events, data.createEvent] } });
                if (cacheDataTodayData && filterTodayItems([data.createEvent]).length) {
                    cache.writeQuery({
                        query: GET_TODAY_TASKS_AND_EVENTS,
                        data: {
                            ...data,
                            todayEvents: [...cacheDataTodayData.todayEvents, data.createEvent],
                        }
                    });
                }
            }
        }
    });

    const [createTask] = useCreateTaskMutation({
        update: (cache, { data }) => {
            const cacheDataAllTasks = cache.readQuery({ query: GET_ALL_TASKS }) as { tasks: Task[]; };
            const cacheDataTodayData = cache.readQuery({ query: GET_TODAY_TASKS_AND_EVENTS }) as { todayTasks: Task[]; todayEvents: Event[] };
            if (data?.createTask) {
                cacheDataAllTasks && cache.writeQuery({ query: GET_ALL_TASKS, data: { tasks: [...cacheDataAllTasks.tasks, data.createTask] } });
                if (cacheDataTodayData && filterTodayItems([data.createTask]).length) {
                    cache.writeQuery({
                        query: GET_TODAY_TASKS_AND_EVENTS,
                        data: {
                            ...data,
                            todayTasks: [...cacheDataTodayData.todayTasks, data.createTask],
                        }
                    });
                }
            }
        }
    });

    const [updateEvent] = useUpdateEventMutation({
        refetchQueries: [{ query: GET_TODAY_TASKS_AND_EVENTS }]
    });
    const [updateTask] = useUpdateTaskMutation({
        refetchQueries: [{ query: GET_TODAY_TASKS_AND_EVENTS }]
    });

    let [baseInputs, setBaseInputs] = useState<{ _id: string, title: string, description: string }>({ title: "", _id: "", description: "" })
    let [taskInputs, setTaskInputs] = useState<TaskInputs>({
        status: StatusType.Open, estimatedTime: "", priority: PriorityType.Low,
        review: " ", timeSpent: "", untilDate: "",
    });
    let [eventInputs, setEventInputs] = useState<EventInputs>({
        beginningTime: "", endingTime: "", color: pink[200], location: "",
        notificationTime: "", invitedGuests: []
    })
    let [buttonText, setButtonText] = useState<string>("");
    let [formType, setFormType] = useState<ItemType>(type);

    useEffect(() => {
        if (itemToUpdate) {
            setButtonText("Update");
            setBaseInputs({ ...baseInputs, _id: itemToUpdate._id, title: itemToUpdate.title, description: itemToUpdate.description });
            if (itemToUpdate.__typename === ItemType.Task)
                setTaskInputs({ ...taskInputs, status: itemToUpdate.status, estimatedTime: itemToUpdate.estimatedTime, priority: itemToUpdate.priority, timeSpent: itemToUpdate.timeSpent, untilDate: itemToUpdate.untilDate, review: itemToUpdate.review })
            else if (itemToUpdate.__typename === ItemType.Event) {
                setEventInputs({ ...eventInputs, color: itemToUpdate.color, beginningTime: itemToUpdate.beginningTime, endingTime: itemToUpdate.endingTime, location: itemToUpdate.location, notificationTime: itemToUpdate.notificationTime, invitedGuests: itemToUpdate.invitedGuests })
            }
        } else {
            setButtonText("Create");
        }
    }, []);

    const formSubmit = (event?: React.SyntheticEvent): void => {
        event?.preventDefault();
        if (isValidFields()) {
            if (!itemToUpdate) {
                formType as string === ItemType.Task ?
                    createTask({ variables: { data: { ...taskInputs, _id: undefined, title: baseInputs.title, description: baseInputs.description } } }) :
                    createEvent({ variables: { data: { ...eventInputs, _id: undefined, title: baseInputs.title, description: baseInputs.description } } });
            }
            else {

                formType as string === ItemType.Task ?
                    updateTask({ variables: { data: { ...taskInputs, ...baseInputs } } }) :
                    updateEvent({ variables: { data: { ...eventInputs, ...baseInputs } } });
            }
            handleClose();
        }
    }

    useEnterEscButtonsHook({ handleCancel: handleClose, handleConfirm: formSubmit })

    const isValidFields = (): boolean => {
        let isValid: boolean = true;
        if (validator.trim(baseInputs.title) === "" || validator.trim(baseInputs.description) === "") {
            alert("Please fill the Required Fields");
            isValid = false;
        }
        if (formType === ItemType.Event) {
            isValid = validateEventInputs(eventInputs);
        } else if (formType === ItemType.Task) {
            isValid = validateTaskInputs(taskInputs);
        }
        return isValid;
    }

    const getBaseDetails = (): JSX.Element =>
        <>
            <TextField className={classes.formField} margin="normal" label="Title" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBaseInputs({ ...baseInputs, title: event.target.value })} value={baseInputs.title} required />
            Description * : <TextareaAutosize minRows={3} maxRows={5} className={classes.formField} placeholder="Enter desc..." defaultValue={baseInputs.description}
                onChange={(event: React.FormEvent) => setBaseInputs({ ...baseInputs, description: (event.target as HTMLInputElement).value })} required />
        </>

    const getDialogActions = (): JSX.Element =>
        <DialogActions sx={{ justifyContent: "center", mt: "8%" }}>
            <Button onClick={handleClose} color="secondary" variant="outlined"> Cancel </Button>
            <Button onClick={formSubmit} color="primary" type="submit" variant="contained"> {buttonText} </Button>
        </DialogActions>

    const getSwitchType = () =>
        (enableSwitchType && !itemToUpdate) &&
        <>
            <span className={classes.chooseTypeTitle}>Choose Type:</span>
            <Select value={formType} label="Type" onChange={(event: SelectChangeEvent<string>) => setFormType(event.target.value as ItemType)}>
                {
                    Object.values(ItemType).map((typeOption) =>
                        <MenuItem value={typeOption}>{typeOption}</MenuItem>
                    )
                }
            </Select>
        </>

    return (
        <Dialog open={open} classes={{ paper: classes.dialog }} scroll="paper">
            <DialogTitle>{buttonText + " " + formType} </DialogTitle>
            <DialogContent>
                <DialogContentText> Details: </DialogContentText>
                {getSwitchType()}
                {getBaseDetails()}
                {
                    formType === ItemType.Task ?
                        <TaskForm taskInputs={taskInputs} setTaskInputs={setTaskInputs} classField={classes.formField} />
                        :
                        <EventForm eventInputs={eventInputs} setEventInputs={setEventInputs} classField={classes.formField} />
                }
            </DialogContent>
            {getDialogActions()}
        </Dialog >
    );
};

export default ItemForm;


