<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function __construct()
    {
        // 自分のタスクだけ、編集や削除をできるようにする
        // index()メソッドでUserテーブルに紐付いたTaskしか表示されないような仕様となっているが万が一に備えて
        $this->middleware('can:checkUser, task')->only([
            // 適用範囲をメソッド単位で指定
            'updateDone','update','destroy'
        ]);
        
    }
    /**
     * Task一覧
     *
     * @return Task[] \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        // テスト用
        //return Task::orderByDesc('id')->get();
        // Usersテーブルに紐付いたTaskテーブルを降順(高い順)で取得
        return Task::where('user_id',Auth::id())->orderByDesc('id')->get();
    }

    /**
     * 登録処理
     *
     * @param Request $request
     * @return void
     */
    public function store(TaskRequest $request)
    {
        // リクエストをサーバー側で追加
        $request->merge([
            'user_id' => Auth::id()
        ]);

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
     * @return 
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
     * is_doneの更新
     *
     * @param Task $task
     * @param Request $request
     * @return 
     */
    public function updateDone(Task $task,Request $request)
    {
        //abort(500);
        $task->is_done = $request->is_done;

        return $task->update()
            ? response()->json($task)
            : response()->json([],500);
    }

    /**
     * 削除処理
     *
     * @param Task $task
     * @return 
     */
    public function destroy(Task $task)
    {
        return $task->delete() 
            ? response()->json($task) 
            : response()->json([],500);
    }


}
