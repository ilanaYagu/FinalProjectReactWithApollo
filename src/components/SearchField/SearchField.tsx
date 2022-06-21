import { TextField } from "@mui/material";

interface SearchFieldProps {
    setSearch(newSearch: string): void;
    id?: string;
}

function SearchField({ setSearch, id }: SearchFieldProps) {

    return (
        <TextField id={id} label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />
    );
};

export default SearchField;