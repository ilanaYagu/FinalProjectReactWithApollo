import React, { useState } from "react";
import { Box, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import { DragDropContext, Droppable, DroppableProvided, DropResult } from "react-beautiful-dnd";
import { ExternalHeaders, TableHeaders } from "../../types/managementTableTypes";
import TableItem from "./TableItem";
import { getComparator, CustomSortProperties, sortByEstimatedTime } from "./items-table-utils";
import { Event, Task } from "../../generated/graphql";

const unsortableHeaders: ExternalHeaders[] = ["other", "actions", "type", "color"];
export const customSortProperties: CustomSortProperties[] = [{ sortField: "estimatedTime" as SortField, sort: sortByEstimatedTime }];
export enum SortOrderType {
    Asc = "asc",
    Desc = "desc",
    Nothing = ""
}
export type SortField = keyof TableHeaders<Event | Task> | "";

interface ItemsTableProps {
    items: (Event | Task)[];
    setItems(newItems: (Event | Task)[]): void;
    headers: TableHeaders<Event | Task>;
    search: string;
    searchableProperties: (keyof (Event | Task))[];
    handleEditItem: (itemToUpdate: Event | Task) => void;
    handleDeleteItem: (itemToDelete: Event | Task) => void;
}

const ItemsTable = ({ items, setItems, headers, search, searchableProperties, handleEditItem, handleDeleteItem }: ItemsTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState<SortField>("");
    const [sortOrder, setSortOrder] = useState<SortOrderType>(SortOrderType.Nothing);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const handleSort = (property: SortField) => {
        const isAsc = sortBy === property && sortOrder === SortOrderType.Asc;
        setSortOrder(isAsc ? SortOrderType.Desc : SortOrderType.Asc);
        setSortBy(property);
    }

    const getHeader = () =>
        <TableHead>
            <TableRow>
                {Object.entries(headers).map(([key, header]) => {
                    return <TableCell sx={{ fontWeight: "bold", fontSize: "18px", whiteSpace: "nowrap" }} align="center">
                        {
                            unsortableHeaders.includes(key as ExternalHeaders) ?
                                header
                                :
                                <TableSortLabel active={sortBy === key} direction={sortOrder === SortOrderType.Nothing ? undefined : sortOrder} onClick={() => handleSort(key as SortField)}>
                                    {header}
                                </TableSortLabel>
                        }
                    </TableCell>
                })}
            </TableRow>
        </TableHead>

    const getBody = () =>
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="items" direction="vertical" >
                {(droppableProvided: DroppableProvided) => (
                    <TableBody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                        {
                            items.filter(isMatchedWithSearchFilter).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .sort(getComparator(sortOrder, sortBy)).map(getRow)
                        }
                    </TableBody>
                )}
            </Droppable>
        </DragDropContext>

    const getRow = (item: Event | Task, index: number) =>
        <TableItem item={item} index={index} headers={headers} handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem} />

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination || result.destination.index === result.source.index) {
            return;
        }
        const temp = [...items];
        const d = temp[result.destination!.index];
        temp[result.destination!.index] = temp[result.source.index];
        temp[result.source.index] = d;
        setItems(temp);
    };

    const isMatchedWithSearchFilter = (item: Event | Task) => {
        let isMatched = false;
        searchableProperties.forEach((property) => {
            const valueToCheck: string = item[property] as string;
            isMatched = isMatched || valueToCheck?.toLowerCase().includes(search.toLowerCase());
        });
        return isMatched;
    }

    const getTable = () =>
        <Table>
            {getHeader()}
            {getBody()}
            <TablePagination sx={{ overflow: "inherit", marginTop: "30%" }} rowsPerPageOptions={[5, 10, 25]} component="div" count={items.length}
                rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage: number) => setPage(newPage)} onRowsPerPageChange={handleChangeRowsPerPage} />
        </Table>

    return (
        <>
            {
                items.length > 0 ?
                    getTable()
                    :
                    <Box sx={{ mt: "10%", textAlign: "center" }}>
                        <h1>NO ITEMS</h1>
                    </Box>
            }
        </>


    );
}

export default ItemsTable;