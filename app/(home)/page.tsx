import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import Header from '../_components/Header'
import Search from './_components/Search'
import BookingItem from '../_components/Booking-item'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-xl">
          Olá <span className="font-bold">Talisson!</span>
        </h2>
        <p className="text-sm capitalize">
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
    </div>
  )
}
