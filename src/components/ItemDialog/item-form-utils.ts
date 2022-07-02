import validator from "validator";
import { priorityOptions, statusesOptions } from "./TaskForm";
import { Event, PriorityType, Task } from "../../generated/graphql";

export const validateBasicInputs = (basicInputs: Event | Task) => {
    if (validator.trim(basicInputs.title) === "" || validator.trim(basicInputs.description) === "") {
        alert("Please fill the Required Fields");
        return false;
    }
    return true;
}

export const validateTaskInputs = (taskInputs: Task): boolean => {
    let isValid = true;
    isValid = validateBasicInputs(taskInputs);
    if (taskInputs.priority === PriorityType.Top && validator.trim(taskInputs.untilDate) === "") {
        alert("Please check your until date, it is an top task!");
        isValid = false;
    } else if (!statusesOptions.includes(taskInputs.status) || !priorityOptions.includes(taskInputs.priority)) {
        alert("Please check your inserted priority/status details!");
        isValid = false;
    }
    if (!validateEstimatedTime(taskInputs.estimatedTime)) {
        alert("Please check your estimated time!");
        isValid = false;
    }
    return isValid;
}

export const validateEventInputs = (eventInputs: Event): boolean => {
    let isValid = true;
    isValid = validateBasicInputs(eventInputs);
    if (validator.trim(eventInputs.beginningTime) === "" || validator.trim(eventInputs.endingTime) === "" || new Date(eventInputs.beginningTime) > new Date(eventInputs.endingTime)) {
        alert("Please check your beginning and ending times");
        isValid = false;
    }
    return isValid;
}

const validateEstimatedTime = (estimatedTime: string) => {
    if (validator.trim(estimatedTime) === "") {
        return false;
    } else {
        const estimatedTimeSplited = estimatedTime.match(/[a-zA-Z]+|[0-9]+/g);
        if (estimatedTimeSplited?.length !== 2) {
            return false;
        } else if (Number.isNaN((estimatedTimeSplited[0])) || !['w', 'd'].includes(estimatedTimeSplited[1])) {
            return false;
        }
        return true;
    }
}