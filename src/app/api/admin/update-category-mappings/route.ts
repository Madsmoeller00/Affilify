import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { mapCategory } from '@/utils/categoryMapping';

const prisma = new PrismaClient();

function normalizeCategory(category: string) {
  try {
    const decoded = decodeURIComponent(escape(category));
    return decoded
      .replace(/Ã¸/g, 'ø')
      .replace(/Ã¦/g, 'æ')
      .replace(/Ã¥/g, 'å')
      .replace(/Ã˜/g, 'Ø')
      .replace(/Ã†/g, 'Æ')
      .replace(/Ã…/g, 'Å');
  } catch (e) {
    return category;
  }
}

export async function POST() {
  try {
    const programs = await prisma.program.findMany();
    
    for (const program of programs) {
      const normalizedCategory = normalizeCategory(program.category);
      const mappedCategory = mapCategory(normalizedCategory);
      
      await prisma.program.update({
        where: { id: program.id },
        data: { 
          category: normalizedCategory,
          categoryMapping: mappedCategory 
        }
      });
    }
    
    return NextResponse.json({ 
      success: true,
      message: `Updated ${programs.length} programs successfully`
    });
  } catch (error) {
    console.error('Error updating category mappings:', error);
    return NextResponse.json(
      { error: 'Failed to update category mappings' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  );
} 