'use client'

import { cancelBooking } from '@/app/_actions/cancel-booking'
import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { DrawerClose } from '@/app/_components/ui/drawer'
import { formatPrice } from '@/app/details/[barberId]/_helpers/formatPrice'
import { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Loader2, Smartphone } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

type BookingItemProps = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
  deleteService: (id: any) => void
}

const Infobooking = ({ booking, deleteService }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const isBookingConfirmed = isFuture(booking.date)

  const handleCancelClick = async () => {
    try {
      setIsDeleteLoading(true)
      deleteService(booking.id)
      await cancelBooking(booking.id)
      toast.success('Reserva cancelada com sucesso!')
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <div className=" hidden xl:mt-[-10px] xl:flex xl:min-h-[full]  xl:flex-col xl:rounded-t-[16px] xl:bg-card">
      <div className="relative my-5 h-[180px] w-full px-5">
        <Image
          src={booking.barbershop.imageUrl}
          fill
          alt=""
          className=" object-cover px-5"
        />
        <div className="absolute bottom-4 left-0 w-full px-8">
          <Card className="w-full rounded-[8px]">
            <CardContent className="p-3">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage
                    src={booking.service.imageUrl}
                    className="object-cover"
                  />
                </Avatar>
                <div>
                  <h2 className="font-bold">{booking.barbershop.name}</h2>
                  <p className="overflow-hidden text-ellipsis text-nowrap text-xs text-gray-25">
                    {booking.barbershop.address}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="px-5">
        <h3 className="mb-2.5 text-sm font-bold">SOBRE NÓS</h3>
        <p className="text-sm text-gray-25">
          Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
          equipe de mestres barbeiros transforma cortes de cabelo e barbas em
          obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo
          e uma comunidade unida.
        </p>
      </div>
      <div className="mx-5 mt-5 space-y-2.5 border-y border-solid border-secondary py-5">
        <div className="flex items-center">
          <Smartphone size={24} strokeWidth={1.5} className="mr-2.5" />
          (11) 98204-5108
          <Button className="ml-auto h-9" variant="secondary">
            Copiar
          </Button>
        </div>
        <div className="flex items-center">
          <Smartphone size={24} strokeWidth={1.5} className="mr-2.5" />
          (11) 98204-5108
          <Button className="ml-auto h-9" variant="secondary">
            Copiar
          </Button>
        </div>
      </div>
      <div className="mx-5 mb-2.5 mt-5 ">
        <Badge variant={isBookingConfirmed ? 'default' : 'secondary'}>
          {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
        </Badge>
      </div>
      <div className="mx-5 space-y-3 rounded-[8px] border border-solid border-secondary p-5">
        <div className="flex justify-between">
          <h3 className="font-bold">{booking.service.name}</h3>
          <p className="text-sm font-bold">
            {formatPrice(booking.service.price)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-25">Data</p>
          <p className="text-sm">
            {format(booking.date, "dd 'de'   MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-25">Horário</p>
          <p className="text-sm">
            {format(booking.date, 'HH:mm', { locale: ptBR })}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-25">Barbearia</p>
          <p className="text-sm">{booking.barbershop.name}</p>
        </div>
      </div>
      <div className="mx-5 pb-24 pt-24">
        {isBookingConfirmed === true && (
          <DrawerClose asChild>
            <Button
              onClick={handleCancelClick}
              variant="destructive"
              className="mb-10 w-full"
            >
              {isDeleteLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span>Cancelar Reserva</span>
              )}
            </Button>
          </DrawerClose>
        )}
      </div>
    </div>
  )
}

export default Infobooking
