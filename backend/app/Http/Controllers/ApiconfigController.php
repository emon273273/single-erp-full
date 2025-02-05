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
        // Find the API config row by ID (assuming a single row)
        $apiConfig = ApiConfig::find(1);

        // Check if API config exists and has a valid API key
        if (!$apiConfig || empty($apiConfig->apiKey)) {
            return response()->json([
                'success' => false,
                'message' => 'API key not found or invalid.',
            ], 404);
        }

        // Return the API key
        return response()->json([
            'success' => true,
            'data' => $apiConfig->only(['id', 'apiKey']),
        ], 200);
    } catch (\Exception $e) {
        // Log the exception for debugging (optional)
        return response()->json('Error fetching API config: ' . $e->getMessage());

        // Return a general error message
        return response()->json([
            'success' => false,
            'message' => 'Failed to retrieve API key. Please try again later.',
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
