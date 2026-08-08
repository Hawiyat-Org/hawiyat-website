import { prisma } from '../lib/prisma/prismaClient';

async function main() {
  const bh = await prisma.businessHours.findMany();
  console.log('businessHours rows:', bh.length);
  const wl = await prisma.waitlist.count();
  console.log('waitlist count:', wl);
  const b = await prisma.booking.count();
  console.log('booking count:', b);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('NODE PATH ERROR:', e);
    process.exit(1);
  });
