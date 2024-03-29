import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { NavSidebar } from './components/NavSidebar/NavSidebar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import ManagementPage from "./pages/ManagementPage";
import { ItemType } from './types/managementTableTypes';
import { useEffect } from 'react';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import { useOnIncomingEventSubscription } from './generated/graphql';

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
  const notificationSubscriptionRes = useOnIncomingEventSubscription();

  useEffect(() => {
    notificationSubscriptionRes.data?.notificationOnIncomingEvent?.map((notification) =>
      addNotification({
        title: 'Event Reminder',
        message: notification.title,
        theme: 'light',
        duration: 60000
      })
    )
  }, [notificationSubscriptionRes.data])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Notifications />
        <Routes>
          <Route path="/tasks" element={<ManagementPage type={ItemType.Task} />} />
          <Route path="/events" element={<ManagementPage type={ItemType.Event} />} />
          <Route path="/dashboard" element={<ManagementPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <NavSidebar />
      </Router>
    </ThemeProvider >
  )
}

export default App;