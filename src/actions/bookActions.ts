'use server';

import { revalidatePath } from 'next/cache';
import { bookSchema } from '../lib/validations';
import prisma from '../lib/db';

export async function createBook(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    author: formData.get('author') as string,
    year: parseInt(formData.get('year') as string),
    coverUrl: formData.get('coverUrl') as string || undefined,
    summary: formData.get('summary') as string || undefined,
  };

  const validatedData = bookSchema.parse(data);

  try {
    await prisma.book.create({
      data: validatedData,
    });
    revalidatePath('/');
  } catch (error) {
    throw new Error('Failed to create book');
  }
}

export async function getBooks(search?: string, sortBy?: string, sortOrder?: 'asc' | 'desc') {
  try {
    const where = search ? {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { author: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    const orderBy = sortBy ? { [sortBy]: sortOrder || 'asc' } : { createdAt: 'desc' as const };

    return await prisma.book.findMany({
      where,
      orderBy,
    });
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
}

export async function updateBook(id: string, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    author: formData.get('author') as string,
    year: parseInt(formData.get('year') as string),
    coverUrl: formData.get('coverUrl') as string || undefined,
    summary: formData.get('summary') as string || undefined,
  };

  const validatedData = bookSchema.parse(data);

  try {
    await prisma.book.update({
      where: { id },
      data: validatedData,
    });
    revalidatePath('/');
  } catch (error) {
    throw new Error('Failed to update book');
  }
}

export async function deleteBook(id: string) {
  try {
    await prisma.book.delete({
      where: { id },
    });
    revalidatePath('/');
  } catch (error) {
    throw new Error('Failed to delete book');
  }
}
