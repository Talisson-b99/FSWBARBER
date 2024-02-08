import { getServerSession } from 'next-auth'
import BookingItem from '../_components/Booking-item'
import Header from '../_components/Header'
import { db } from '../_lib/prisma'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/')
  }

  const [confirmedBookings, fineshedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ])

  return (
    <div className="pb-24">
      <Header />
      <div className=" px-5">
        <h1 className="mt-6 text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length > 0 && (
          <>
            <h3 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-25">
              Confirmados
            </h3>
            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
        {fineshedBookings.length > 0 && (
          <>
            <h3 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-25">
              Finalizados
            </h3>
            <div className="flex flex-col gap-3">
              {fineshedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Bookings
