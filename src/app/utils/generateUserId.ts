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
console.log(newUserId);
  return newUserId;
}



  // const currentYear = new Date().getFullYear().toString().slice(-2); // Last 2 digits of the year
  // const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0"); // Month in 2 digits
  // const currentDate = new Date().getDate().toString().padStart(2, "0"); // Date in 2 digits

  // // Increment padded to 3 digits
  // const incrementValue = increment.toString().padStart(3, "0");

  // // Combine year, month, date, and increment
  // const userUnkId = `${currentYear}${currentMonth}${currentDate}${incrementValue}`;
  //     console.log(userUnkId);
  // // Ensure the length is under 8 digits by trimming if necessary
  // // userUnkId = userUnkId.slice(0, 8);
