import fs from 'fs';
import path from 'path';



/**
 * Save any file (image, pdf, etc.) to a dynamic folder and return relative path.
 * @param buffer - File buffer
 * @param originalName - Original file name
 * @param folder - Folder name inside /uploads
 * @returns string - Relative path to store in database
 */


export const saveSingleFile = async (
  buffer: Buffer,
  originalName: string,
  folder: string,
): Promise<string> => {
                                    // (e.g., /uploads/folder/)
  const uploadsDir = path.join(process.cwd(), 'uploads', folder);

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const ext = path.extname(originalName) || '';
  const fileName = `${Date.now()}-${ext}`;
  const filePath = path.join(uploadsDir, fileName);

  await fs.promises.writeFile(filePath, buffer);

  // Return the relative path (e.g., /uploads/loanDocuments/abc.pdf)
  return `/uploads/${folder}/${fileName}`;
};
