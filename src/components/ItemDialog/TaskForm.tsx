import { Autocomplete, DialogContent, DialogContentText, DialogTitle, styled, TextField } from "@mui/material";
import DateTextField from './custom-form-fields/DateTextField';
import { PriorityType, StatusType, Task, useCreateTaskMutation, useUpdateTaskMutation } from "../../generated/graphql";
import { GET_ALL_TASKS, GET_TODAY_TASKS_AND_EVENTS } from "../../graphql/Queries";
import { useState } from "react";
import { validateTaskInputs } from "./item-form-utils";
import { useEnterButtonHook } from "../../custom-listeners-hooks/useEnterButtonHook";
import { useEscButtonHook } from "../../custom-listeners-hooks/useEscButtonHook";
import BasicItemFields from "./BasicItemFields";
import FormTextField from "./custom-form-fields/FormTextField";
import CustomDialogActions from "./CustomDialogActions";

export const statusesOptions: string[] = Object.values(StatusType);
export const priorityOptions: string[] = Object.values(PriorityType);

const FormAutocomplete = styled(Autocomplete)({
    marginTop: "3%",
    width: "85%"
})

interface TaskFormProps {
    itemToUpdate?: Task;
    handleClose: () => void;
}

const TaskForm = ({ itemToUpdate, handleClose }: TaskFormProps) => {
    const [createTask] = useCreateTaskMutation({ refetchQueries: [{ query: GET_TODAY_TASKS_AND_EVENTS }, { query: GET_ALL_TASKS }] });
    const [updateTask] = useUpdateTaskMutation({ refetchQueries: [{ query: GET_TODAY_TASKS_AND_EVENTS }] });

    let [taskInputs, setTaskInputs] = useState<Task>({
        _id: itemToUpdate?._id || "", description: itemToUpdate?.description || "", title: itemToUpdate?.title || "",
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
        <FormAutocomplete freeSolo value={taskInputs[field]} options={options}
            onChange={(event: React.FormEvent) => {
                setTaskInputs({ ...taskInputs, [field]: (event.target as HTMLInputElement).textContent })
            }}
            renderInput={(params) => (
                <TextField {...params} label={label} InputProps={{ ...params.InputProps, type: 'search' }} />
            )}
        />

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
        <CustomDialogActions handleClose={handleClose} formSubmit={formSubmit} action={itemToUpdate ? "Update" : "Create"} />
    </>;
};

export default TaskForm;