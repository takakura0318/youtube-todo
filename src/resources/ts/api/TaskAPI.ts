import axios from "axios";
import { Task } from "../types/Task";

/**
 * Task一覧取得
 * @returns Task一覧
 */
export const getTasks = async () => {
    const { data } = await axios.get<Array<Task>>("api/tasks");
    return data;
};
