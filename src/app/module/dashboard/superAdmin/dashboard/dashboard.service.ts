import { prisma } from "../../../../../app";


const dashboardHome = async () => {

  // Define time ranges
  const startOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
  const endOfLastMonth = new Date(startOfThisMonth.getTime() - 1); // last day of last month


  // Users
  const usersThisMonth = await prisma.user.count({
    where: { createdAt: { gte: startOfThisMonth } },
  });

  const usersLastMonth = await prisma.user.count({
    where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
  });


  // Applications
  const applicationsThisMonth = await prisma.loanApplicationForm.count({
    where: { createdAt: { gte: startOfThisMonth } },
  });
  const applicationsLastMonth = await prisma.loanApplicationForm.count({
    where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
  });





  // Growth formula
  const calcGrowth = (prev: number, current: number) => {
    if (prev === 0 && current > 0) return "+100%"; // avoid divide-by-zero
    if (prev === 0 && current === 0) return "0%";

    const growth = ((current - prev) / prev) * 100;
    return (growth < 0 ? 0 : growth).toFixed(2) + "%";
  };

  const userGrowth = calcGrowth(usersLastMonth, usersThisMonth);
  const applicantGrowth = calcGrowth(applicationsLastMonth, applicationsThisMonth);


  const totalUsers = await prisma.user.count()
  const totalApplications = await prisma.loanApplicationForm.count()


  const last5Application = await prisma.loanApplicationForm.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 5,
    select: {
      status: true,
      applicationId: true,
      user: {
        select: {
          name: true
        }
      }
    },
  })

  const last5User= await prisma.user.findMany({
    take: 5, 
    select: {
      id: true,
      name: true, 
      userId: true,
      profile: true, 
      createdAt: true
    }
  })


  return {
    totalUsers,
    totalApplications,
    userGrowth,
    applicantGrowth,
    last5Application, 
    last5User
  }
}




export const DashboardServides = {
  dashboardHome,
}

