import React from "react";
import { Router } from "./router";
// React Queryをインポート
// https://zenn.dev/brachio_takumi/articles/20210226-react-query
import { QueryClient, QueryClientProvider } from "react-query";

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
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    );
};
