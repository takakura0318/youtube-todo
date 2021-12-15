import React, { FormEvent, useState } from "react";
import { memo, VFC } from "react";
//
import { useLogin } from "../../../queries/AuthQuery";

export const LoginPage: VFC = memo(() => {
    // ログイン処理Query
    const login = useLogin();
    //
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("123456789");

    // フォームが送信されたときに実行される関数
    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        // 処理を一旦停止する（開発段階なので次画面に遷移したくない）
        e.preventDefault();
        login.mutate({ email, password });
    };
    return (
        <div className="login-page">
            <div className="login-panel">
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>メールアドレス</label>
                        <input
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>パスワード</label>
                        <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn">
                        ログイン
                    </button>
                </form>
            </div>
            <div className="links">
                <a href="#">ヘルプ</a>
            </div>
        </div>
    );
});
