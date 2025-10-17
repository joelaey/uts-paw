import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  year: z.number().min(1000, 'Year must be at least 1000').max(new Date().getFullYear(), 'Year cannot be in the future'),
  coverUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  summary: z.string().optional(),
});

export type Book = z.infer<typeof bookSchema>;

export type BookFormData = z.infer<typeof bookSchema>;
