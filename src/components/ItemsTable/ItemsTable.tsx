import React, { useState } from "react";
import { Box, SxProps, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import { DragDropContext, Droppable, DroppableProvided, DropResult } from "react-beautiful-dnd";
import { ExternalHeaders, ItemType, TableHeaders } from "../../types/managementTableTypes";
import TableItem from "./TableItem";
import { getComparator, CustomSortProperties, sortByEstimatedTime } from "./items-table-utils";
import { Event, Task } from "../../generated/graphql";
import DeleteItemForm from "../DeleteForm/DeleteForm";

const unsortableHeaders: ExternalHeaders[] = ["other", "actions", "type", "color"];
export const customSortProperties: CustomSortProperties[] = [{ sortField: "estimatedTime" as SortField, sort: sortByEstimatedTime }];
export enum SortOrderType {
    Asc = "asc",
    Desc = "desc",
    None = ""
}
export type SortField = keyof TableHeaders<Event | Task> | "";

const headerCellStyle: SxProps = { fontWeight: "bold", fontSize: "18px", whiteSpace: "nowrap" };
const tablePaginationStyle: SxProps = { marginTop: "5%", display: "inline-flex" };
const noItemsBoxStyle: SxProps = { mt: "10%", textAlign: "center" };

interface ItemsTableProps {
    items: (Event | Task)[];
    setItems(newItems: (Event | Task)[]): void;
    headers: TableHeaders<Event | Task>;
    search: string;
    handleEditItem(task: Task | Event): void;
}

const ItemsTable = ({ items, setItems, headers, search, handleEditItem }: ItemsTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState<SortField>("");
    const [sortOrder, setSortOrder] = useState<SortOrderType>(SortOrderType.None);
    const [deleteItemForm, setDeleteItemForm] = useState<{ open: boolean; item?: Task | Event }>();

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
                {Object.entries(headers).map(([key, header]) =>
                    <TableCell key={key} sx={headerCellStyle} align="center">
                        {
                            unsortableHeaders.includes(key as ExternalHeaders) ?
                                header
                                :
                                <TableSortLabel active={sortBy === key} direction={sortOrder === SortOrderType.None ? undefined : sortOrder} onClick={() => handleSort(key as SortField)}>
                                    {header}
                                </TableSortLabel>
                        }
                    </TableCell>
                )}
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
        <TableItem key={index} handleEditItem={handleEditItem} handleDeleteItem={(item: Task | Event) => setDeleteItemForm({ open: true, item: item })}
            item={item} index={index} headers={headers} />

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

    const isMatchedWithSearchFilter = (item: Event | Task) =>
        item.title.toLowerCase().includes(search.toLowerCase());

    const getTable = () =>
        <>
            <Table>
                {getHeader()}
                {getBody()}
            </Table>
            <TablePagination sx={tablePaginationStyle} rowsPerPageOptions={[5, 10, 25]} component="div" count={items.length}
                rowsPerPage={rowsPerPage} page={page} onPageChange={(event, newPage: number) => setPage(newPage)} onRowsPerPageChange={handleChangeRowsPerPage} />
        </>

    return <>
        {
            items.length > 0 ?
                getTable()
                :
                <Box sx={noItemsBoxStyle}>
                    <h1>NO ITEMS</h1>
                </Box>
        }
        {deleteItemForm?.open && deleteItemForm?.item &&
            <DeleteItemForm handleClose={() => setDeleteItemForm({ open: false })} item={deleteItemForm.item} open={deleteItemForm.open} />}
    </>
}

export default ItemsTable;