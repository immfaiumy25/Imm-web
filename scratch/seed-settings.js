const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = [
    { key: 'contact_instagram', value: 'https://instagram.com/immfaiumy' },
    { key: 'contact_email', value: 'immfaiumy@gmail.com' },
    { key: 'contact_whatsapp', value: 'https://wa.me/6281234567890' },
    { key: 'cta_registration_url', value: 'https://forms.gle/immfaiumy' }
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value }
    });
  }
  console.log("Settings seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
