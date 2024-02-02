import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import Header from '../_components/Header'
import Search from './_components/Search'
import { db } from '../_lib/prisma'
import BarbershopItem from './_components/Barbershop-item'

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})

  return (
    <div className="mb-12">
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-xl">
          Olá <span className="font-bold">Talisson!</span>
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
      <div className="px-5 pt-9">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-25">
          Agendamentos
        </h2>
        {/* <BookingItem /> */}
      </div>

      <div className="px-5 pt-6">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-25">
          Recomendados
        </h2>
        <div className="flex gap-4  overflow-x-scroll scrollbar scrollbar-thumb-primary scrollbar-thumb-rounded-sm scrollbar-h-1.5 ">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>

      <div className="px-5 pb-24 pt-6">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-25">
          Populares
        </h2>
        <div className="flex gap-4  overflow-x-scroll scrollbar scrollbar-thumb-primary scrollbar-thumb-rounded-sm scrollbar-h-1.5 ">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
