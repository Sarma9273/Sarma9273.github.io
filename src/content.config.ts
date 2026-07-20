import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const commonLinks = {
  repositoryUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  reportUrl: z.string().optional(),
  googleDocUrl: z.string().optional(),
};

const blogs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blogs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    domain: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    coverIcon: z.string().default('article'),
    relatedProject: z.string().optional(),
    ...commonLinks,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    status: z.string(),
    period: z.string(),
    domain: z.string(),
    role: z.string(),
    technologies: z.array(z.string()),
    featured: z.boolean().default(false),
    legacy: z.boolean().default(false),
    coverIcon: z.string().default('code'),
    blogSlug: z.string().optional(),
    outcomes: z.array(z.string()).default([]),
    ...commonLinks,
  }),
});

export const collections = { blogs, projects };
