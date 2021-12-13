import React, { VFC, memo } from "react";
import { Task } from "../../types/Task";

type Props = {
    task: Task;
};

export const TaskItem: VFC<Props> = memo((props) => {
    const { task } = props;
    return (
        <li key={task.id}>
            <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
            </label>
            <div>
                <span>{task.title}</span>
            </div>
            <button className="btn is-delete">削除</button>
        </li>
    );
});
