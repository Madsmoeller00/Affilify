import { PrismaClient } from '@prisma/client';
import { mapCategory } from '../utils/categoryMapping.js';

const prisma = new PrismaClient();

function normalizeCategory(category) {
  try {
    // First try to normalize any potentially malformed UTF-8 strings
    const decoded = decodeURIComponent(escape(category));
    // Replace common encoding issues
    return decoded
      .replace(/Ã¸/g, 'ø')
      .replace(/Ã¦/g, 'æ')
      .replace(/Ã¥/g, 'å')
      .replace(/Ã˜/g, 'Ø')
      .replace(/Ã†/g, 'Æ')
      .replace(/Ã…/g, 'Å');
  } catch (e) {
    // If decoding fails, return the original string
    return category;
  }
}

async function updateCategoryMappings() {
  try {
    // Get all programs
    const programs = await prisma.program.findMany();
    
    console.log(`Found ${programs.length} programs to update`);
    
    // Update each program with its mapped category
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
      
      if (program.category !== normalizedCategory) {
        console.log(`Fixed encoding for ${program.programName}: "${program.category}" -> "${normalizedCategory}"`);
      }
      console.log(`Updated ${program.programName} from "${normalizedCategory}" to "${mappedCategory}"`);
    }
    
    console.log('Category mapping update completed successfully');
  } catch (error) {
    console.error('Error updating category mappings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the update
updateCategoryMappings(); 