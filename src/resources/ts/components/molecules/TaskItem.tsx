import React, { VFC, memo } from "react";
//
import { useUpdateDoneTask } from "../../queries/TaskQuery";
import { Task } from "../../types/Task";

type Props = {
    task: Task;
};

export const TaskItem: VFC<Props> = memo((props) => {
    const { task } = props;
    // is_done更新処理Qury ※必ず変数に格納すること
    const updateDoneTask = useUpdateDoneTask();

    // チェックボックスにチェックされたら
    const onClickUpdateDoneTask = () => {
        // is_doneを更新処理(Task完了状態を切り替える)
        updateDoneTask.mutate(task);
    };
    return (
        // タスク状態がtrueの場合は、チェックをつけるスタイルにする
        <li className={task.is_done ? "done" : ""}>
            <label className="checkbox-label">
                <input
                    type="checkbox"
                    className="checkbox-input"
                    onClick={onClickUpdateDoneTask}
                />
            </label>
            <div>
                <span>{task.title}</span>
            </div>
            <button className="btn is-delete">削除</button>
        </li>
    );
});
