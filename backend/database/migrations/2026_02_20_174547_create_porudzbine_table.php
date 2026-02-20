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
        Schema::create('porudzbine', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kupacId')->constrained('kupci')->cascadeOnDelete();
            $table->date('datumKreirana');
            $table->date('datumPoslata')->nullable();
            $table->string('status');
            $table->decimal('ukupniIznos', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('porudzbine');
    }
};
