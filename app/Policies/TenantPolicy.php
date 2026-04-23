<?php

namespace App\Policies;

use App\Models\GroupMembers;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TenantPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        $solo = Tenant::where('created_by', $user->id)
            ->whereNull('group_id')
            ->exists();

        if ($solo) {
            return true;
        }

        $hasGroupMembership = GroupMembers::where('user_id', $user->id)->exists();

        return $hasGroupMembership;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Tenant $tenant): bool|Response
    {
        // Solo tenant - only creator can view
        if (!$tenant->group_id) {
            return $tenant->created_by === $user->id
                ? Response::allow()
                : Response::deny('You do not have permission to view this tenant.');
        }

        // Group tenant - any member can view
        $isMember = GroupMembers::where('user_id', $user->id)
            ->where('group_id', $tenant->group_id)
            ->exists();

        return $isMember
            ? Response::allow()
            : Response::deny('You are not a member of this group.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Tenant $tenant): bool|Response
    {
        // Solo tenant - only creator can update
        if (!$tenant->group_id) {
            return $tenant->created_by === $user->id
                ? Response::allow()
                : Response::deny('Only the creator can update this tenant.');
        }

        // Group tenant - Admin and Moderator can update
        $role = GroupMembers::getUserRole($user->id, $tenant->group_id);
        $canUpdate = in_array($role, [
            GroupMembers::ROLE_ADMIN,
            GroupMembers::ROLE_MODERATOR
        ]);

        return $canUpdate
            ? Response::allow()
            : Response::deny('Only admins and moderators can update group tenants.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Tenant $tenant): bool|Response
    {
        // Solo tenant - only creator can delete
        if (!$tenant->group_id) {
            return $tenant->created_by === $user->id
                ? Response::allow()
                : Response::deny('Only the creator can delete this tenant.');
        }

        // Group tenant - only Admin can delete
        $role = GroupMembers::getUserRole($user->id, $tenant->group_id);
        return $role === GroupMembers::ROLE_ADMIN
            ? Response::allow()
            : Response::deny('Only admins can delete group tenants.');
    }
}
