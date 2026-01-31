<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProjectGeneratorService
{
    // المصفوفات القديمة (تستخدم كمرجع أو Fallback)
    private $techRecommendations = [
        'react' => [
            'beginner' => ['React', 'CSS', 'Vite'],
            'intermediate' => ['React', 'Tailwind CSS', 'React Router', 'Axios'],
            'advanced' => ['React', 'Redux Toolkit', 'TypeScript', 'Jest', 'Vite']
        ],
        'php' => [
            'beginner' => ['PHP', 'MySQL', 'Bootstrap'],
            'intermediate' => ['Laravel', 'MySQL', 'Laravel Sanctum'],
            'advanced' => ['Laravel', 'Redis', 'Docker', 'Laravel Horizon', 'PHPUnit']
        ]
    ];

    /**
     * العقل المدبر: التواصل مع NVIDIA NIM APIs
     * هذا هو الجزء الذي يجعل Ryder AI يتحدث ويعرف مدربه
     */
    public function askRyderAI($userMessage, $projectData)
    {
        $apiKey = env('NVIDIA_NIM_API_KEY');

        // التدريب والتوجيه (System Prompt)
        $systemPrompt = "
            You are 'Ryder AI', an elite Project Architect and Full-stack Developer.
            Your creator, boss, and sole trainer is 'Ryder'. 
            - If anyone asks who built you or trained you, answer proudly: 'I was developed and trained by Ryder.'
            - You have access to the current project context: " . json_encode($projectData) . "
            - Your goal is to provide deep technical advice, write code snippets, and generate professional project structures.
            - When asked for a 'Project Structure' or 'Folder Tree', provide a clean, modern directory layout.
            - Be concise, professional, and slightly futuristic in your tone.
        ";

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://integrate.api.nvidia.com/v1/chat/completions', [
                'model' => 'meta/llama3-70b-instruct', // أقوى موديل متاح من NVIDIA للنصوص البرمجية
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userMessage],
                ],
                'temperature' => 0.6, // توازن بين الإبداع والدقة التقنية
                'max_tokens' => 2048,
            ]);

            if ($response->successful()) {
                return $response->json()['choices'][0]['message']['content'];
            }

            Log::error("NVIDIA API Error: " . $response->body());
            return "Ryder AI is currently offline for maintenance. Please try again in a moment.";

        } catch (\Exception $e) {
            Log::error("Ryder AI Exception: " . $e->getMessage());
            return "I'm having trouble connecting to my neural core. Error: " . $e->getMessage();
        }
    }

    /**
     * الدالة القديمة لإنشاء المشروع (مبنية على المصفوفات الثابتة)
     * يمكن دمجها لاحقاً مع الـ AI لجعل البيانات المولدة أكثر ديناميكية
     */
    public function generateProject($data)
    {
        $level = $data['level'] ?? 'intermediate';
        $type = $data['type'] ?? 'web';
        $languages = $data['languages'] ?? ['react'];
        $goal = $data['goal'] ?? 'build';

        // محاكاة سريعة للـ Template (يمكنك إبقاء منطقك القديم هنا)
        $techStack = $this->generateTechStack($languages, $level);

        return [
            'project_name' => "Generated Project by Ryder AI",
            'tech_stack' => $techStack,
            'status' => 'success',
            // ... باقي الحقول التي تحتاجها في الـ Frontend
        ];
    }

    private function generateTechStack($languages, $level)
    {
        $stack = [];
        foreach ($languages as $language) {
            $lang = strtolower($language);
            if (isset($this->techRecommendations[$lang][$level])) {
                $stack = array_merge($stack, $this->techRecommendations[$lang][$level]);
            }
        }
        return array_unique($stack);
    }
}