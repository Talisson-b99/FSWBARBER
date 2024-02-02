import { getServerSession } from 'next-auth'
import BookingItem from '../_components/Booking-item'
import Header from '../_components/Header'
import { db } from '../_lib/prisma'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { isFuture, isPast } from 'date-fns'

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/')
  }
  const bookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  })
  const cofirmedBookings = bookings.filter((booking) => isFuture(booking.date))
  const fineshedBookings = bookings.filter((booking) => isPast(booking.date))

  return (
    <>
      <Header />
      <div className="px-5">
        <h1 className="mt-6 text-xl font-bold">Agendamentos</h1>
        <h3 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-25">
          Confirmados
        </h3>
        <div className="flex flex-col gap-3">
          {cofirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        <h3 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-25">
          Finalizados
        </h3>
        <div className="flex flex-col gap-3">
          {fineshedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Bookings
