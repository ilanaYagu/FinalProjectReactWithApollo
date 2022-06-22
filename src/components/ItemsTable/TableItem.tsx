import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { OtherColumnProperties, TableHeaders } from '../../types/managementTableTypes';
import { makeStyles } from "@material-ui/styles";
import { ReactNode } from 'react';
import { getColorIcon, getPriorityIcon, getTypeIcon } from './items-table-utils';
import { Event, Task } from '../../generated/graphql';
import { openDeleteItemForm, openItemForm } from '../../feature/modalsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

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

interface TableItemProps {
    item: Event | Task;
    index: number;
    headers: TableHeaders<Event | Task>;
}

const useStyles = makeStyles({
    otherInfoText: {
        textDecoration: "underline"
    },
    otherInfo: {
        margin: "4%",
        marginRight: "1%"
    }
});

const TableItem = ({ item, index, headers }: TableItemProps) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();

    const getTableCell = (headerKey: string) =>
        <TableCell key={headerKey} sx={{ whiteSpace: "nowrap", width: "10%" }} align="center">
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
                Object.entries(otherColumnProperties).map(([key, value]) => (
                    item[key as keyof (Event | Task)] && !Object.keys(headers).includes(key) ?
                        <div key={key} className={classes.otherInfo}>
                            <div><em className={classes.otherInfoText}>{value}</em></div> {item[key as keyof (Event | Task)]}
                        </div>
                        :
                        " "
                ))
            }
        </Box >

    const getActionsCell = () =>
        <>
            <IconButton color="primary" onClick={() => dispatch(openItemForm({ item }))}>
                <EditIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(openDeleteItemForm({ item }))}>
                <DeleteIcon />
            </IconButton>
        </>

    return (<Draggable key={item._id} draggableId={item._id} index={index}>
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
    </Draggable>);
}

export default TableItem;


