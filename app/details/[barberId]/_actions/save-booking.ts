'use server'

import { db } from '@/app/_lib/prisma'
import { revalidatePath } from 'next/cache'

type SaveBookingParams = {
  babershopId: string
  serviceId: string
  userId: string
  date: Date
}

export const saveBooking = async ({
  babershopId,
  serviceId,
  userId,
  date,
}: SaveBookingParams) => {
  await db.booking.create({
    data: {
      serviceId,
      userId,
      babershopId,
      date,
    },
  })
  revalidatePath('/')
  revalidatePath('/bookings')
}
