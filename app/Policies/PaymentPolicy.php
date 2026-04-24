<?php

namespace App\Policies;

use App\Models\GroupMembers;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PaymentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        $solo = Payment::where('created_by', $user->id)
            ->whereNull('group_id')
            ->exists();
        if ($solo) {
            return true;
        }

        $hasGroupMembership = GroupMembers::where('user_id', $user->id)
            ->exists();

        return $hasGroupMembership;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Payment $payment): bool|Response
    {
        if (!$payment->group_id) {
            return $payment->created_by === $user->id
                ? Response::allow()
                : Response::deny('You do not have permission to view this invoice');
        }

        $isMember = GroupMembers::where('user_id', $user->id)
            ->where('group_id', $payment->group_id)
            ->exists();

        return $isMember
            ? Response::allow()
            : Response::deny('You are not a member of this group');
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
    public function update(User $user, Payment $payment): bool|Response
    {
        if (!$payment->group_id) {
            return $payment->created_by === $user->id
                ? Response::allow()
                : Response::deny('Only the creator can update this invoice');
        }

        $role = GroupMembers::getUserRole($user->id, $payment->group_id);
        $canUpdate = in_array($role, [
            GroupMembers::ROLE_ADMIN,
            GroupMembers::ROLE_MODERATOR
        ]);

        return $canUpdate
            ? Response::allow()
            : Response::deny('Only admins and moderators can update this invoice.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Payment $payment): bool|Response
    {
        if (!$payment->group_id) {
            return $payment->created_by === $user->id
                ? Response::allow()
                : Response::deny('Only the creator can delete this tenant.');
        }

        $role = GroupMembers::getUserRole($user->id, $payment->group_id);
        return $role === GroupMembers::ROLE_ADMIN
            ? Response::allow()
            : Response::deny('Only admins can delete group tenants.');
    }
}
