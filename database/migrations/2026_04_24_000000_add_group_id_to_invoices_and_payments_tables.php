<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            if (!Schema::hasColumn('invoices', 'group_id')) {
                $table->foreignId('group_id')
                    ->after('tenant_id')
                    ->constrained('groups')
                    ->cascadeOnDelete();
            }
        });

        Schema::table('payments', function (Blueprint $table) {
            if (!Schema::hasColumn('payments', 'group_id')) {
                $table->foreignId('group_id')
                    ->after('invoice_id')
                    ->constrained('groups')
                    ->cascadeOnDelete();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            if (Schema::hasColumn('payments', 'group_id')) {
                $table->dropForeignKey(['group_id']);
                $table->dropColumn('group_id');
            }
        });

        Schema::table('invoices', function (Blueprint $table) {
            if (Schema::hasColumn('invoices', 'group_id')) {
                $table->dropForeignKey(['group_id']);
                $table->dropColumn('group_id');
            }
        });
    }
};
