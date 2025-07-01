export interface BlogMetadata {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

export interface BlogPost {
  metadata: BlogMetadata;
  component: React.ComponentType;
}
