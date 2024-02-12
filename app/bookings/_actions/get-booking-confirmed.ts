'use server'
import { db } from '@/app/_lib/prisma'

export const getBookingConfirmed = async (id: string) => {
  return await db.booking.findMany({
    where: {
      userId: id,
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: 'asc',
    },
    include: {
      service: true,
      barbershop: true,
    },
  })
}
