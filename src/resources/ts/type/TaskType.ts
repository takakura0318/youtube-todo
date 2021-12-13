// apiの型を指定
export type TaskType = {
    id: number;
    title: string;
    is_done: boolean;
    created_at: Date;
    updated_at: Date;
};