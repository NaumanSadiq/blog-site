import { BlogPost } from "@/types/blog";

// Import all blog components and their metadata
import ManagingStateLaravelAngular, {
  metadata as managingStateLaravelAngularMeta,
} from "./managing-state-laravel-angular";
import StripeAngularLaravelPayments, {
  metadata as stripeAngularLaravelPaymentsMeta,
} from "./stripe-angular-laravel";

// Register all blogs here - add new blogs to this array
export const allBlogs: BlogPost[] = [
  {
    metadata: managingStateLaravelAngularMeta,
    component: ManagingStateLaravelAngular,
  },
  {
    metadata: stripeAngularLaravelPaymentsMeta,
    component: StripeAngularLaravelPayments,
  },
  // Add more blogs here as you create them
];

// Helper function to get a blog by ID
export function getBlogById(id: string): BlogPost | undefined {
  return allBlogs.find((blog) => blog.metadata.id === id);
}

// Helper function to get all blog metadata (for listing pages)
export function getAllBlogMetadata() {
  return allBlogs.map((blog) => blog.metadata);
}
