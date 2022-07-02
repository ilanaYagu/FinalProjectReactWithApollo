import { TextField } from "@mui/material";

interface DateTextFieldProps {
    label: string;
    value: string;
    setInput: (newInput: string) => void;
}

const DateTextField = ({ label, value, setInput }: DateTextFieldProps) =>

    <TextField margin="normal" sx={{ width: "85%", backgroundColor: "inherit", color: "white" }} label={label}
        type="datetime-local" InputLabelProps={{ shrink: true }} value={value.replace(" ", "T")}
        onChange={(event) => setInput(event.target.value.replace("T", " "))} />


export default DateTextField;
