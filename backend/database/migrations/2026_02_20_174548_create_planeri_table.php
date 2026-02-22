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
        Schema::create('planeri', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proizvodId')->constrained('proizvodi')->cascadeOnDelete()->unique();
            $table->string('bojaMetala');
            $table->string('postava');
            $table->unsignedInteger('brojDzepova');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planeri');
    }
};
