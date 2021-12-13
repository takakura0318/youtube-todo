import { useQuery } from "react-query";
//
import * as api from "../api/TaskAPI";

export const useTasks = () => {
    return useQuery("tasks", () => api.getTasks());
};
