
export type OtherColumnProperties<T> = Partial<Record<keyof T, string>>;

export type TableHeaders<T> = Partial<Record<keyof T, string>> | Record<ExternalHeaders, string>;

export type ExternalHeaders = "type" | "actions" | "other" | "color";

export enum ItemType {
    Task = 'Task',
    Event = 'Event',
}



