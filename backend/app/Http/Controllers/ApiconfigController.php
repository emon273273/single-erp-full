<?php

namespace App\Http\Controllers;

use App\Models\ApiConfig;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiconfigController extends Controller
{
    
    public function createApiConfig(Request $request): JsonResponse
    {
        

        $validatedData = $request->validate([
            'apiKey' => 'required|string|',
        ]);

        try {
            $apiConfig = ApiConfig::updateOrCreate(
                ['id' => 1], 
                ['apiKey' => $validatedData['apiKey']]
            );

            return response()->json([
                'message' => 'API key saved successfully.',
                'data' => $apiConfig->only('id', 'apiKey'), // Return only ID & API Key
            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => 'Failed to save API key. Please try again later.',
            ], 500);
        }
    }

    public function getApiConfig(): JsonResponse
    {
        try {
            $apiConfig = ApiConfig::find(1); // Assuming a single API config row
            if (!$apiConfig) {
                return response()->json([
                    'message' => 'API key not found.',
                ], 404);
            }

            return response()->json([
                'data' => $apiConfig->only('id', 'apiKey'), // Return only ID & API Key
            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => 'Failed to retrieve API key. Please try again later.',
            ], 500);
        }
    }


    public function deleteApiConfig()
{
    try {
        // Find the record with primary key `id = 1`
        $apiConfig = ApiConfig::find(1);
        // dd($apiConfig);

        if (!$apiConfig) {
            return response()->json([
                'error' => 'API key not found.',
            ], 404);
        }

        // Set the apiKey to null or empty string
        $apiConfig->update(['apiKey' => '']);

        return response()->json([
            'message' => 'API key deleted successfully.',
        ]);
    } catch (Exception $err) {
        return response()->json([
            'error' => 'An error occurred while deleting the API key. Please try again later.',
        ], 500);
    }
}

}
