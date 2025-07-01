import { BlogMetadata } from "@/types/blog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  blog: BlogMetadata;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link to={`/blog/${blog.id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full theme-surface border">
        <div className="aspect-video overflow-hidden relative">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="secondary"
              className="text-xs bg-blue-100 text-blue-800 border border-blue-200"
            >
              {blog.category}
            </Badge>
          </div>
          <h3 className="text-xl font-bold theme-text-primary mb-3 group-hover:text-[hsl(var(--theme-accent))] transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="theme-text-secondary mb-4 line-clamp-3">
            {blog.description}
          </p>
          <div className="flex items-center justify-between text-sm theme-text-secondary">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs theme-text-secondary border-border"
              >
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs theme-text-secondary border-border"
              >
                +{blog.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
