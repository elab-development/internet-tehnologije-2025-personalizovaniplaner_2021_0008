<?php

return [
    'generate_always' => env('L5_SWAGGER_GENERATE_ALWAYS', true),
    'swagger_version' => '3.0',
    'const_host' => env('L5_SWAGGER_CONST_HOST', 'http://localhost:8000'),

    'documentations' => [
        'default' => [
            'api' => [
                'title' => 'Personalizovani Planer API',
            ],

            'paths' => [
                'docs' => storage_path('api-docs'),
                'annotations' => base_path('app/Http/Controllers'),
            ],
        ],
    ],
];