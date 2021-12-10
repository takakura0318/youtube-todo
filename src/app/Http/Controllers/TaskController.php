<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Task一覧
     *
     * @return Task[] \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        // Taskテーブルを降順(高い順)で全件取得
        return Task::orderByDesc('id')->get();
    }

    /**
     * 登録処理
     *
     * @param Request $request
     * @return void
     */
    public function store(TaskRequest $request)
    {
        $task = Task::create($request->all());

        // 登録成功時は、正常ステータスコード201、失敗した場合は、ステータスコード500を返す
        return $task 
            ? response()->json($task,201)
            :response()->json([],500);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }


    /**
     * 更新処理
     *
     * @param Request $request
     * @param Task $task
     * @return void
     */
    public function update(TaskRequest $request, Task $task)
    {
        $task->title = $request->title;

        // 更新成功時は、デフォルトでステータスコード207を返却し、失敗時はステータスコード500を返す
        return $task->update() 
            ? response()->json($task) 
            : response()->json([],500);
    }

    /**
     * 削除処理
     *
     * @param Task $task
     * @return void
     */
    public function destroy(Task $task)
    {
        // 更新成功時は、デフォルトでステータスコード207を返却し、失敗時はステータスコード500を返す
        return $task->delete() 
            ? response()->json($task) 
            : response()->json([],500);
    }
}
