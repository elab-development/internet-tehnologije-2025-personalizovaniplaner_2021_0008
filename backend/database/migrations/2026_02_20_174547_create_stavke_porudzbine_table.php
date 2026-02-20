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
        Schema::create('stavke_porudzbine', function (Blueprint $table) {
            $table->id();
            $table->foreignId('porudzbinaId')->constrained('porudzbine')->restrictOnDelete();
            $table->unsignedInteger('rb');
            $table->foreignId('proizvodId')->constrained('proizvodi')->restrictOnDelete();
            $table->unsignedInteger('kolicina');
            $table->decimal('iznosStavke', 10, 2);
            $table->text('personalizacija')->nullable();
            $table->timestamps();

            $table->unique(['porudzbinaId', 'rb']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stavke_porudzbine');
    }
};
