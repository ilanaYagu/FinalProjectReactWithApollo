import { Autocomplete, TextareaAutosize, TextField } from "@mui/material";
import { TaskInputs } from './ItemForm';
import DateTextField from './DateTextField';
import { PriorityType, StatusType } from "../../generated/graphql";

export const statusesOptions: string[] = Object.values(StatusType);
export const priorityOptions: string[] = Object.values(PriorityType);

interface TaskFormProps {
    taskInputs: TaskInputs;
    setTaskInputs(newTaskInputs: TaskInputs): void;
    classField: string;
}

function TaskForm({ taskInputs, setTaskInputs, classField }: TaskFormProps) {

    const getAutoComplete = (field: keyof TaskInputs, options: string[], label: string) => {
        return <Autocomplete sx={{ mt: "2%" }} className={classField} freeSolo value={taskInputs[field]} options={options}
            onChange={(event: React.FormEvent) => {
                setTaskInputs({ ...taskInputs, [field]: (event.target as HTMLInputElement).textContent })
            }}
            renderInput={(params) => (
                <TextField {...params} label={label} InputProps={{ ...params.InputProps, type: 'search' }} />
            )}
        />
    }

    return <>
        {getAutoComplete("status", statusesOptions, "Status")}
        <TextField margin="normal" className={classField} label="Estimated Time" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, estimatedTime: event.target.value })} value={taskInputs.estimatedTime} />
        {getAutoComplete("priority", priorityOptions, "Priority")}
        <DateTextField label="Until Date" value={taskInputs.untilDate} setInput={(newUntilDate) => setTaskInputs({ ...taskInputs, untilDate: newUntilDate })} />
        {
            taskInputs.status === StatusType.Done &&
            <>
                Review: <TextareaAutosize minRows={3} maxRows={5} className={classField} placeholder="Enter review..." defaultValue={taskInputs.review}
                    onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, review: (event.target as HTMLInputElement).value })} required />
                <TextField margin="normal" className={classField} label="Time spent" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, timeSpent: event.target.value })} value={taskInputs.timeSpent} />
            </>
        }
    </>;
};

export default TaskForm;