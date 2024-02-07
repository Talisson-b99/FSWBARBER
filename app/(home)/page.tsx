import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import Header from '../_components/Header'
import Search from './_components/Search'
import { db } from '../_lib/prisma'
import BarbershopItem from './_components/Barbershop-item'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import BookingItem from '../_components/Booking-item'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, bookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            barbershop: true,
            service: true,
          },
        })
      : Promise.resolve([]),
  ])

  const name = session?.user
    ? session?.user?.name?.split(' ')[0]
    : 'Seja bem-vindo'

  return (
    <div className="mb-12">
      <Header />
      <div className=" lg:bg-home bg-none">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:justify-center lg:gap-32 lg:px-32 lg:py-16">
          <div>
            <div className="px-5 py-6 lg:pt-0">
              <h2 className="text-xl">
                Olá <span className="font-bold">{name}!</span>
              </h2>
              <p className="text-sm capitalize text-gray-25">
                {format(new Date(), "EE',' dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </p>
            </div>
            <div className="px-5">
              <Search />
            </div>
            {bookings.length > 0 && (
              <div className="px-5 pt-9">
                <h2 className="mb-3 text-xs font-bold uppercase text-gray-25 lg:text-sm ">
                  Agendamentos
                </h2>

                <div className="flex gap-3 overflow-x-scroll scrollbar scrollbar-thumb-primary scrollbar-thumb-rounded-sm scrollbar-h-1 ">
                  {bookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <h2 className="hidden lg:flex mb-3 text-xs font-bold uppercase text-gray-25 lg:text-sm">
              Mais visitados
            </h2>
            <div className="px-5 pt-6">
              <div className=" hidden gap-4 scrollbar-h-1 lg:flex lg:overflow-x-scroll lg:scrollbar lg:scrollbar-thumb-primary lg:scrollbar-thumb-rounded-sm ">
                {barbershops.map((barbershop) => (
                  <BarbershopItem barbershop={barbershop} key={barbershop.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pt-6 lg:px-32">
        <h2 className="mb-3 text-xs font-bold uppercase lg:text-xl">
          Recomendados
        </h2>
        <div className="flex gap-4  overflow-x-scroll scrollbar scrollbar-thumb-primary scrollbar-thumb-rounded-sm scrollbar-h-1">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>

      <div className="px-5 pb-24 pt-6 lg:px-32 lg:pt-10">
        <h2 className="mb-3 text-xs font-bold uppercase  lg:text-xl">
          Populares
        </h2>
        <div className="flex gap-4  overflow-x-scroll scrollbar scrollbar-thumb-primary scrollbar-thumb-rounded-sm scrollbar-h-1">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
