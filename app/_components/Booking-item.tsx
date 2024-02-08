'use client'
import { Prisma } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { formatPrice } from '../details/[barberId]/_helpers/formatPrice'
import Image from 'next/image'
import { Loader2, Smartphone } from 'lucide-react'
import { Button } from './ui/button'
import { cancelBooking } from '../_actions/cancel-booking'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

type BookingItemProps = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const router = useRouter()
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const isBookingConfirmed = isFuture(booking.date)

  const handleCancelClick = async () => {
    try {
      setIsDeleteLoading(true)
      await cancelBooking(booking.id)
      toast.success('Reserva cancelada com sucesso!')
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleteLoading(false)
      router.refresh()
    }
  }
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
        <SheetContent className="px-0">
          <SheetHeader className="border-b border-solid border-secondary px-5 pb-6 text-left">
            <SheetTitle>Informações da Reserva</SheetTitle>
          </SheetHeader>

          <div className="relative mt-6 h-[180px] w-full">
            <Image
              src="/barber-shop.png"
              fill
              alt={booking.barbershop.name}
              className=" px-5"
            />
            <div className="absolute bottom-4 left-0 w-full px-8">
              <Card className="w-full rounded-[8px]">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage
                        src={booking.barbershop.imageUrl}
                        className="object-cover"
                      />
                    </Avatar>
                    <div>
                      <h2 className="font-bold">{booking.barbershop.name}</h2>
                      <p className="overflow-hidden text-ellipsis text-nowrap text-xs text-gray-25">
                        {booking.barbershop.address}{' '}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 px-5">
            <Badge variant={isBookingConfirmed ? 'default' : 'secondary'}>
              {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>
            <Card className="mt-3 rounded-lg">
              <CardContent className="p-3">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">{booking.service.name}</h3>
                    <p className="text-sm font-bold">
                      {formatPrice(booking.service.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm text-gray-25">Data</h4>
                    <p className="text-sm capitalize">
                      {format(booking.date, "dd 'de ' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm text-gray-25">Horário</h4>
                    <p className="text-sm capitalize">
                      {format(booking.date, 'HH:mm')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm text-gray-25">Batbearia</h4>
                    <p className="text-sm">{booking.barbershop.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 space-y-3">
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

            {isBookingConfirmed && (
              <div className="mt-6 flex gap-3">
                <SheetClose asChild>
                  <Button variant="secondary" className="h-9 w-full">
                    Voltar
                  </Button>
                </SheetClose>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="h-9 w-full"
                      disabled={isDeleteLoading}
                    >
                      {isDeleteLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <span> Cancelar Reserva</span>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[90%]">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Deseja mesmo cancelar essa reserva?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Uma vez cancelada, não será possível reverter essa ação.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-row gap-3">
                      <AlertDialogCancel className="mt-0 w-full">
                        Voltar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isDeleteLoading}
                        onClick={handleCancelClick}
                        className="w-full"
                      >
                        {isDeleteLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <span> Confirmar</span>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default BookingItem
