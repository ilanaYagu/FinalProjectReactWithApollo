import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Event = {
  __typename?: 'Event';
  _id: Scalars['ID'];
  beginningTime: Scalars['String'];
  color: Scalars['String'];
  description: Scalars['String'];
  endingTime: Scalars['String'];
  invitedGuests: Array<Scalars['String']>;
  location: Scalars['String'];
  notificationTime: Scalars['String'];
  title: Scalars['String'];
};

export type EventInput = {
  _id?: InputMaybe<Scalars['ID']>;
  beginningTime: Scalars['String'];
  color: Scalars['String'];
  description: Scalars['String'];
  endingTime: Scalars['String'];
  invitedGuests: Array<Scalars['String']>;
  location: Scalars['String'];
  notificationTime: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createEvent: Event;
  createTask: Task;
  deleteEvent?: Maybe<Event>;
  deleteTask?: Maybe<Task>;
  updateEvent?: Maybe<Event>;
  updateTask?: Maybe<Task>;
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationCreateTaskArgs = {
  data?: InputMaybe<TaskInput>;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateEventArgs = {
  data: EventInput;
};


export type MutationUpdateTaskArgs = {
  data: TaskInput;
};

export enum PriorityType {
  Low = 'Low',
  Regular = 'Regular',
  Top = 'Top'
}

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  events: Array<Event>;
  tasks: Array<Task>;
  todayEvents: Array<Event>;
  todayTasks: Array<Task>;
};

export enum StatusType {
  Done = 'Done',
  Open = 'Open',
  Proceeding = 'Proceeding'
}

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
  notificationOnIncomingEvent?: Maybe<Array<NotificationOnIncomingEventData>>;
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['ID'];
  description: Scalars['String'];
  estimatedTime: Scalars['String'];
  priority: PriorityType;
  review: Scalars['String'];
  status: StatusType;
  timeSpent: Scalars['String'];
  title: Scalars['String'];
  untilDate: Scalars['String'];
};

export type TaskInput = {
  _id?: InputMaybe<Scalars['ID']>;
  description: Scalars['String'];
  estimatedTime: Scalars['String'];
  priority: PriorityType;
  review: Scalars['String'];
  status: StatusType;
  timeSpent: Scalars['String'];
  title: Scalars['String'];
  untilDate: Scalars['String'];
};

export type NotificationOnIncomingEventData = {
  __typename?: 'notificationOnIncomingEventData';
  _id: Scalars['ID'];
  title: Scalars['String'];
};

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'Event', _id: string } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'Task', _id: string } | null };

export type CreateTaskMutationVariables = Exact<{
  data: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', _id: string, title: string, description: string, untilDate: string, priority: PriorityType, status: StatusType, estimatedTime: string, review: string, timeSpent: string } };

export type CreateEventMutationVariables = Exact<{
  data: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', _id: string, title: string, description: string, endingTime: string, beginningTime: string, invitedGuests: Array<string>, color: string, location: string, notificationTime: string } };

export type UpdateEventMutationVariables = Exact<{
  data: EventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'Event', _id: string, title: string, description: string, endingTime: string, beginningTime: string, invitedGuests: Array<string>, color: string, location: string, notificationTime: string } | null };

export type UpdateTaskMutationVariables = Exact<{
  data: TaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Task', _id: string, title: string, description: string, untilDate: string, priority: PriorityType, status: StatusType, estimatedTime: string, review: string, timeSpent: string } | null };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', _id: string, title: string, description: string, endingTime: string, beginningTime: string, invitedGuests: Array<string>, color: string, location: string, notificationTime: string }> };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', _id: string, title: string, description: string, untilDate: string, priority: PriorityType, status: StatusType, estimatedTime: string, review: string, timeSpent: string }> };

export type GetTodayTasksAndEventQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodayTasksAndEventQuery = { __typename?: 'Query', todayTasks: Array<{ __typename?: 'Task', _id: string, title: string, description: string, untilDate: string, priority: PriorityType, status: StatusType, estimatedTime: string, review: string, timeSpent: string }>, todayEvents: Array<{ __typename?: 'Event', _id: string, title: string, description: string, endingTime: string, beginningTime: string, invitedGuests: Array<string>, color: string, location: string, notificationTime: string }> };

export type OnIncomingEventSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnIncomingEventSubscription = { __typename?: 'Subscription', notificationOnIncomingEvent?: Array<{ __typename?: 'notificationOnIncomingEventData', _id: string, title: string }> | null };


export const DeleteEventDocument = gql`
    mutation deleteEvent($id: ID!) {
  deleteEvent(id: $id) {
    _id
  }
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation deleteTask($id: ID!) {
  deleteTask(id: $id) {
    _id
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const CreateTaskDocument = gql`
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
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const CreateEventDocument = gql`
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
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = gql`
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
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const UpdateTaskDocument = gql`
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
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const GetEventsDocument = gql`
    query getEvents {
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

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetTasksDocument = gql`
    query getTasks {
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

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetTodayTasksAndEventDocument = gql`
    query getTodayTasksAndEvent {
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

/**
 * __useGetTodayTasksAndEventQuery__
 *
 * To run a query within a React component, call `useGetTodayTasksAndEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodayTasksAndEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodayTasksAndEventQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodayTasksAndEventQuery(baseOptions?: Apollo.QueryHookOptions<GetTodayTasksAndEventQuery, GetTodayTasksAndEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodayTasksAndEventQuery, GetTodayTasksAndEventQueryVariables>(GetTodayTasksAndEventDocument, options);
      }
export function useGetTodayTasksAndEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodayTasksAndEventQuery, GetTodayTasksAndEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodayTasksAndEventQuery, GetTodayTasksAndEventQueryVariables>(GetTodayTasksAndEventDocument, options);
        }
export type GetTodayTasksAndEventQueryHookResult = ReturnType<typeof useGetTodayTasksAndEventQuery>;
export type GetTodayTasksAndEventLazyQueryHookResult = ReturnType<typeof useGetTodayTasksAndEventLazyQuery>;
export type GetTodayTasksAndEventQueryResult = Apollo.QueryResult<GetTodayTasksAndEventQuery, GetTodayTasksAndEventQueryVariables>;
export const OnIncomingEventDocument = gql`
    subscription OnIncomingEvent {
  notificationOnIncomingEvent {
    _id
    title
  }
}
    `;

/**
 * __useOnIncomingEventSubscription__
 *
 * To run a query within a React component, call `useOnIncomingEventSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnIncomingEventSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnIncomingEventSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnIncomingEventSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnIncomingEventSubscription, OnIncomingEventSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnIncomingEventSubscription, OnIncomingEventSubscriptionVariables>(OnIncomingEventDocument, options);
      }
export type OnIncomingEventSubscriptionHookResult = ReturnType<typeof useOnIncomingEventSubscription>;
export type OnIncomingEventSubscriptionResult = Apollo.SubscriptionResult<OnIncomingEventSubscription>;