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
    public function 一覧を取得できる()
    {
        // 適当にデータを10件登録
        $task = Task::factory()->count(10)->create();
        $response = $this->getJson("api/tasks");

        $response
            // 正常にアクセスできているか(レスポンス200)
            ->assertOk()
            // 登録したデータの数と取得したデータの数が同じであるか(Taskテストのデータが10件かどうか)
            ->assertJsonCount($task->count());
    }

    /**
     * @test
     */
    public function 登録することができる()
    {
        $data = [
            "title" => "テスト投稿"
        ];

        $response = $this->postJson("api/tasks",$data);

        $response
            //レスポンスに201 HTTPステータスコードがあることを宣言します。
            ->assertCreated()
            //レスポンス中のどこかに指定JSONデータが含まれていることを宣言します。
            ->assertJsonFragment($data);
    }

    /**
     * @test
     */
    public function タイトルが空の場合は登録できない()
    {
        $data = [
            "title" => ""
        ];

        $response = $this->postJson("api/tasks",$data);

        // バリデーションを確認
        //dd($response->json());

        $response
            // 異常系なのでステータスコード422であるかどうか
            ->assertStatus(422)
            // エラーが連想配列通りであるかどうか
            ->assertJsonValidationErrors(["title" => "タイトル は必須です"]);
    }

    /**
     * @test
     */
    public function タイトルが255文字の場合は登録できない()
    {
        $data = [
            // テスト用に文字列256文字を生成
            "title" => str_repeat("あ",256)
        ];

        $response = $this->postJson("api/tasks",$data);

        // バリデーションを確認
        //dd($response->json());

        $response
            // 異常系なのでステータスコード422であるかどうか
            ->assertStatus(422)
            // エラーが連想配列通りであるかどうか
            ->assertJsonValidationErrors(["title" => "タイトル は 255 文字以下のみ有効です"]);
    }

    /**
     * @test
     */
    public function 削除することができる()
    {
        // 適当にデータを10レコード登録
        $task = Task::factory()->count(10)->create();
        
        // JSONから1件データを削除
        $response = $this->deleteJson("api/tasks/1");
        $response->assertOk();

       
        // デバッグでJSONの中身を確認してみると、9件になっている
        $response = $this->getJson("api/tasks");
         // 一覧の取得を行い合計数が1減っているかどうかをテストする
        $response->assertJsonCount($task->count() -1);

    }


    
}
