<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function checkUser(User $user,Task $task)
    {
        // Usersテーブルのid と Taskテーブルのuser_idが一致してる場合にtrueを返す
        // Seaser2のPageクラスのコンディションに似ているかも？
        if($user->id === $task->user_id) {
            return true;
        }
    }

}
