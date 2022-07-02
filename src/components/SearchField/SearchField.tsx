import { TextField } from "@mui/material";

interface SearchFieldProps {
    setSearch(newSearch: string): void;
    id?: string;
}

const SearchField = ({ setSearch, id }: SearchFieldProps) =>
    <TextField id={id} label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />

export default SearchField;