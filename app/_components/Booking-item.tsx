import { Prisma } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { formatPrice } from '../details/[barberId]/_helpers/formatPrice'

type BookingItemProps = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date)
  return (
    <div className="min-w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Card className="rounded-lg">
            <CardContent className="flex justify-between py-0 pl-3 pr-6">
              <div className="py-3">
                <Badge variant={isBookingConfirmed ? 'default' : 'secondary'}>
                  {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
                </Badge>
                <h2 className="mt-3 font-bold">{booking.service.name}</h2>
                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="flex h-6 w-6 items-center">
                    <AvatarImage
                      src={booking.barbershop.imageUrl}
                      alt="barbearia"
                      className="object-cover"
                    />
                    <AvatarFallback>B</AvatarFallback>
                  </Avatar>
                  <h3 className="text-sm">{booking.barbershop.name}</h3>
                </div>
              </div>
              <div className="flex w-24 flex-col items-center justify-center border-l border-solid border-secondary pl-6">
                <p className="text-xs capitalize">
                  {format(booking.date, 'MMMM', { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, 'dd', { locale: ptBR })}
                </p>
                <p className="text-xs">
                  {format(booking.date, 'HH:mm', { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent>
          <h1 className=" border-b border-solid border-secondary py-6">
            Informações da Reserva
          </h1>
          <Card className="rounded-lg">
            <CardContent className="p-3">
              <div className="mb-3 flex justify-between">
                <h2>{booking.service.name}</h2>
                <p>{formatPrice(booking.service.price)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-25">Data</p>
                <p>date</p>
              </div>
              <div className="mb-3 mt-3 flex justify-between">
                <h2 className="text-sm text-gray-25">Horário</h2>
                <p>{formatPrice(booking.service.price)}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-sm text-gray-25">Barbearia</h2>
                <p>{formatPrice(booking.service.price)}</p>
              </div>
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default BookingItem
