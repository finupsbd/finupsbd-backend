import { prisma } from '../../app';

const lastUser = async () => {
  const id = await prisma.user.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      userId: true,
    },
  });
  return id;
};

export async function generateUserId() {
  let newUserId;
  const  userId  = await lastUser();
  if (userId?.userId) {
    // Example: "250112001"
      const prefix = userId?.userId?.slice(0, 6); // Extract prefix, e.g., "250112"
      const sequence = parseInt(userId.userId.slice(6), 10); // Extract numeric part, e.g., "001"
      const nextSequence = (sequence + 1).toString().padStart(3, '0'); // Increment and pad with zeros
      newUserId = `${prefix}${nextSequence}`; // Combine prefix and new sequence
  } else {
    // If no users exist, start with the first ID
    newUserId = '250112001';
  }

  return newUserId;
}
