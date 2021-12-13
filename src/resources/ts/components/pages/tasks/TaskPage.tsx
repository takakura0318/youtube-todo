import React, { memo, VFC, useEffect, useState } from "react";
//
import { TaskInput } from "../../molecules/TaskInput";
import { TaskList } from "../../organisms/TaskList";

export const TaskPage: VFC = memo(() => {
    return (
        <>
            <TaskInput />
            <TaskList />
        </>
    );
});
