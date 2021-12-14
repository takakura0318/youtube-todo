import React, { VFC, memo, useState, FormEvent } from "react";
//
import { useCreateTask } from "../../queries/TaskQuery";

export const TaskInput: VFC = memo(() => {
    // 入力値を保持するstate
    const [title, setTitle] = useState("");
    // Task-タイトル登録処理Qury ※必ず変数に格納すること
    const createTask = useCreateTask();

    // フォームをsubmitされたら
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // フォームの送信を停止(動作確認用)
        e.preventDefault();
        // Task-タイトル登録処理
        createTask.mutate(title);
        // 入力値を空にする
        setTitle("");
    };
    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <div className="inner">
                <input
                    type="text"
                    className="input"
                    placeholder="TODOを入力してください。"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button className="btn is-primary">追加</button>
            </div>
        </form>
    );
});
