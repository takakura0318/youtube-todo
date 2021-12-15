import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { HelpPage } from "./components/pages/help/HelpPage";
import { LoginPage } from "./components/pages/login/LoginPage";
import { TaskPage } from "./components/pages/tasks/TaskPage";

export const Router = () => {
    useEffect(() => {
        axios
            .post("/api/login", {
                email: "yamada@example.com",
                password: "123456789",
            })
            .then((response) => {
                console.log(response);
            });
    }, []);
    return (
        <BrowserRouter>
            <div>
                <header className="global-head">
                    <ul>
                        <li>
                            <Link to="/">ホーム</Link>
                        </li>
                        <li>
                            <Link to="/help">ヘルプ</Link>
                        </li>
                        <li>
                            <span>
                                <Link to="/login">ログイン</Link>
                            </span>
                        </li>
                        <li>
                            <span>ログアウト</span>
                        </li>
                    </ul>
                </header>

                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/" exact>
                        <TaskPage />
                    </Route>
                    <Route path="/help">
                        <HelpPage />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
};
