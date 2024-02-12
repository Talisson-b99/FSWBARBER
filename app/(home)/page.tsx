import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import Header from '../_components/Header'
import Search from './_components/Search'
import { db } from '../_lib/prisma'
import BarbershopItem from './_components/Barbershop-item'
import { getServerSession } from 'next-auth'

import BookingItem from '../_components/Booking-item'
import { authOptions } from '../_lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, recommendBarbershops, bookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        id: 'asc',
      },
    }),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          orderBy: {
            date: 'asc',
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
    <div className="mb-1">
      <Header />
      <div className=" bg-none xl:bg-home">
        <div className="xl:grid xl:grid-cols-2 xl:items-start xl:justify-center xl:gap-32 xl:px-32 xl:py-16">
          <div>
            <div className="px-5 py-6 xl:pt-0">
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
                <h2 className="mb-3 text-xs font-bold uppercase text-gray-25 xl:text-sm ">
                  Agendamentos
                </h2>

                <div className="flex gap-3 overflow-x-scroll scrollbar scrollbar-thumb-primary scrollbar-thumb-rounded-sm scrollbar-h-1 ">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="w-[500px] min-w-[280px]">
                      <BookingItem booking={booking} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <h2 className="mb-3 hidden text-xs font-bold uppercase  text-gray-25 xl:flex xl:text-sm">
              Mais visitados
            </h2>
            <div className=" pt-6">
              <div className=" hidden gap-4 scrollbar-h-1 xl:flex xl:overflow-x-scroll xl:scrollbar xl:scrollbar-thumb-primary xl:scrollbar-thumb-rounded-sm ">
                {barbershops.map((barbershop) => (
                  <div key={barbershop.id} className="min-w-[167px]">
                    <BarbershopItem barbershop={barbershop} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pt-6 xl:px-32">
        <h2 className="mb-3 text-xs font-bold uppercase xl:text-xl">
          Recomendados
        </h2>
        <div className="flex gap-4  overflow-x-scroll scrollbar scrollbar-thumb-primary scrollbar-thumb-rounded-sm scrollbar-h-1">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-24 pt-6 xl:px-32 xl:pt-10">
        <h2 className="mb-3 text-xs font-bold uppercase  xl:text-xl">
          Populares
        </h2>
        <div className="flex gap-4  overflow-x-scroll scrollbar scrollbar-thumb-primary scrollbar-thumb-rounded-sm scrollbar-h-1">
          {recommendBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
