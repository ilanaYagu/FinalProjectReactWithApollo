import { useEffect } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Task } from '../../generated/graphql';
import { choosePriorityTasksFilter, chooseStatusTasksFilter, PriorityFilterType, StatusFilterType } from '../../feature/activeFiltersSlice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch } from 'react-redux';

const filterSelectStyle = { mt: "1.5%", mr: "1%" };
interface TasksTableFiltersProps {
    setTasks(newTasks: Task[]): void;
    data?: Task[];
}

const TasksTableFilters = ({ setTasks, data }: TasksTableFiltersProps) => {

    const statusFilter = useSelector((state: RootState) => state.activeFilters.statusTasksFilter);
    const priorityFilter = useSelector((state: RootState) => state.activeFilters.priorityTasksFilter)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setTasks(filteredTasks() || []);
    }, [statusFilter, priorityFilter, data])

    const filteredTasks = (): Task[] | undefined =>
        data?.filter((task: Task) =>
            (priorityFilter === PriorityFilterType.All || task.priority as string === priorityFilter)
            && (statusFilter === StatusFilterType.All || task.status as string === statusFilter))

    return <>
        <Select sx={filterSelectStyle} size="small" value={statusFilter} onChange={(event: SelectChangeEvent<string>) => dispatch(chooseStatusTasksFilter(event.target.value as StatusFilterType))}>
            {
                Object.values(StatusFilterType).map((value) => {
                    return <MenuItem key={value} value={value}>{value}</MenuItem>
                })
            }
        </Select>

        <Select sx={filterSelectStyle} size="small" value={priorityFilter} onChange={(event: SelectChangeEvent<string>) => dispatch(choosePriorityTasksFilter(event.target.value as PriorityFilterType))}  >
            {
                Object.values(PriorityFilterType).map((value) => {
                    return <MenuItem key={value} value={value}>{value}</MenuItem>
                })
            }
        </Select>
    </>
};

export default TasksTableFilters;

