import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
import { generateOtp } from '../src/utils/generateOtp';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()
async function main() {
  const dogWalking = await prisma.category.findFirst({ where: { name: 'Dog Walking'} });
  if (dogWalking) {
    for (let i = 0; i < 20; i++) {
      // User information
      const fullname: string = faker.person.fullName();
      const email: string = faker.internet.email();
      const emailVerified: Date = faker.date.recent();
      const otp: string = generateOtp();
      const otpExpiration: Date = new Date();
      const hashedPassword: string = bcrypt.hashSync('password', 10);
      const country: string = faker.location.country();
      const city: string = faker.location.city();
      const lat: number = faker.location.latitude(8.52999, 8.48661);
      const lng: number = faker.location.longitude(4.53937, 4.48572);
      const isVerified: boolean = true;
      const imageUrl: string = faker.image.avatar();
      const imageKey: string = imageUrl.replace('https://avatars.githubusercontent.com', '');
  
      // Services
      const price: number = faker.number.float({ min: 10, max: 50 });
      const experience: string = faker.number.int({ min: 1, max: 11 }) + 'yr';
      const description: string = faker.person.bio();
      const serviceLat: number = faker.location.latitude(8.50999, 8.47261);
      const serviceLng: number = faker.location.longitude(4.53937, 4.50572);
      const categoryId: string = dogWalking?.id;
      const fileUrl: string = faker.image.urlLoremFlickr({ category: 'animals'});
      const fileKey: string = fileUrl.replace('https://loremflickr.com/', '');

      await prisma.user.create({
        data: {
          name: fullname,
          email,
          emailVerified,
          city,
          country,
          hashedPassword,
          isVerified,
          lat,
          long: lng,
          otp,
          otpExpiration,
          imageKey,
          imageUrl,
          services: {
            create: [
              {
                categoryId,
                price,
                description,
                experience,
                fileKey,
                fileUrl,
                lat: serviceLat,
                lng: serviceLng
              }
            ]
          }
        }
      })
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })