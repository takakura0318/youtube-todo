import React, { VFC, memo } from "react";
//
import { useTasks } from "../../queries/TaskQuery";
import { TaskItem } from "../molecules/TaskItem";

export const TaskList: VFC = memo(() => {
    // React Query に置き換える前のコード⬇
    /**
    const [tasks, setTasks] = useState<Array<Task>>([]);

    const getTasks = async () => {
        const { data } = await axios.get<Array<Task>>("api/tasks");
        setTasks(data);
    };

    useEffect(() => {
        getTasks();
    }, []);
     */

    // Task一覧を取得する(react-queryの設定によって1回だけ実行される)
    const { data: tasks, status } = useTasks();

    if (status === "loading") {
        return <div className="loader" />;
    } else if (status === "error") {
        return <div className="align-center">データの読込に失敗しました</div>;
    } else if (!tasks || tasks.length <= 0) {
        return <div className="align-center">登録されたデータは有りません</div>;
    }

    return (
        <div className="inner">
            <ul className="task-list">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
});
