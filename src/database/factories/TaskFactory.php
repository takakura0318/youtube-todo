<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     * 「Task」テーブルに登録するデータを定義する。
     * データを生成する場合は、Seederからこのクラスを呼び出す
     * @return array
     */
    public function definition()
    {
        $user_id = $this->faker->numberBetween(1,3);
        return [
            // データ整形 &&「title」カラムにランダムな文字列15~40字を生成
            'title' => $user_id . ':'. $this->faker->realText(rand(15,40)),
            // 「is_done」カラムに10%の確率でtrueを生成
            'is_done' => $this->faker->boolean(10),
            // 「user_id」カラムに1~3のどれかを生成
            'user_id' => $user_id ,
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
