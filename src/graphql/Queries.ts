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

export const GET_ALL_TASKS_AND_EVENTS = gql`
 query getTasksAndEvents {
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
