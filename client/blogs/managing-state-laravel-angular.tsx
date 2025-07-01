import { BlogMetadata } from "@/types/blog";
import { useTheme } from "@/hooks/use-theme";

export const metadata: BlogMetadata = {
  id: "managing-state-laravel-angular",
  title: "Managing State with Laravel and Angular: A Complete Guide",
  description:
    "Learn how to effectively manage state between Laravel backend and Angular frontend, including best practices for API design, data flow, and state management patterns.",
  thumbnail: "/api/placeholder/800/400",
  author: "Nauman Sadiq",
  date: "2024-01-15",
  readTime: "8 min read",
  tags: ["Laravel", "Angular", "Full Stack", "State Management", "API"],
  category: "Full Stack Development",
};

export default function ManagingStateLaravelAngular() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-8 theme-surface rounded-xl shadow-lg">
      <header className="mb-8">
        <h1 className="text-4xl font-bold theme-text-primary mb-4">
          {metadata.title}
        </h1>
        <div className="flex items-center gap-4 theme-text-secondary mb-6">
          <span>By {metadata.author}</span>
          <span>•</span>
          <span>{metadata.date}</span>
          <span>•</span>
          <span>{metadata.readTime}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 theme-accent-bg/20 theme-accent rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <img
          src={metadata.thumbnail}
          alt={metadata.title}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl theme-text-primary leading-relaxed mb-6">
          When building modern web applications with Laravel and Angular, one of
          the most critical aspects to get right is state management. This
          comprehensive guide will walk you through the best practices for
          managing state between your Laravel backend and Angular frontend.
        </p>

        <h2
          className="text-2xl font-semibold mt-8 mb-4"
          style={{ color: "hsl(var(--theme-text-primary))" }}
        >
          Introduction
        </h2>
        <p
          className="leading-relaxed mb-6"
          style={{ color: "hsl(var(--theme-text-secondary))" }}
        >
          As a full-stack developer with over 4 years of experience working with
          Laravel and Angular, I've encountered numerous challenges in managing
          application state effectively. The key is to establish a clear data
          flow and maintain consistency between your backend API and frontend
          state.
        </p>

        <h2
          className="text-2xl font-semibold mt-8 mb-4"
          style={{ color: "hsl(var(--theme-text-primary))" }}
        >
          Laravel Backend: API Design Principles
        </h2>

        <h3
          className="text-xl font-semibold mt-6 mb-3"
          style={{ color: "hsl(var(--theme-text-primary))" }}
        >
          1. RESTful API Structure
        </h3>
        <p
          className="leading-relaxed mb-4"
          style={{ color: "hsl(var(--theme-text-secondary))" }}
        >
          Start by designing your Laravel API following RESTful principles. This
          creates a predictable structure that your Angular frontend can easily
          consume.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            {`// routes/api.php
Route::apiResource('posts', PostController::class);
Route::apiResource('users', UserController::class);

// This creates routes like:
// GET /api/posts - List all posts
// POST /api/posts - Create a new post
// GET /api/posts/{post} - Get specific post
// PUT /api/posts/{post} - Update specific post
// DELETE /api/posts/{post} - Delete specific post`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          2. API Resources for Consistent Data Format
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Use Laravel's API Resources to ensure consistent data formatting
          across your application.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            {`// app/Http/Resources/PostResource.php
<?php

namespace App\\Http\\Resources;

use Illuminate\\Http\\Resources\\Json\\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'author' => new UserResource($this->whenLoaded('author')),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Angular Frontend: State Management Strategies
        </h2>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          1. Services for Data Management
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Create Angular services that act as the single source of truth for
          your application data.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-blue-400 text-sm">
            {`// services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts').pipe(
      tap(posts => this.postsSubject.next(posts))
    );
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>('/api/posts', post).pipe(
      tap(newPost => {
        const currentPosts = this.postsSubject.value;
        this.postsSubject.next([...currentPosts, newPost]);
      })
    );
  }
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          2. Reactive Programming with RxJS
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Leverage RxJS for reactive state management that automatically updates
          your UI when data changes.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-blue-400 text-sm">
            {`// components/post-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  template: \`
    <div *ngFor="let post of posts$ | async" class="post-card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
    </div>
  \`
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {
    this.posts$ = this.postService.posts$;
  }

  ngOnInit() {
    this.postService.getPosts().subscribe();
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Best Practices for State Synchronization
        </h2>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          1. Optimistic Updates
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Implement optimistic updates to improve user experience by updating
          the UI immediately while the API call is in progress.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          2. Error Handling
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Always implement proper error handling to revert optimistic updates
          when API calls fail.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          3. Caching Strategy
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Implement intelligent caching to reduce unnecessary API calls and
          improve performance.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Conclusion
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Effective state management between Laravel and Angular requires
          careful planning and consistent patterns. By following these
          practices, you'll build maintainable, scalable applications that
          provide excellent user experiences.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Remember, the key is to keep your state management simple and
          predictable. Start with basic patterns and gradually introduce more
          complex solutions as your application grows.
        </p>
      </div>
    </article>
  );
}
