import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { NavSidebar } from './components/NavSidebar/NavSidebar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import ManagementPage from "./pages/ManagementPage";
import { columnsForEventsTable, columnsForTasksTable, columnsForTodayTasksAndEventsTable } from "./constants";
import { filterTodayItems } from './date-utils';
import { Event } from './classes/Event';
import { Task } from './classes/Task';
import { ItemType } from './types/managementTableTypes';
import { useEffect, useState } from 'react';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import { ApolloProvider, gql, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_EVENTS, GET_ALL_TASKS_AND_EVENTS } from './graphql/Queries';
import { SubData, useGetEventsQuery, useGetTasksAndEventsQuery, useGetTasksQuery, useOnIncomingEventSubscription } from './generated/graphql';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#78536d",
      contrastText: "#fff"
    },
    divider: blueGrey[700],
    secondary: {
      main: '#f2cbe7',
      contrastText: "#fff"
    },
    background: {
      default: grey[900],
      paper: grey[900],
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
      disabled: '#fff',
    },
  },
});

const App = () => {
  const fetchEventsRes = useGetEventsQuery();
  const fetchTasksRes = useGetTasksQuery();
  const [events, setEvents] = useState<Event[]>();
  const [tasks, setTasks] = useState<Task[]>();
  const res = useOnIncomingEventSubscription();

  useEffect(() => {
    res.data?.notificationOnIncomingEvent?.map((notification: SubData) =>
      addNotification({
        title: 'Event Remider',
        message: notification.title,
        theme: 'light',
        duration: 60000
      })
    )
  }, [res.data])

  useEffect(() => {
    const events: Event[] = [];
    fetchEventsRes.data?.events.forEach((event) => {
      events.push(new Event(event));
    })
    setEvents(events);
  }, [fetchEventsRes.data])

  useEffect(() => {
    const tasks: Task[] = [];
    fetchTasksRes.data?.tasks.forEach((task) => {
      tasks.push(new Task(task));
    })
    setTasks(tasks);
  }, [fetchTasksRes.data])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Notifications />
        < Routes >
          <Route path="/tasks" element={<ManagementPage loading={fetchTasksRes.loading} type={ItemType.Task} data={{ events: [], tasks: tasks || [] }} headers={columnsForTasksTable} />} />
          <Route path="/events" element={<ManagementPage loading={fetchEventsRes.loading} type={ItemType.Event} data={{ tasks: [], events: events || [] }} headers={columnsForEventsTable} />} />
          <Route path="/dashboard" element={<ManagementPage loading={fetchTasksRes.loading || fetchEventsRes.loading} data={{ tasks: filterTodayItems(tasks || []) as Task[], events: filterTodayItems(events || []) as Event[] }} headers={columnsForTodayTasksAndEventsTable} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <NavSidebar />
      </Router>
    </ThemeProvider >
  )
}

export default App;