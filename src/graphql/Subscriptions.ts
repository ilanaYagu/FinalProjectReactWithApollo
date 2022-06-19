import { gql } from "@apollo/client";

export const NOTIFICATION_ON_INCOMING_EVENT = gql`
  subscription OnIncomingEvent {
    notificationOnIncomingEvent {
      _id
      title
    }
  }
`;