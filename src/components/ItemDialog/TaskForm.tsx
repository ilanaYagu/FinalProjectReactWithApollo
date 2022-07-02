import { Autocomplete, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextareaAutosize, TextField } from "@mui/material";
import DateTextField from './custom-form-fields/DateTextField';
import { PriorityType, StatusType, Task, useCreateTaskMutation, useUpdateTaskMutation } from "../../generated/graphql";
import { GET_ALL_TASKS, GET_TODAY_TASKS_AND_EVENTS } from "../../graphql/Queries";
import { filterTodayItems } from "../../date-utils";
import { useState } from "react";
import { validateTaskInputs } from "./item-form-utils";
import { useEnterButtonHook } from "../../listeners-hooks/useEnterButtonHook";
import { useEscButtonHook } from "../../listeners-hooks/useEscButtonHook";
import BasicItemFields from "./BasicItemFields";
import FormTextField from "./custom-form-fields/FormTextFiled";

export const statusesOptions: string[] = Object.values(StatusType);
export const priorityOptions: string[] = Object.values(PriorityType);

interface TaskFormProps {
    itemToUpdate?: Task;
    handleClose: () => void;
}

const TaskForm = ({ itemToUpdate, handleClose }: TaskFormProps) => {

    const [createTask] = useCreateTaskMutation({
        update: (cache, { data }) => {
            const cacheDataAllTasks = cache.readQuery({ query: GET_ALL_TASKS }) as { tasks: Task[]; };
            const cacheTodayData = cache.readQuery({ query: GET_TODAY_TASKS_AND_EVENTS }) as { todayTasks: Task[]; todayEvents: Event[] };
            if (data?.createTask) {
                cacheDataAllTasks && cache.writeQuery({ query: GET_ALL_TASKS, data: { tasks: [...cacheDataAllTasks.tasks, data.createTask] } });
                if (cacheTodayData && filterTodayItems([data.createTask]).length) {
                    cache.writeQuery({
                        query: GET_TODAY_TASKS_AND_EVENTS,
                        data: { todayEvents: cacheTodayData.todayEvents, todayTasks: [...cacheTodayData.todayTasks, data.createTask], }
                    });
                }
            }
        }
    });
    const [updateTask] = useUpdateTaskMutation({ refetchQueries: [{ query: GET_TODAY_TASKS_AND_EVENTS }] });

    let [taskInputs, setTaskInputs] = useState<Task>({
        _id: itemToUpdate?._id || "", description: itemToUpdate?.description || "", title: itemToUpdate?._id || "",
        status: itemToUpdate?.status || StatusType.Open, estimatedTime: itemToUpdate?.estimatedTime || "", priority: itemToUpdate?.priority || PriorityType.Low,
        review: itemToUpdate?.review || "", timeSpent: itemToUpdate?.timeSpent || "", untilDate: itemToUpdate?.untilDate || "",
    });

    const formSubmit = (event?: React.SyntheticEvent): void => {
        event?.preventDefault();
        if (validateTaskInputs(taskInputs)) {
            !itemToUpdate ?
                createTask({ variables: { data: { ...taskInputs, _id: undefined } } })
                :
                updateTask({ variables: { data: { ...taskInputs } } });
            handleClose();
        }
    }

    useEnterButtonHook({ handleConfirm: formSubmit });
    useEscButtonHook({ handleCancel: handleClose });

    const getAutoComplete = (field: keyof Task, options: string[], label: string) =>
        <Autocomplete sx={{ mt: "3%", width: "85%" }} freeSolo value={taskInputs[field]} options={options}
            onChange={(event: React.FormEvent) => {
                setTaskInputs({ ...taskInputs, [field]: (event.target as HTMLInputElement).textContent })
            }}
            renderInput={(params) => (
                <TextField {...params} label={label} InputProps={{ ...params.InputProps, type: 'search' }} />
            )}
        />

    const getDialogActions = (): JSX.Element =>
        <DialogActions sx={{ justifyContent: "center", mt: "8%" }}>
            <Button onClick={handleClose} color="secondary" variant="outlined"> Cancel </Button>
            <Button onClick={formSubmit} color="primary" type="submit" variant="contained"> {itemToUpdate ? "Update" : "Create"} </Button>
        </DialogActions>

    return <>
        <DialogTitle>{`${itemToUpdate ? "Update" : "Create"} Task`}</DialogTitle>
        <DialogContent>
            <DialogContentText> Details: </DialogContentText>
            <BasicItemFields inputs={taskInputs} setInputs={(inputs: Task) => setTaskInputs(inputs)} />
            {getAutoComplete("status", statusesOptions, "Status")}
            <FormTextField margin="normal" label="Estimated Time" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, estimatedTime: event.target.value })} value={taskInputs.estimatedTime} />
            {getAutoComplete("priority", priorityOptions, "Priority")}
            <DateTextField label="Until Date" value={taskInputs.untilDate} setInput={(newUntilDate) => setTaskInputs({ ...taskInputs, untilDate: newUntilDate })} />
            {
                taskInputs.status === StatusType.Done &&
                <>
                    <FormTextField multiline label="Review" placeholder="Enter review..." defaultValue={taskInputs.review}
                        onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, review: (event.target as HTMLInputElement).value })} required />
                    <FormTextField margin="normal" label="Time spent" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, timeSpent: event.target.value })} value={taskInputs.timeSpent} />
                </>
            }
        </DialogContent>
        {getDialogActions()}
    </>;
};

export default TaskForm;