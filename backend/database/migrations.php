
// 1. users table
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->string('password');
    $table->json('skill_tags')->nullable();
    $table->enum('experience_level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
    $table->text('bio')->nullable();
    $table->string('avatar_url')->nullable();
    $table->timestamps();
});

// 2. generated_projects table
Schema::create('generated_projects', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('project_name');
    $table->string('slug')->unique();
    $table->text('description');
    $table->json('user_input');
    $table->json('tech_stack');
    $table->json('features');
    $table->json('db_schema');
    $table->json('implementation_steps');
    $table->json('future_enhancements');
    $table->enum('status', ['generated', 'in-progress', 'completed', 'archived'])->default('generated');
    $table->integer('completion_percentage')->default(0);
    $table->boolean('is_public')->default(false);
    $table->timestamps();
});

php artisan migrate