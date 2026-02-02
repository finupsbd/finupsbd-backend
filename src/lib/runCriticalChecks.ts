
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


// Function to run critical checks
export async function runCriticalChecks() {
  console.log("Running critical checks...");

  // 1. Check database connection
  try {
    await prisma.$connect();
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // stop server if DB is critical
  }

//   // 2. Check Redis
//   try {

//      if (!client.isOpen) {
//        await client.connect();
//        console.log("✅ Redis connected");
//    }
    
//   } catch (err) {
//     console.error("❌ Redis connection failed:", err);
//     process.exit(1);
//   }

  // 3. Check third-party API (example: payment gateway)


  console.log("All critical checks passed ✅");
}

