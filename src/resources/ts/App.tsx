import React from "react";
import { Router } from "./router";
// React-Queryをインポート
// https://zenn.dev/brachio_takumi/articles/20210226-react-query
import { QueryClient, QueryClientProvider } from "react-query";
// React-Toastifyをインポート
// https://github.com/fkhadra/react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./hooks/AuthContext";

export const App = () => {
    // React Queryの初期設定
    const queryClient = new QueryClient({
        defaultOptions: {
            // エラー時に何回再取得するか
            queries: {
                retry: false,
            },
            // データを更新するときに使う
            mutations: {
                retry: false,
            },
        },
    });

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Router />
                {/* React-Toastify:サーバー側でエラーが起こった場合にエラー表示するライブラリ。オプションでプログレスバーをtrueにする  */}
                <ToastContainer hideProgressBar={true} />
            </QueryClientProvider>
        </AuthProvider>
    );
};
