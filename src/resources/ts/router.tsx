import axios from "axios";
import React, { useEffect } from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    RouteProps,
    Redirect,
} from "react-router-dom";
//
import { HelpPage } from "./components/pages/help/HelpPage";
import { LoginPage } from "./components/pages/login/LoginPage";
import { TaskPage } from "./components/pages/tasks/TaskPage";
import { useLogout, useUser } from "./queries/AuthQuery";
import { useAuth } from "./hooks/AuthContext";
import { Page404 } from "./components/pages/Page404";

export const Router = () => {
    const logout = useLogout();
    // コンテキスト取得
    const { isAuthFlag, setIsAuthFlag } = useAuth();
    // ユーザー取得Query
    const { isLoading, data: authUser } = useUser();

    // コンテキスト読み込み時1回だけ実行。
    //第2引数に「authUser」を指定することによって「authUser」が変更された場合にのみ再レンダリング(再実行)されるようにする
    useEffect(() => {
        // ユーザーが取得できている場合
        if (authUser) {
            setIsAuthFlag(true);
        }
    }, [authUser]);

    // 未ログイン時のリダイレクト処理
    const GuardRoute = (props: RouteProps) => {
        // 未ログイン時はログイン画面にリダイレクトする
        if (!isAuthFlag) return <Redirect to="/login" />;
        // それ以外の場合は、普通にアクセスできるようにする
        return <Route {...props} />;
    };

    // ログイン時のリダイレクト処理
    const LoginRoute = (props: RouteProps) => {
        // ログイン時はトップ画面にリダイレクトする
        if (isAuthFlag) return <Redirect to="/" />;
        // それ以外の場合は、普通にアクセスできるようにする
        return <Route {...props} />;
    };

    // ログイン時nav
    const isLoginNav = (
        <header className="global-head">
            <ul>
                <li>
                    <Link to="/">ホーム</Link>
                </li>
                <li>
                    <Link to="/help">ヘルプ</Link>
                </li>
                <li onClick={() => logout.mutate()}>
                    <span>ログアウト</span>
                </li>
            </ul>
        </header>
    );

    // 未ログイン時nav
    const notLoginNav = (
        <header className="global-head">
            <ul>
                <li>
                    <Link to="/help">ヘルプ</Link>
                </li>
                <li>
                    <span>
                        <Link to="/login">ログイン</Link>
                    </span>
                </li>
            </ul>
        </header>
    );

    // ルータに対してLoadingアイコンが表示されるようにする
    // これが無いと、ログイン済みなのに一瞬だけログイン画面が表示されてしまう
    if (isLoading) return <div className="loader"></div>;

    return (
        <BrowserRouter>
            {/** ナビ */}
            {isAuthFlag ? isLoginNav : notLoginNav}
            <Switch>
                {/** トップページはログインが必須なので「GuardRouteを」設定。(つまり未ログイン時は、ログイン画面にリダイレクトする) */}
                <GuardRoute path="/" exact>
                    <TaskPage />
                </GuardRoute>
                {/** ログイン画面は既にログイン中である場合は、ログイン画面にアクセスできないように「LoginRoute」を設定 */}
                <LoginRoute path="/login">
                    <LoginPage />
                </LoginRoute>
                {/** ヘルプページは誰でもアクセスできるのでそのまま*/}
                <Route path="/help">
                    <HelpPage />
                </Route>
                <Route component={Page404} />
            </Switch>
        </BrowserRouter>
    );
};
