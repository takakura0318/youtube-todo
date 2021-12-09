<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    /** テスト実行時後はDBをリフレッシュする */
    use RefreshDatabase;

    /**
     * @test
     */
    public function 一覧を取得()
    {
        $task = Task::factory()->count(10)->create();
        $response = $this->getJson('api/tasks');

        $response
            // 正常にアクセスできているか(レスポンス200)
            ->assertOk()
            // 登録したデータの数と取得したデータの数が同じであるか
            ->assertJsonCount($task->count());
    }
}
