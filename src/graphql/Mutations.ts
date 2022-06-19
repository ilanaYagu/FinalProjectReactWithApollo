import { gql } from "@apollo/client";

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      _id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      _id
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask($data: TaskInput!) {
    createTask(data: $data) {
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

export const CREATE_EVENT = gql`
  mutation createEvent($data: EventInput!) {
    createEvent(data: $data) {
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

export const UPDATE_EVENT = gql`
  mutation updateEvent($data: EventInput!) {
    updateEvent(data: $data) {
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


export const UPDATE_TASK = gql`
  mutation updateTask($data: TaskInput!) {
    updateTask(data: $data) {
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