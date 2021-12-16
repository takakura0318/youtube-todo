<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // TaskテーブルはUserテーブルを参照しているのでUserテーブルを先にcreateする必要がある
        $this->call(UserSeeder::class);
        $this->call(TaskSeeder::class);
    }
}
