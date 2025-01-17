<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     *「Task」テーブルにデータを登録する。
     * データの生成内容は「TaskFactory」を参照
     * @return void
     */
    public function run()
    {
        // 「Task」テーブルに20件データを登録する
        Task::factory()->count(20)->create();
    }
}
