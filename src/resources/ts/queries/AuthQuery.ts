import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
//
import * as api from "../api/AuthAPI";
// コンテキスト
import { useAuth } from "../hooks/AuthContext";

/**
 * User取得Query
 * @returns User
 */
export const useUser = () => {
    return useQuery("users", () => api.getUser());
};

/**
 * ログイン処理Query
 * @returns User
 */
export const useLogin = () => {
    // ログイン状態を更新するsetState()
    const { setIsAuthFlag } = useAuth();
    // useMutation()の第1引数には「呼び出すAPI」、第2引数に「コールバック処理」
    return useMutation(api.login, {
        // 更新成功時は
        onSuccess: (user) => {
            // ログイン時
            if (user) {
                // ログイン状態をtrueにする
                setIsAuthFlag(true);
            }
        },
        onError: () => {
            toast.error("ログインに失敗しました。");
        },
    });
};

/**
 * ログインアウト処理Query
 * @returns User
 */
export const useLogout = () => {
    // ログイン状態を更新するsetState()
    const { setIsAuthFlag } = useAuth();
    // useMutation()の第1引数には「呼び出すAPI」、第2引数に「コールバック処理」
    return useMutation(api.logout, {
        // 更新成功時は
        onSuccess: (user) => {
            // ログアウト時
            if (user) {
                // ログイン状態をfalseにする
                setIsAuthFlag(false);
            }
        },
        onError: () => {
            toast.error("ログアウトに失敗しました。");
        },
    });
};
