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
        Schema::create('purchaseInvoiceProduct', function (Blueprint $table) {
            $table->id();
            $table->uuid('invoiceId');
            $table->unsignedBigInteger('productId')->nullable();
            $table->integer('productQuantity');
            $table->double('productUnitPurchasePrice');
            $table->double('productFinalAmount');
            $table->double('tax')->nullable();
            $table->double('taxAmount')->nullable();
            $table->timestamps();

            $table->foreign('invoiceId')->references('id')->on('purchaseInvoice');
            $table->foreign('productId')->references('id')->on('product');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchaseInvoiceProduct');
    }
};
