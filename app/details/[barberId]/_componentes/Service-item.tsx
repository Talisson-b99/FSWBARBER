'use client'
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from '@/app/_components/ui/button'
import { Calendar } from '@/app/_components/ui/calendar'
import { Card, CardContent } from '@/app/_components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/_components/ui/sheet'
import { Barbershop, Booking, Service } from '@prisma/client'
import { ptBR } from 'date-fns/locale'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { generateDayTimeList } from '../_helpers/hours'
import { motion } from 'framer-motion'
import { formatPrice } from '../_helpers/formatPrice'
import { format, setHours, setMinutes } from 'date-fns'
import { saveBooking } from '../_actions/save-booking'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getDayBookings } from '../_actions/get-bookings'

type ServiceItemProps = {
  barbershop: Barbershop
  service: Service
  isAuthenticated?: string | null
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setBookings] = useState<Booking[]>([])
  const { data } = useSession()
  const router = useRouter()

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
  }

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      signIn('google')
    }
  }

  const handleBookingSubmit = async () => {
    try {
      setLoading(true)
      if (!hour || !date || !data?.user) {
        return null
      }
      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

      await saveBooking({
        serviceId: service.id,
        babershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      })

      setSheetIsOpen(false)
      setDate(undefined)
      setHour(undefined)
      toast('Reseva realizada com sucesso!', {
        description: format(newDate, "'Para 'dd 'de'   MMMM 'às' HH:mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: 'Visualizar',
          onClick: () => {
            router.push('/bookings')
            router.refresh()
          },
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useMemo(() => {
    setHour(undefined)
  }, [date])

  const timeList = useMemo(() => {
    if (!date) {
      return []
    }

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(':')[0])
      const timeMinutes = Number(time.split(':')[1])

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours()
        const bookingMinutes = booking.date.getMinutes()

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })
      if (!booking) {
        return true
      }
      return false
    })
  }, [date, dayBookings])

  useEffect(() => {
    if (!date) {
      return
    }
    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date)

      setBookings(_dayBookings)
    }
    refreshAvailableHours()
  }, [date])

  return (
    <Card className="mx-5 mb-3 rounded-[8px] lg:mx-0 xl:mb-0">
      <CardContent className="p-3">
        <div className="w-ful flex gap-3">
          <div className="relative max-h-28 min-h-28 min-w-28 max-w-28">
            <Image
              src={service.imageUrl}
              alt={service.name}
              sizes="100vw"
              fill
              className="rounded-[8px] object-cover"
              width={0}
              height={0}
            />
          </div>
          <div className="flex w-full flex-col">
            <div>
              <h2 className="text-sm font-bold">{service.name}</h2>
              <p className="mt-1 text-sm text-gray-25">{service.description}</p>
            </div>
            <div className="flex flex-1 items-end">
              <div className="flex w-full items-center justify-between">
                <span className="text-sm font-bold text-primary">
                  {formatPrice(Number(service.price))}
                </span>
                <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      onClick={handleBookingClick}
                      variant="secondary"
                      className="text-sm font-bold"
                    >
                      Reservar
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="p-0">
                    <SheetHeader className=" border-secodary border-b border-solid px-5 py-6 text-start">
                      <SheetTitle>Fazer Reserva</SheetTitle>
                    </SheetHeader>
                    <Calendar
                      mode="single"
                      selected={date}
                      locale={ptBR}
                      onSelect={handleDateClick}
                      fromDate={new Date()}
                      className="w-full"
                      styles={{
                        head_cell: {
                          width: '100%',
                          textTransform: 'capitalize',
                        },
                        cell: {
                          width: '100%',
                        },
                        button: {
                          width: '100%',
                        },
                        nav_button_previous: {
                          width: '32px',
                          height: '32px',
                        },
                        nav_button_next: {
                          width: '32px',
                          height: '32px',
                        },
                        caption: {
                          textTransform: 'capitalize',
                          justifyItems: '',
                        },
                      }}
                    />

                    {date && (
                      <div className="flex gap-3 overflow-x-scroll border-y border-solid border-secondary  px-5 py-6 scrollbar scrollbar-none">
                        {timeList.map((time) => (
                          <Button
                            onClick={() => handleHourClick(time)}
                            className={`relative  rounded-full`}
                            variant="outline"
                            key={time}
                          >
                            {hour === time && (
                              <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 z-10 rounded-full bg-primary "
                                transition={{ duration: 0.3 }}
                              />
                            )}
                            <span className="relative z-20">{time}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                    <div className="mx-5 py-6">
                      <Card className="rounded-md">
                        <CardContent className="p-3">
                          <div className="flex justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <h3 className="text-sm font-bold">
                              {formatPrice(service.price)}
                            </h3>
                          </div>
                          <div className="mt-3 space-y-3">
                            {date && (
                              <div className="flex justify-between">
                                <h3 className="text-sm text-gray-25">Data</h3>
                                <p className="text-sm ">
                                  {format(date, "dd 'de'   MMMM", {
                                    locale: ptBR,
                                  })}
                                </p>
                              </div>
                            )}
                            {hour && (
                              <div className="flex justify-between">
                                <h3 className="text-sm text-gray-25">
                                  Horário
                                </h3>
                                <p className="text-sm">{hour}</p>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <h3 className="text-sm text-gray-25">
                                Barbearia
                              </h3>
                              <p className="text-sm">{barbershop.name}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <SheetFooter className="px-5">
                      <Button
                        className="w-full"
                        onClick={() => handleBookingSubmit()}
                        disabled={!hour || !date}
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <span> Confirmar reserva</span>
                        )}
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default ServiceItem
