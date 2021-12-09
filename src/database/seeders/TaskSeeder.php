<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *「Task」テーブルにデータを登録する。
     * データの生成内容は「TaskFactory」を参照
     * @return void
     */
    public function run()
    {
        // 「Task」テーブルに10件データを登録する
        Task::factory()->count(10)->create();
    }
}
