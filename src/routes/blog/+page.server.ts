import { error } from '@sveltejs/kit';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import type { Dirent } from 'fs';
import type { PageServerLoad } from './$types';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  category: string;
  featured?: boolean;
}

interface MarkdownContent {
  frontmatter: Record<string, string | number | boolean>;
  body: string;
}

function parseFrontmatter(content: string): MarkdownContent {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterText = match[1];
  const body = match[2];

  const frontmatter: Record<string, string | number | boolean> = {};
  const lines = frontmatterText.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && trimmedLine.includes(':')) {
      const [key, ...valueParts] = trimmedLine.split(':');
      let value = valueParts.join(':').trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // Convert numeric strings to numbers
      if (!isNaN(Number(value)) && value !== '') {
        frontmatter[key.trim()] = Number(value);
      } else {
        frontmatter[key.trim()] = value;
      }
    }
  }

  return { frontmatter, body };
}

export const load: PageServerLoad = async () => {
  try {
    const blogDir = 'src/routes/blog';

    const entries = await readdir(blogDir, { withFileTypes: true });

    const blogDirs = entries
      .filter((entry: Dirent) => entry.isDirectory())
      .map((entry: Dirent) => entry.name);

    const blogPosts: BlogPost[] = [];

    for (const slug of blogDirs) {
      try {
        const markdownPath = join(blogDir, slug, '+page.md');
        const content = await readFile(markdownPath, 'utf-8');

        const { frontmatter } = parseFrontmatter(content);

        const blogPost: BlogPost = {
          slug,
          title: typeof frontmatter.title === 'string' ? frontmatter.title : 'Untitled',
          description: typeof frontmatter.description === 'string' ? frontmatter.description : '',
          date:
            typeof frontmatter.date === 'string'
              ? frontmatter.date
              : new Date().toISOString().split('T')[0],
          readingTime: typeof frontmatter.readingTime === 'number' ? frontmatter.readingTime : 5,
          category: typeof frontmatter.category === 'string' ? frontmatter.category : 'General',
          featured: typeof frontmatter.featured === 'boolean' ? frontmatter.featured : false
        };

        blogPosts.push(blogPost);
      } catch (err) {
        console.warn(`Failed to read blog post: ${slug}`, err);
      }
    }

    blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      blogPosts
    };
  } catch (err) {
    console.error('Failed to load blog posts:', err);
    throw error(500, 'Failed to load blog posts');
  }
};
