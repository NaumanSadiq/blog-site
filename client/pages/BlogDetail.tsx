import { useParams, Navigate } from "react-router-dom";
import { getBlogById } from "@/blogs";
import { BlogLayout } from "@/components/BlogLayout";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const blog = getBlogById(id);

  if (!blog) {
    return (
      <BlogLayout>
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Blog Not Found
          </h1>
          <p className="text-gray-600">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </BlogLayout>
    );
  }

  const BlogComponent = blog.component;

  return (
    <BlogLayout>
      <BlogComponent />
    </BlogLayout>
  );
}
