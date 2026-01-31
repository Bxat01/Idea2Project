<?php

namespace App\Http\Controllers;

use App\Models\GeneratedProject;
use App\Services\ProjectGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    protected $projectGenerator;

    public function __construct(ProjectGeneratorService $projectGenerator)
    {
        $this->projectGenerator = $projectGenerator;
    }

    public function generate(Request $request)
    {
        $request->validate([
            'languages' => 'required|array',
            'level' => 'required|in:beginner,intermediate,advanced',
            'type' => 'required|in:web,desktop,api,full-stack',
            'goal' => 'required|in:learn,graduation,employment'
        ]);

        $projectData = $this->projectGenerator->generateProject($request->all());

        $project = GeneratedProject::create([
            'user_id' => $request->user()->id,
            'project_name' => $projectData['project_name'],
            'slug' => Str::slug($projectData['project_name']) . '-' . uniqid(),
            'description' => $projectData['description'],
            'user_input' => $request->all(),
            'tech_stack' => $projectData['tech_stack'],
            'features' => $projectData['features'],
            'db_schema' => $projectData['db_schema'],
            'implementation_steps' => $projectData['implementation_steps'],
            'future_enhancements' => $projectData['future_enhancements'],
            'status' => 'generated'
        ]);

        return response()->json([
            'message' => 'Project generated successfully',
            'project' => $project
        ]);
    }

    public function index(Request $request)
    {
        $projects = GeneratedProject::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($projects);
    }

    public function show($id)
    {
        $project = GeneratedProject::findOrFail($id);
        
        if ($project->user_id !== auth()->id() && !$project->is_public) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        $project = GeneratedProject::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $project->update($request->all());

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project
        ]);
    }

    public function destroy($id)
    {
        $project = GeneratedProject::where('user_id', auth()->id())
            ->findOrFail($id);

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
    public function handleChat(Request $request, $id) 
{
    $project = \App\Models\GeneratedProject::findOrFail($id);
    
    $userMessage = $request->input('message');

    $aiService = new \App\Services\ProjectGeneratorService();
    $reply = $aiService->askRyderAI($userMessage, $project);

    return response()->json([
        'reply' => $reply
    ]);
}
}