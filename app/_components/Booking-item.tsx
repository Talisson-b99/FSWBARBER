import { Prisma } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { format, isFuture, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
        <div className="flex flex-col items-center justify-center border-l border-solid border-secondary pl-6">
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
  )
}

export default BookingItem
