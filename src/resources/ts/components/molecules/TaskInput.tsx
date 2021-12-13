import React, { VFC, memo } from "react";

export const TaskInput: VFC = memo(() => {
    return (
        <form className="input-form">
            <div className="inner">
                <input
                    type="text"
                    className="input"
                    placeholder="TODOを入力してください。"
                    defaultValue=""
                />
                <button className="btn is-primary">追加</button>
            </div>
        </form>
    );
});
