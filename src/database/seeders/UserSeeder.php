<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * 「Users」テーブルにデータを登録する。
     *
     * @return void
     */
    public function run()
    {
        DB::table("users")->insert([
            [
            "name" => "admin",
            "email" => "admin@example.com",
            "email_verified_at" => now(),
            "password" => Hash::make("123456789"),
            "created_at" => now(),
            "updated_at" => now(),
            ],
            [
            "name" => "yamada",
            "email" => "yamada@example.com",
            "email_verified_at" => now(),
            "password" => Hash::make("123456789"),
            "created_at" => now(),
            "updated_at" => now(),
            ],
            [
            "name" => "tanaka",
            "email" => "tanaka@example.com",
            "email_verified_at" => now(),
            "password" => Hash::make("123456789"),
            "created_at" => now(),
            "updated_at" => now(),
            ],
        ]);
    }
}
