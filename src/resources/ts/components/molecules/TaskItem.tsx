import React, {
    VFC,
    memo,
    useState,
    KeyboardEvent,
    ChangeEvent,
    MouseEvent,
    FormEvent,
} from "react";
import { toast } from "react-toastify";
//
import {
    useUpdateDoneTask,
    useUpdateTask,
    useDeleteTask,
} from "../../queries/TaskQuery";
import { Task } from "../../types/Task";

type Props = {
    task: Task;
};

export const TaskItem: VFC<Props> = memo((props) => {
    const { task } = props;
    // 更新用切り替えFlagを保持するState ※undefinedはなにかに置き換えできるかも
    const [editTitle, setEditTitle] = useState<string | undefined>(undefined);

    // is_done更新処理Qury ※必ず変数に格納すること
    const updateDoneTask = useUpdateDoneTask();
    // Task編集Query ※必ず変数に格納すること
    const updateTask = useUpdateTask();
    // Task削除Query
    const deleteTask = useDeleteTask();

    // 【切替用】①タイトル表示と削除ボタン
    const itemText = () => {
        return (
            <>
                <div onClick={handleToggleEdit}>
                    <span>{task.title}</span>
                </div>
                <button
                    className="btn is-delete"
                    onClick={() => deleteTask.mutate(task.id)}
                >
                    削除
                </button>
            </>
        );
    };

    // 【切替用】②更新用inputタグ
    const itemInput = () => {
        return (
            <>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        className="input"
                        defaultValue={editTitle}
                        onKeyDown={handleOnkey}
                        onChange={handleInputChange}
                    />
                </form>
                <button className="btn" onClick={handleUpdate}>
                    更新
                </button>
            </>
        );
    };
    // チェックボックスにチェックされたら
    const onClickUpdateDoneTask = () => {
        // is_doneを更新処理(Task完了状態を切り替える)
        updateDoneTask.mutate(task);
    };

    // ①➔②に切り替えるハンドラー
    const handleToggleEdit = () => {
        setEditTitle(task.title);
    };

    // ②➔①に切り替えるハンドラー
    const handleOnkey = (e: KeyboardEvent<HTMLInputElement>) => {
        // esc か Tab キーが押されたら
        if (["Escape", "Tab"].includes(e.key)) {
            setEditTitle(undefined);
        }
    };

    // ②の入力値を保持する関数
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value);
    };

    // ②の更新ボタンが押されたら更新処理
    const handleUpdate = (
        e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
    ) => {
        // 処理を止める
        e.preventDefault();

        // editTitleがundefinedなら
        if (!editTitle) {
            toast.error("タイトルを入力してください");
            return;
        }

        const newTask = { ...task };
        newTask.title = editTitle;

        // 編集処理実行
        updateTask.mutate({ id: task.id, task: newTask });

        // ①に切り替える
        setEditTitle(undefined);
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
            {/*  3項演算子で①と②コンポーネントを切替 */}
            {editTitle === undefined ? itemText() : itemInput()}
        </li>
    );
});
