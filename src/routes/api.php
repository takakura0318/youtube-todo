<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//
Route::post("login", "LoginController@login");
Route::post("logout", "LoginController@logout");

// 認証成功した場合のみアクセスできるルートをグループ化
Route::group(['middleware' => "auth:sanctum"], function() {
    // Task一覧取得
    Route::apiResource('tasks','TaskController');
    // Task is_done 更新
    Route::patch('tasks/update-done/{task}','TaskController@updateDone');
    Route::get('user', function (Request $request) {
        return $request->user();
    });

});



