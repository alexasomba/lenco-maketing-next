export interface BlogPostFrontmatter {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTimeMinutes?: number;
  author?: string | string[];
  thumbnail?: string;
}
