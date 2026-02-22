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
        Schema::create('proizvodi', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->string('tip');
            $table->text('opis');
            $table->decimal('cena', 10, 2);
            $table->decimal('cenaPopust', 10, 2)->nullable();
            $table->string('kategorija');
            $table->unsignedInteger('dostupnaKolicina');
            $table->string('bojaProizvoda');
            $table->string('materijalProizvoda');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('proizvodi');
        Schema::enableForeignKeyConstraints();
    }
};
