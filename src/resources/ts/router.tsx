import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Help } from "./pages/help/help";
import { Login } from "./pages/login/Login";
import { Task } from "./pages/tasks/Task";

export const Router = () => {
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
                        <Task />
                    </Route>
                    <Route path="/help">
                        <Help />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
};
