'use server'
import { db } from '@/app/_lib/prisma'

export const getBookingFinished = async (id: string) => {
  return await db.booking.findMany({
    where: {
      userId: id,
      date: {
        lt: new Date(),
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
