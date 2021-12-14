import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
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
        // 更新成功時は
        onSuccess: () => {
            // Task一覧取得画面を再描画する
            queryClient.invalidateQueries("tasks");
        },
        onError: () => {
            toast.error("更新に失敗しました。");
        },
    });
};

/**
 * Task-タイトル登録処理
 * @returns Task
 */
export const useCreateTask = () => {
    const queryClient = useQueryClient();

    // useMutation()の第1引数には「呼び出すAPI」、第2引数に「コールバック処理」
    return useMutation(api.createTask, {
        // 登録成功時は
        onSuccess: () => {
            // Task一覧取得画面を再描画する
            queryClient.invalidateQueries("tasks");
            toast.success("登録に失敗しました。");
        },
        onError: (error: AxiosError) => {
            // laravelのバリデーションエラーの場合(複数エラーに対応済み)
            if (error.response?.data.errors) {
                //console.log(error.response?.data);
                Object.values(error.response?.data.errors).map(
                    (messages: any) => {
                        messages.map((message: string) => {
                            toast.error(message);
                        });
                    }
                );
            } else {
                // バリデーション以外のエラーの場合
                toast.error("更新に失敗しました。");
            }
        },
    });
};
