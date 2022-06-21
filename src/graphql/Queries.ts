import { gql } from '@apollo/client';

export const GET_ALL_EVENTS = gql`
   query getEvents{
    events {
      _id
      title
      description
      endingTime
      beginningTime
      invitedGuests
      color
      location
      notificationTime
    }
  }
`;

export const GET_ALL_TASKS = gql`
   query getTasks{
    tasks {
      _id
      title
      description
      untilDate
      priority
      status
      estimatedTime
      review
      timeSpent
    }
  }
`;

export const GET_TODAY_TASKS_AND_EVENTS = gql`
   query getTodayTasksAndEvent{
    todayTasks {
      _id
      title
      description
      untilDate
      priority
      status
      estimatedTime
      review
      timeSpent
    }
    todayEvents {
      _id
      title
      description
      endingTime
      beginningTime
      invitedGuests
      color
      location
      notificationTime
    }
  }
`;