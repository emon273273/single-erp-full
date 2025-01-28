<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            
            [
                'name' => 'Mr. Brasso Glass & Household Cleaner Mega Refill Pack',
                'productThumbnailImage' => 'mr-brasso-cleaner.webp',
                'productPurchasePrice' => 1000,
                'productSalePrice' => 1199,
                'productSubCategoryId' => 1,
                'productBrandId' => 1,
                'sku' => 'mr-bra',
                'uomId' => 3,
                'uomValue' => 5,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 10,
                'reorderQuantity' => 5,
            ],
            [
                'name' => 'RFL Economy Bright Milk Pot 16 cm',
                'productThumbnailImage' => 'rfl-economy-bright-milk-pot-16-cm-1-pcs.webp',
                'productPurchasePrice' => 400,
                'productSalePrice' => 510,
                'productSubCategoryId' => 1,
                'productBrandId' => 1,
                'sku' => 'rfl-',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 5,
                'reorderQuantity' => 5,
            ],
            [
                'name' => 'Cotton Duster',
                'productThumbnailImage' => 'cotton-duster-1-pcs.webp',
                'productPurchasePrice' => 20,
                'productSalePrice' => 29,
                'productSubCategoryId' => 1,
                'productBrandId' => 1,
                'sku' => 'cott',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 2,
                'reorderQuantity' => 2,
            ],[
                'name' => 'Ariel Washing Powder',
                'productThumbnailImage' => 'ariel-washing-powder-25-kg.webp',
                'productPurchasePrice' => 1500,
                'productSalePrice' => 1999,
                'productSubCategoryId' => 1,
                'productBrandId' => 1,
                'sku' => 'arie',
                'uomId' => 2,
                'uomValue' => 2.5,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 10,
                'reorderQuantity' => 2,
            ],
            [
                'name' => 'Lizol Floor Cleaner Floral Disinfectant Surface',
                'productThumbnailImage' => 'lizol-floor-cleaner-floral-disinfectant-surface-1-ltr.webp',
                'productPurchasePrice' => 200,
                'productSalePrice' => 259,
                'productSubCategoryId' => 1,
                'productBrandId' => 1,
                'sku' => 'lizo',
                'uomId' => 3,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 12,
                'reorderQuantity' => 10,
            ],
            [
                'name' => 'Realme 12 Pro Plus 5G',
                'productThumbnailImage' => 'Realme-12-Pro-Plus-5G-Official-Image.png',
                'productPurchasePrice' => 44000,
                'productSalePrice' => 45000,
                'productSubCategoryId' => 2,
                'productBrandId' => 2,
                'sku' => 'Realme',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 6,
                'reorderQuantity' => 5,
            ],
            [
                'name' => 'Apple iPhone 14',
                'productThumbnailImage' => 'Apple-iPhone-14-Plus-Official-Image.png',
                'productPurchasePrice' => 110000,
                'productSalePrice' => 112000,
                'productSubCategoryId' => 2,
                'productBrandId' => 2,
                'sku' => 'Apple-i',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 6,
                'reorderQuantity' => 5,
            ],
            [
                'name' => 'Apple iPhone 13',
                'productThumbnailImage' => 'Apple-iPhone-14-Official.png',
                'productPurchasePrice' => 146000,
                'productSalePrice' => 146999,
                'productSubCategoryId' => 2,
                'productBrandId' => 2,
                'sku' => 'Apple-',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 10,
                'reorderQuantity' => 10,
            ],
            [
                'name' => 'Samsung Galaxy S23',
                'productThumbnailImage' => 'Samsung-Galaxy-S23-Plus-Official-Image.png',
                'productPurchasePrice' => 78000,
                'productSalePrice' => 80000,
                'productSubCategoryId' => 2,
                'productBrandId' => 2,
                'sku' => 'Samsun',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 20,
                'reorderQuantity' => 7,
            ],
            // Repeat the structure for other products...
        
            [
                'name' => 'Tecno Spark Go 2024',
                'productThumbnailImage' => 'Tecno-Spark-Go-2024-Official-Image.png',
                'productPurchasePrice' => 10000,
                'productSalePrice' => 14000,
                'productSubCategoryId' => 2,
                'productBrandId' => 2,
                'sku' => 'Tecno-S',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 10,
                'reorderQuantity' => 6,
            ],
        
            [
                'name' => 'Chest of Drawer- CHEVRON',
                'productThumbnailImage' => 'cdh-145.jpg',
                'productPurchasePrice' => 11000,
                'productSalePrice' => 11900,
                'productSubCategoryId' => 3,
                'productBrandId' => 3,
                'sku' => 'cdh-',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 5,
                'reorderQuantity' => 4,
            ],
        
            [
                'name' => 'CUPBOARD-FLORIDA-3 DOOR',
                'productThumbnailImage' => 'cbh-3713-doorperspective.jpg',
                'productPurchasePrice' => 66000,
                'productSalePrice' => 66875,
                'productSubCategoryId' => 3,
                'productBrandId' => 3,
                'sku' => 'cbh-37',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 10,
                'reorderQuantity' => 10,
            ],
        
            [
                'name' => 'CLOTH HANGER/ ALNA-BONZA',
                'productThumbnailImage' => 'hch-306-1.jpg',
                'productPurchasePrice' => 5000,
                'productSalePrice' => 5950,
                'productSubCategoryId' => 3,
                'productBrandId' => 3,
                'sku' => 'hch-',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 30,
                'reorderQuantity' => 20,
            ],
        
            [
                'name' => 'WOODEN SOFA-VENICE',
                'productThumbnailImage' => 'sdc-343-perspecfftivergbcolor.jpg',
                'productPurchasePrice' => 21000,
                'productSalePrice' => 21800,
                'productSubCategoryId' => 3,
                'productBrandId' => 3,
                'sku' => 'sdc-34',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 10,
                'reorderQuantity' => 7,
            ],
        
            [
                'name' => 'SINGLE SOFA-BABYLON',
                'productThumbnailImage' => 'ssc-361view-01rgbcolor.jpg',
                'productPurchasePrice' => 13000,
                'productSalePrice' => 13500,
                'productSubCategoryId' => 3,
                'productBrandId' => 3,
                'sku' => 'ssc-3',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 6,
                'reorderQuantity' => 5,
            ],
        
            [
                'name' => 'HP 250 G8 Core i3 11th Gen 15.6" 4GB RAM 1TB HDD Laptop',
                'productThumbnailImage' => '250-g8-ash-black-01-500x500.webp',
                'productPurchasePrice' => 50000,
                'productSalePrice' => 55000,
                'productSubCategoryId' => 4,
                'productBrandId' => 4,
                'sku' => '250-g8',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 6,
                'reorderQuantity' => 5,
            ],
        
            [
                'name' => 'HP 15s-du3611TU Core i3 11th Gen 15.6" FHD Laptop',
                'productThumbnailImage' => '15s-du3022tu-01-500x500.jpg',
                'productPurchasePrice' => 56000,
                'productSalePrice' => 58850,
                'productSubCategoryId' => 4,
                'productBrandId' => 4,
                'sku' => '15s-',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 10,
                'reorderQuantity' => 10,
            ],
        
            [
                'name' => 'HP 240 G8 Core i5 11th Gen 14" FHD Laptop',
                'productThumbnailImage' => '240-g8-0001-500x500.jpg',
                'productPurchasePrice' => 69000,
                'productSalePrice' => 71500,
                'productSubCategoryId' => 4,
                'productBrandId' => 4,
                'sku' => '240-g8',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 10,
                'reorderQuantity' => 7,
            ],
        
            [
                'name' => 'HP 15s-fq5786TU Core i3 12th Gen 15.6" FHD Laptop',
                'productThumbnailImage' => '15s-fq2644tu-01-500x500.jpg',
                'productPurchasePrice' => 60000,
                'productSalePrice' => 63000,
                'productSubCategoryId' => 4,
                'productBrandId' => 4,
                'sku' => '15s-fq26',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 7,
                'reorderQuantity' => 6,
            ],
        
            [
                'name' => 'Apple MacBook Air (2022) Apple M2 Chip 13.6-Inch Liquid Retina Display 8GB RAM 512GB SSD Midnight #MLY43LL/A',
                'productThumbnailImage' => 'macbook-air-m2-chip-midnight-01-500x500.webp',
                'productPurchasePrice' => 180000,
                'productSalePrice' => 182000,
                'productSubCategoryId' => 4,
                'productBrandId' => 4,
                'sku' => 'macbo',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 5,
                'reorderQuantity' => 4,
            ],
        
            [
                'name' => 'W7 Banana Dreams Loose',
                'productThumbnailImage' => 'w7_banana_dreams_loose_powder_-_20gm.jpg',
                'productPurchasePrice' => 300,
                'productSalePrice' => 399,
                'productSubCategoryId' => 5,
                'productBrandId' => 5,
                'sku' => 'w7_b',
                'uomId' => 5,
                'uomValue' => 20,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 10,
                'reorderQuantity' => 10,
            ],
        
            [
                'name' => 'W7 Liquid Eyeliner Pot 8ml - Black',
                'productThumbnailImage' => 'unspecified_64.jpg',
                'productPurchasePrice' => 190,
                'productSalePrice' => 215,
                'productSubCategoryId' => 5,
                'productBrandId' => 5,
                'sku' => 'unspe',
                'uomId' => 4,
                'uomValue' => 8,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 15,
                'reorderQuantity' => 10,
            ],
        
            [
                'name' => 'J.Cat Beauty Lip Lock Mask-Proof Liquid Lip - Positive Mindset',
                'productThumbnailImage' => 'j.cat_beauty_lip_lock_mask-proof_liquid_lip_-_positive_mindset.jpg',
                'productPurchasePrice' => 500,
                'productSalePrice' => 580,
                'productSubCategoryId' => 5,
                'productBrandId' => 5,
                'sku' => 'j.cat',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 6,
                'reorderQuantity' => 5,
            ],
        
            [
                'name' => 'Nivea Men Black & White Ivisible Original 48H Anti Perspirant Deodorant',
                'productThumbnailImage' => 'nivea_men_black_white_ivisible_original_48h_anti_perspirant_deodorant.jpg',
                'productPurchasePrice' => 300,
                'productSalePrice' => 350,
                'productSubCategoryId' => 5,
                'productBrandId' => 5,
                'sku' => 'nivea_m',
                'uomId' => 1,
                'uomValue' => 1,
                'productVatId' => 2,
                'discountId' => 2,
                'productQuantity' => 6,
                'reorderQuantity' => 5,
            ],
        
            [
                'name' => 'Cerave Diabetics Dry Skin Relief Moisturizing Cream 236ml',
                'productThumbnailImage' => 'cerave_diabetics_dry_skin_relief_moisturizing_cream_236ml.jpg',
                'productPurchasePrice' => 2000,
                'productSalePrice' => 2249,
                'productSubCategoryId' => 5,
                'productBrandId' => 5,
                'sku' => 'cerave_',
                'uomId' => 4,
                'uomValue' => 236,
                'productVatId' => 1,
                'discountId' => 1,
                'productQuantity' => 10,
                'reorderQuantity' => 10,
            ]

            
        ];

        foreach ($products as $item) {
            $product = new Product();
            $product->name = $item['name'];
            $product->productThumbnailImage = $item['productThumbnailImage'];
            $product->productSubCategoryId = $item['productSubCategoryId'];
            $product->productBrandId = $item['productBrandId'];
            $product->description = $item['description'] ?? null;
            $product->sku = $item['sku'];
            $product->productQuantity = $item['productQuantity'] ?? null;
            $product->productSalePrice = $item['productSalePrice'];
            $product->productPurchasePrice = $item['productPurchasePrice'];
            $product->uomId = $item['uomId'];
            $product->uomValue = $item['uomValue'];
            $product->reorderQuantity = $item['reorderQuantity'] ?? null;
            $product->save();
        }
    }
}
