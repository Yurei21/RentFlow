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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_name');
            $table->decimal('monthly_price', 10, 2)->nullable();
            $table->string('room_type')->nullable();
            $table->integer('capacity')->default(1);
            $table->text('description')->nullable();
            $table->enum('status', ['available', 'occupied', 'maintenance'])->default('available');
            $table->foreignId('group_id')->nullable()->constrained('groups')->nullOnDelete();;
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('modified_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
