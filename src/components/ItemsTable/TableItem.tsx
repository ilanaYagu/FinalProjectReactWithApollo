import { Box, IconButton, SxProps, TableCell, TableRow } from '@mui/material';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { OtherColumnProperties, TableHeaders } from '../../types/managementTableTypes';
import { ReactNode } from 'react';
import { getColorIcon, getPriorityIcon, getTypeIcon } from './items-table-utils';
import { Event, Task } from '../../generated/graphql';

const customRendersHeaders = new Map<string, (item: Event | Task) => JSX.Element | "">([
    ["type", getTypeIcon],
    ["color", getColorIcon],
    ["priority", getPriorityIcon]
]);

const otherColumnProperties: OtherColumnProperties<Task> | OtherColumnProperties<Event> = {
    status: "Status",
    untilDate: "Until Date",
    beginningTime: "From",
    endingTime: "Until",
    estimatedTime: "Estimated Time",
    location: "Location"
};

const tableCellStyle: SxProps = { whiteSpace: "nowrap", width: "10%" };
const otherCellBoxStyle: SxProps = { margin: "6%" };
const otherCellTitleStyle: SxProps = { textDecoration: "underline", fontStyle: "italic" };

interface TableItemProps {
    item: Event | Task;
    index: number;
    headers: TableHeaders<Event | Task>;
    handleEditItem(item: Task | Event): void;
    handleDeleteItem(item: Task | Event): void;
}

const TableItem = ({ item, index, headers, handleEditItem, handleDeleteItem }: TableItemProps) => {

    const getTableCell = (headerKey: string) =>
        <TableCell key={headerKey} sx={tableCellStyle} align="center">
            {getTableCellContent(headerKey)}
        </TableCell>

    const getTableCellContent = (headerKey: string): ReactNode => {
        if (headerKey !== "other" && headerKey !== "actions") {
            const customRender = customRendersHeaders.get(headerKey);
            return customRender ?
                customRender(item) :
                headerKey in item ?
                    item[headerKey as keyof (Event | Task)]
                    : ""
        } else {
            return headerKey === "other" ? getOtherCell() : getActionsCell();
        }
    }

    const getOtherCell = () =>
        <Box display="flex">
            {
                Object.entries(otherColumnProperties).map(([key, value]) =>
                    item[key as keyof (Event | Task)] && !Object.keys(headers).includes(key) ?
                        <Box key={key} sx={otherCellBoxStyle}>
                            <Box sx={otherCellTitleStyle}>{value}</Box>
                            {item[key as keyof (Event | Task)]}
                        </Box>
                        :
                        " "
                )
            }
        </Box >

    const getActionsCell = () =>
        <>
            <IconButton color="primary" onClick={() => handleEditItem(item)}>
                <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteItem(item)}>
                <DeleteIcon />
            </IconButton>
        </>

    return <Draggable key={item._id} draggableId={item._id} index={index}>
        {(draggableProvided: DraggableProvided) => {
            return (
                <TableRow ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                    {
                        Object.entries(headers).map(([headerKey]) =>
                            getTableCell(headerKey)
                        )
                    }
                </TableRow>
            );
        }}
    </Draggable>
}

export default TableItem;


