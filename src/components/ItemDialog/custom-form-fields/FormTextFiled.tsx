import { TextField, TextFieldProps } from "@mui/material";


const FormTextField = (props: TextFieldProps) =>
    <TextField sx={{ width: "85%", backgroundColor: "inherit", color: "white", mt: "3%" }} {...props} />;


export default FormTextField;