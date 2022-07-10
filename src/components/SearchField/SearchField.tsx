import { TextField } from "@mui/material";
import { RefObject } from "react";

interface SearchFieldProps {
    setSearch(newSearch: string): void;
    inputRef?: RefObject<HTMLDivElement> | null
}

const SearchField = ({ setSearch, inputRef }: SearchFieldProps) =>
    <TextField inputRef={inputRef} label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />

export default SearchField;