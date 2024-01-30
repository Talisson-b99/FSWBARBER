import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import Header from '../_components/Header'
import Search from './_components/Search'
import BookingItem from '../_components/Booking-item'
import { db } from '../_lib/prisma'
import BarbershopItem from './_components/Barbershop-item'

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})

  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-xl">
          Olá <span className="font-bold">Talisson!</span>
        </h2>
        <p className="text-gray-25 text-sm capitalize">
          {format(new Date(), "EE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="px-5">
        <Search />
      </div>
      <div className="px-5 pt-9">
        <h2 className="text-gray-25 mb-3 text-xs font-bold uppercase">
          Agendamentos
        </h2>
        <BookingItem />
      </div>

      <div className="px-5 pt-6">
        <h2 className="text-gray-25 mb-3 text-xs font-bold uppercase">
          Recomendados
        </h2>
        <div className="scrollbar scrollbar-thumb-primary  scrollbar-h-1.5 scrollbar-thumb-rounded-sm flex gap-4 overflow-x-scroll ">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
