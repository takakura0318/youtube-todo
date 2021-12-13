import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
//
import * as api from "../api/TaskAPI";

/**
 * Task一覧取得
 * @returns Task一覧
 */
export const useTasks = () => {
    return useQuery("tasks", () => api.getTasks());
};

/**
 * is_done更新処理
 * @returns Task
 */
export const useUpdateDoneTask = () => {
    const queryClient = useQueryClient();

    // useMutation()の第1引数には「呼び出すAPI」、第2引数に「コールバック処理」
    return useMutation(api.updateDoneTask, {
        // 更新成功時は、Task一覧取得画面を再描画する
        onSuccess: () => {
            queryClient.invalidateQueries("tasks");
        },
        onError: () => {
            toast.error("更新に失敗しました。");
        },
    });
};
