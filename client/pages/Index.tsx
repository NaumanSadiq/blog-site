import { getAllBlogMetadata } from "@/blogs";
import { BlogCard } from "@/components/BlogCard";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Code, Laptop, Coffee } from "lucide-react";
import { useState, useMemo } from "react";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const blogs = getAllBlogMetadata();

  const filteredBlogs = useMemo(() => {
    if (!searchTerm) return blogs;
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );
  }, [blogs, searchTerm]);

  const featuredBlog = blogs[0]; // First blog as featured
  const otherBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen theme-gradient-bg">
      {/* Header */}
      <header className="theme-surface/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="theme-accent-bg text-white p-2 rounded-lg transition-all duration-300 hover:scale-105">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold theme-accent">DevBlog</h1>
                <p className="text-sm theme-text-secondary">
                  Full Stack Development Insights
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <div className="flex items-center gap-2 text-sm theme-text-secondary">
                <Laptop className="w-4 h-4" />
                <span>By Nauman Sadiq</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Coffee className="w-6 h-6 text-amber-600" />
            <Badge variant="secondary" className="text-sm">
              4+ Years Experience
            </Badge>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Developer Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Sharing insights, tutorials, and experiences from full-stack
            development with Laravel, Angular, JavaScript, and modern web
            technologies.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      {featuredBlog && !searchTerm && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
              <h3 className="text-2xl font-bold text-gray-900">
                Featured Article
              </h3>
            </div>
            <div className="max-w-3xl">
              <BlogCard blog={featuredBlog} />
            </div>
          </div>
        </section>
      )}

      {/* All Blogs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
            <h3 className="text-2xl font-bold text-gray-900">
              {searchTerm ? "Search Results" : "Latest Articles"}
            </h3>
            <span className="text-gray-500">({filteredBlogs.length})</span>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                No articles found
              </h4>
              <p className="text-gray-500">
                Try adjusting your search terms or browse all articles.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchTerm ? filteredBlogs : otherBlogs).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
              <Code className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">DevBlog</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Full Stack Developer sharing knowledge and experiences
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>Laravel • Angular • JavaScript • TypeScript</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
