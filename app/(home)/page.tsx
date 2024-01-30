import { format } from 'date-fns'

import Header from '../_components/Header'
import { ptBR } from 'date-fns/locale'

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
    </div>
  )
}
