import { Event, Task } from '../../generated/graphql';
import FormTextField from './custom-form-fields/FormTextFiled';

interface BasicItemFieldsProps {
    setInputs(newEventInputs: Task | Event): void;
    inputs: Task | Event;
}

const BasicItemFields = ({ setInputs, inputs }: BasicItemFieldsProps) =>
    <>
        <FormTextField margin="normal" label="Title" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputs({ ...inputs, title: event.target.value })} value={inputs.title} required />
        <FormTextField multiline label="Description" defaultValue={inputs.description}
            onChange={(event: React.FormEvent) => setInputs({ ...inputs, description: (event.target as HTMLInputElement).value })} required />
    </>

export default BasicItemFields;


