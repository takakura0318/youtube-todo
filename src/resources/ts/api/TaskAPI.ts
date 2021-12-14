import axios from "axios";
import { Task } from "../types/Task";

/**
 * Task一覧取得API
 * @returns Task一覧
 */
export const getTasks = async () => {
    const { data } = await axios.get<Array<Task>>("api/tasks");
    return data;
};

/**
 * is_done更新API
 * @returns Task
 */
export const updateDoneTask = async (props: Task) => {
    const { id, is_done } = props;

    // axios.patch()の第1引数に「APIのroute」、第2引数に「APIに送信したいデータ」
    const { data } = await axios.patch<Task>(
        `api/tasks/update-done/${id}`,
        // 現在のタスク状態の反対真偽値をAPIに送信する
        { is_done: !is_done }
    );
    return data;
};

/**
 * Taskのタイトル登録API
 * @returns Task
 */
export const createTask = async (props: string) => {
    const title = props;

    // axios.post()の第1引数に「APIのroute」、第2引数に「APIに送信したいデータ」
    const { data } = await axios.post<Task>(
        `api/tasks`,
        // タイトル
        { title: title }
    );
    return data;
};

/**
 * Task編集API
 * @returns Task
 */
export const updateTask = async ({ id, task }: { id: number; task: Task }) => {
    const { data } = await axios.put<Task>(
        `api/tasks/${id}`,
        // タイトル
        task
    );
    return data;
};

/**
 * Task削除API
 * @returns Task
 */
export const deleteTask = async (id: number) => {
    const { data } = await axios.delete<Task>(`api/tasks/${id}`);
    return data;
};
