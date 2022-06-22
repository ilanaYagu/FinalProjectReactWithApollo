import { Event, Task } from "./generated/graphql";
import { ItemType } from "./types/managementTableTypes";

export const isFutureDate = (date: Date) => {
    return date.getTime() > new Date().getTime()
}

export const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
}

export const filterTodayItems = (items: (Event | Task)[]): (Event | Task)[] =>
    items.filter((item: Event | Task) => {
        if (item.__typename === ItemType.Event) {
            return isToday(new Date(item.beginningTime))
        } else if (item.__typename === ItemType.Task) {
            return isToday(new Date(item.untilDate))
        }
        return false;
    });
