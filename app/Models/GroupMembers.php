<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupMembers extends Model
{
    /** @use HasFactory<\Database\Factories\GroupMembersFactory> */
    use HasFactory;
    const ROLE_ADMIN = 'Admin';
    const ROLE_MODERATOR = 'Moderator';
    const ROLE_MEMBER = 'Member';
    public static function getUserRole($userId, $groupId) {
        return self::where('user_id', $userId)->where('group_id', $groupId)->value('role');
    }
}
