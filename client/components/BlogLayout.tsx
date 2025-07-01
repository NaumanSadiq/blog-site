import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

interface BlogLayoutProps {
  children: ReactNode;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen theme-gradient-bg">
      {/* Navigation */}
      <nav className="theme-surface/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="theme-surface-hover theme-text-primary"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-bold theme-accent"
              >
                <Home className="w-5 h-5" />
                DevBlog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
