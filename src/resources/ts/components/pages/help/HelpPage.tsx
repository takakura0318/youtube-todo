import React from "react";
import { memo, VFC } from "react";

export const HelpPage: VFC = memo(() => {
    return (
        <div className="align-center">
            <h1>ヘルプです</h1>
            <p>
                使い方を解説します。
                <br />
                このサイトはログインが必要です
            </p>
        </div>
    );
});
